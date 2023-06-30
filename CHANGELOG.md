# Change Log

## [5.35.0](https://github.com/frontegg/frontegg-angular/compare/v5.34.0...v5.35.0) (2023-6-30)

- FR-12426 - msp visibility bypermissions
- FR-12413 - fix msp accounts update
- FR-12213 - add security login flows - mfa and breached password
- FR-12277 - active tenant gap fix

# Change Log

## [5.34.0](https://github.com/frontegg/frontegg-angular/compare/v5.33.0...v5.34.0) (2023-6-28)

- FR-12277 - Extended tenants state with the active tenant to support MSP sub-accounts
- FR-12405 - MSP bug fixes
- FR-12381 - Migrated users table to load users by users V2 API

# Change Log

## [5.33.0](https://github.com/frontegg/frontegg-angular/compare/v5.32.0...v5.33.0) (2023-6-22)

- Update load tenants to new version
- MSP bugfix, improvements
- Add support to load cdn component with the new vite version
- Fix new sso guide dark theme
- Add support props and frontegg hooks in custom components

# Change Log

## [5.32.0](https://github.com/frontegg/frontegg-angular/compare/v5.31.0...v5.32.0) (2023-6-19)

 Added support to load cdn component with the new vite version
- Fix for new sso guide dark theme
- Fix for login per tenant embedded with sub domain logout route
- Create MSP all accounts main page

# Change Log

## [5.31.0](https://github.com/frontegg/frontegg-angular/compare/v5.30.0...v5.31.0) (2023-6-6)

- Improve login preview for login per tenant self service to rendered inside iframe
- Added required to fields in invite user modal
- Improve error handling for login 
- Added MSP - all accounts main page and state


# Change Log

## [5.30.0](https://github.com/frontegg/frontegg-angular/compare/v5.29.0...v5.30.0) (2023-5-28)

- Fixed hosted login with hash router
- Support login per tenant self service
- Added Cyprus phone area code 2 fa screen
- Added option to upload metadata file instead of metadata url

# Change Log

## [5.29.0](https://github.com/frontegg/frontegg-angular/compare/v5.28.0...v5.29.0) (2023-5-23)

- Fix the issue with unnecessary white borders on the dark mode theme
- Add metadataHeaders type to contextOptions
- Add source header to all admin portal and login box requests
- Add login per tenant self service
- SSO Guides enhancements
- [Snyk] Security upgrade babel-plugin-module-resolver from 4.1.0 to 5.0.0
- Remove admin provisioning feature flag
- Report version and framework as requests headers
- [Snyk] Upgrade tslib from 2.3.0 to 2.5.0

# Change Log

## [5.28.0](https://github.com/frontegg/frontegg-angular/compare/v5.27.0...v5.28.0) (2023-5-12)

- FR-11442 - Removed admin portal provisioning feature flag
- FR-11723 - Fixed refresh token when computer clock is set to a future time
- FR-11735 - Added support for customizing login per tenant in the admin portal
- FR-11442 - Removed legacy SSO tab code
- FR-11718 - Fix users' table UI issues
- FR-11113 - Fixed Frontegg logo overlapping navigation
- FR-11442 - Extract the provisioning tab to a separated page in the admin portal
- FR-11617 - Fixed a11y enter key press issue
- FR-11352 - Added support for nested table
- [Snyk] Security upgrade @azure/storage-blob from 12.11.0 to 12.13.0

# Change Log

## [5.27.0](https://github.com/frontegg/frontegg-angular/compare/v5.26.0...v5.27.0) (2023-5-4)

- FR-11581 - fix a11y login-box onEnter event for links
- FR-11353 - add new tree graph component

## [5.26.0](https://github.com/frontegg/frontegg-angular/compare/v5.25.0...v5.26.0) (2023-4-28)

- FR-11564 - Social login button shouldn't inherit from secondary color


## [5.25.0](https://github.com/frontegg/frontegg-angular/compare/v5.24.0...v5.25.0) (2023-4-27)

- Fixed passkeys issue with reCaptcha
- Removed feature flag from passkeys button
- Enable loading Frontegg helper scripts by providing query params to Frontegg external source
- Security upgrade webpack from 5.74.0 to 5.76.0


## [5.24.0](https://github.com/frontegg/frontegg-angular/compare/v5.23.0...v5.24.0) (2023-4-27)

- Fixed input hover issue on suffix icon
- A11y improvements 


## [5.23.0](https://github.com/frontegg/frontegg-angular/compare/v5.22.0...v5.23.0) (2023-4-25)

- Fix Passkeys button style
- Support login per tenant with search param

