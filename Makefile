MAKEFLAGS += --no-print-directory
SOURCES = packages

########################################################################################################################
#
# HELP
#
########################################################################################################################

# COLORS
RED    = $(shell printf "\33[31m")
GREEN  = $(shell printf "\33[32m")
WHITE  = $(shell printf "\33[37m")
YELLOW = $(shell printf "\33[33m")
RESET  = $(shell printf "\33[0m")

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
# A category can be added with @category
HELP_HELPER = \
    %help; \
    while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-\%]+)\s*:.*\#\#(?:@([0-9]+\s[a-zA-Z\-\%_]+))?\s(.*)$$/ }; \
    print "usage: make [target]\n\n"; \
    for (sort keys %help) { \
    print "${WHITE}$$_:${RESET}\n"; \
    for (@{$$help{$$_}}) { \
    $$sep = " " x (32 - length $$_->[0]); \
    print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
    }; \
    print "\n"; }

help: ##prints help
	@perl -e '$(HELP_HELPER)' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

########################################################################################################################
#
# GLOBAL
#
########################################################################################################################

init: ##@1 Global init project before start after each pull
	${MAKE} clean
	${MAKE} install
	${MAKE} build

clean: ##@1 Global uninstall node modules, remove transpiled code & lock files
	@rm -rf ./node_modules
	@rm -rf ./package-lock.json
	@rm -rf ./yarn-error.log
	@find ./projects -type d -maxdepth 1 ! -path ./projects \
		| sed 's|^./projects/||' \
		| xargs -I '{}' sh -c '$(MAKE) clean-{}'

clean-%:
	@rm -rf ./projects/${*}/dist
	@rm -rf ./projects/${*}/node_modules
	@rm -rf ./projects/${*}/package-lock.json
	@rm -rf ./projects/${*}/yarn.lock
	@rm -rf ./projects/${*}/yarn-error.log


install: ##@1 Global yarn install all packages
	@echo "${YELLOW}Running yarn install${RESET}"
	@yarn install
	@echo "${YELLOW}Running lerna bootstrap${RESET}"
	@./node_modules/.bin/lerna bootstrap --npm-client=yarn


########################################################################################################################
#
# PACKAGES
#
########################################################################################################################

lint: ##@2 Linting run lint on all packages
	@echo "${YELLOW}Running tslint on all packages${RESET}"
	@./node_modules/.bin/lerna run lint --parallel

lint-%: ##@2 Linting run lint on specific packages
	@echo "${YELLOW}Running tslint on package ${WHITE}${*}${RESET}"
	@./node_modules/.bin/ng lint --project=${*}

########################################################################################################################
#
# BUILD Operations
#
########################################################################################################################

build: ##@4 Build build all packages
	${MAKE} build-core
	${MAKE} build-auth
	${MAKE} build-audits

build-%: ##@4 Build build a specific package
	@echo "${YELLOW}Building package ${WHITE}${*}${RESET}"
	@export PACKAGE=${*}; cd ./projects/${*} && yarn build

bw: ##@4 Build parallels build:watch all
	@./node_modules/.bin/lerna run build:watch --parallel

bw-%: ##@2 Build build:watch specific package
	@export PACKAGE=${*}; cd ./projects/${*} && yarn build:watch
########################################################################################################################
#
# Publish Operations
#
########################################################################################################################

commit-changes:
	@git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
	@git config user.name "${GITHUB_ACTOR}"
	@git add .
	@git commit -m "Add generated files" || true

move-package-json-to-dist:
	@find ./packages -type d -maxdepth 1 ! -path ./packages \
		| sed 's|^./packages/||' \
		| xargs -I '{}' sh -c 'node scripts/move-package-json-to-dist.js ./packages/{}'


publish-base:
	@echo "${GREEN}************************************************************************************${RESET}"
	@echo "${GREEN}* Lint: All Packages${RESET}"
	@echo "${GREEN}************************************************************************************${RESET}"
	${MAKE} lint

	@echo "${GREEN}************************************************************************************${RESET}"
	@echo "${GREEN}* Component Test: All Packages${RESET}"
	@echo "${GREEN}************************************************************************************${RESET}"
	${MAKE} test-component

	${MAKE} build

	@echo "${GREEN}************************************************************************************${RESET}"
	@echo "${GREEN}* Push: commit generated changes to the repository${RESET}"
	@echo "${GREEN}************************************************************************************${RESET}"
	${MAKE} commit-changes


publish-prod: ##@5 Publish publish all changed packages to npm repository
	${MAKE} publish-base

	@echo "${GREEN}************************************************************************************${RESET}"
	@echo "${GREEN}* Publish: Changed Packages${RESET}"
	@echo "${GREEN}************************************************************************************${RESET}"
	@./node_modules/.bin/lerna publish patch --force-publish --contents dist --yes

publish-dev: ##@5 Publish publish all changed packages to npm repository
	${MAKE} publish-base

	@echo "${GREEN}************************************************************************************${RESET}"
	@echo "${GREEN}* Publish: Changed Packages${RESET}"
	@echo "${GREEN}************************************************************************************${RESET}"
	@./node_modules/.bin/lerna publish patch --canary --preid "dev-${GITHUB_RUN_ID}" --force-publish --contents dist --yes