## [5.22.0](https://github.com/frontegg/frontegg-angular/compare/v5.21.0...v5.22.0) (2023-4-23)
- Lock reduxjs/toolkit version to be compatible in Vite types plugin
- Fixed password input placeholder text in the login box
- Fixed social login buttons order
- Fix Vite js-sha256 warning
- Fixed company name error in split mode sign up
- Fixed phone number dropdown theming
- Added aria labels to buttons

### Angular Wrapper 5.22.0:
- FR-11351 - preserve-query-params-for-login-per-tenant

## [5.21.0](https://github.com/frontegg/frontegg-angular/compare/v5.20.0...v5.21.0) (2023-4-3)

- Added support for SCIM groups
- Updated texts across login box - grammar and terminology
- Added impersonation indicator to show impersonator that they're in an impersonation session
- Added passkeys feature

### Angular Wrapper 5.21.0:
- Typo fix

## [5.20.0](https://github.com/frontegg/frontegg-angular/compare/v5.19.0...v5.20.0) (2023-3-27)

- FR-11247 - fix version branch 6.82

- FR-11065 - add passkeys mock ff
- FR-11189 - mfa authenticator app change input type
- FR-10821 - fix table color
- FR-11204 - add unit testing with jest
- FR-11139 - fix groups
- FR-11039 - fix groups dummy
- FR-11039 - ff groups
- FR-10530 - fix ff store name
- FR-11067 - error handling on profile image upload
- FR-11039 - extend users table with groups column

- FR-10530 - fix ff
- FR-10654 - Fix OIDC loading screen
- FR-10530 - fix ff store name
- FR-10530 - fix ff store name
- FR-10530 - change ff behavior  
- FR-10976 - Remove idle session export from default items


## [5.19.0](https://github.com/frontegg/frontegg-angular/compare/v5.18.0...v5.19.0) (2023-3-16)

- Fixed use permission regex issue to accept a wild card
- User groups design fixes
- Fixed passkeys loading mode and login flow with MFA
- Update dependencies between passkeys and MFA on the privacy page
- Added support to reset Idle session timeout by post messages from the client iFrame
- Added an option to enforce redirect URLs to the same site only to avoid security issues
- Added support for customized social login providers


## [5.18.0](https://github.com/frontegg/frontegg-angular/compare/v5.17.0...v5.18.0) (2023-3-10)

- Fixed resend OTC with reCaptcha
- Added  support to let tenants create and manage user groups in the admin portal under a FF
- Added support to login with passkeys and manage passkeys in the admin portal under a FF
- Fixed invite users issue when the vendor is not forcing roles and permissions
- Support auth strategy and social logins for login per tenants
- Refactored feature flag mechanism to be based on rest-api package
- Fixed validation for postcode in admin portal forms
- Fixed SMS code input to have input type number
- Improved auth screens form UX 

### Angular Wrapper 5.18.0:
- Added support for redirect url in hosted login mode

## [5.17.0](https://github.com/frontegg/frontegg-angular/compare/v5.16.0...v5.17.0) (2023-2-21)

- Fixed Admin portal SSO provider's options to be correlated with the vendor choice
- Fixed background for table pivot column
- Fixed impersonation by removing unnecessary redirects and adding a refresh call
- Fixed style reorder bug when using @emotion/react and Frontegg Next.JS

## [5.16.0](https://github.com/frontegg/frontegg-angular/compare/v5.15.0...v5.16.0) (2023-2-8)

- Updated M2M tokens to reflect the vendor choice

## [5.15.0](https://github.com/frontegg/frontegg-angular/compare/v5.14.0...v5.15.0) (2023-2-7)

- Fixed go-to-sign-up message position in speedy login layout
- Added an input component to the library for adding members to a tenant
- Fix filtering SSO providers according to the vendor selection
- Added user groups card header component to the library
- Improved the admin portal and login box performance and bundle size


## [5.14.0](https://github.com/frontegg/frontegg-angular/compare/v5.13.0...v5.14.0) (2023-1-29)

- Fixed error message position in login with SMS screen
- Fixed missing client ID after creating API token

## [5.13.0](https://github.com/frontegg/frontegg-angular/compare/v5.12.0...v5.13.0) (2023-1-25)

- Added email type to all email inputs in the login box and admin portal
- Fixed mobile width of the login box in modern and classic theme
- Fixed the scrolling issue in the privacy page in the admin portal
- Updated SCIM UI
- Added API to customize forget password button in the login with password page
- Improve split mode values layout
- Added support to access API tokens
- Updated Accept Invitation text, icon, and debounce
- Fixed OTC login for mobile
- Added support to sync vendor security policies
- Added impersonation indication for audit logs
- Added support for Impersonation


## [5.12.0](https://github.com/frontegg/frontegg-angular/compare/v5.11.0...v5.12.0) (2023-1-16)

- Fixed sign up position in dark theme
- Added margin to login error
- Added support for built-in authenticators, security keys, and SMS as MFA methods


## [5.11.0](https://github.com/frontegg/frontegg-angular/compare/v5.10.0...v5.11.0) (2023-1-11)

- Fixed login with apple redirect URL
- Added impersonation indication in login session table
- Added support for session expired logout on Hosted Login
- Added support for login with Linkedin
- Added support for Google one tap
- Improve insert OTC screen UI
- Improve UX of authentication forms
- Fix apple logo color and match to font color

## [5.10.0](https://github.com/frontegg/frontegg-angular/compare/v5.9.0...v5.10.0) (2022-12-22)

- Few bug fixes


## [5.9.0](https://github.com/frontegg/frontegg-angular/compare/v5.8.1...v5.9.0) (2022-12-20)

- Fixed mfa input on mobile 
- Enabled scim without roles
- Fixed menu component for dark theme
- Added api navigation icon
- Added tests for mfa
- Added apple social login types
- Added support for Hiding Invoices


## [5.8.1](https://github.com/frontegg/frontegg-angular/compare/v5.8.0...v5.8.1) (2022-12-13)

- Fixed MFA flow issues
- Added support for subscriptions billing collection
- Fixed the issue of the OTC screen submit button is disabled on mobile devices
- Added SCIM section in admin portal under FF

## [5.8.0](https://github.com/frontegg/frontegg-angular/compare/v5.7.1...v5.8.0) (2022-12-8)

- Fixed ignoring `urlPrefix` issue
- Added the ability to Invite a user by bulk API in the admin portal
- Fixed OTC digits are not visible on mobile devices
- Added MFA devices management section in the admin portal under FF
- Fixed the ability to copy invite link for dynamic base URL as well
- Added new abilities to MFA flows under FF
- Added support for providing an external CDN to load fonts in Frontegg components

## [5.7.1](https://github.com/frontegg/frontegg-angular/compare/v5.7.0...v5.7.1) (2022-11-28)

- FR-9750 - change api according to the new names security tabs
- FR-9717 - update rest api to have optional name in add user payload - and make sure to not send name if not exist
- FR-9826 - fix table header in dark theme
- FR-9237 - Max length for secret fields increased to 100 
- FR-9742 - enroll mfa list
- FR-9772 - Send NULL on profilePictureUrl rather than null
- FR-9717 - Invite user customize form API
- FR-9597 - Webhooks - missing validation error on UI when added not allowed URL


## [5.7.0](https://github.com/frontegg/frontegg-angular/compare/v5.6.0...v5.7.0) (2022-11-23)

- Added support for admin portal pre-defined theme options (dark, vivid, modern, and classic themes)
- Added support for customizing admin portal navigation hover color
- Fixed typo of Andorra country in countries dropdown
- Fixed select popup alignment issue
- Changed no local authentication feature to also hide the sign-up form when there is no local authentication option (use only social logins and SSO for signing up)
- Added mock for feature flags API for admin portal preview mode
- Fixed resend invitation and activate your account API calls
- Fixed creating custom webhook on the Admin Portal is sent with the event ID and not with the event Key
- Added support for customizing fields and tabs in the admin portal

### Angular Wrapper 5.7.0:
- Updated README.md with the current integration guide

## [5.6.0](https://github.com/frontegg/frontegg-angular/compare/v5.5.3...v5.6.0) (2022-11-10)

- FR-9186 - support ssr with session and refresh token
- FR-9614 - Add support for innerThemeProvider for admin portal pages and tabs

- FR-9186 - fix pipeline
### AdminPortal 6.36.0:
- 

### AdminPortal 6.35.0:
- 
### AdminPortal 6.34.0:
- 

### Angular Wrapper 5.6.0:
- FR-9186 - Fix changelog
- Add karma.conf.js and adjust docker file
- Adjust Test runnner flags, to run in docker
- FR-9186 - Generate changelog based on AdminPortal and LoginBox changes
- Change docker image to allow chromium to be installed
- Sanity Check

## [5.5.3](https://github.com/frontegg/frontegg-angular/compare/v5.5.2...v5.5.3) (2022-10-26)

### AdminPortal 6.34.0:
- 

### Angular Wrapper 5.5.3:
- FR-9186 - Fix changelog
- Add karma.conf.js and adjust docker file
- Adjust Test runnner flags, to run in docker
- FR-9186 - Generate changelog based on AdminPortal and LoginBox changes
- Change docker image to allow chromium to be installed
- Sanity Check
- Sanity check for angular

