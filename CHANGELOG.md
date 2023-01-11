# Change Log

## [5.11.0](https://github.com/frontegg/frontegg-angular/compare/v5.10.0...v5.11.0) (2023-1-11)

- FR-10112 -  update admin box pipeline for next js and angular
- FR-10248 - mfa spacing
- FR-10256 - replace apple button redirect url
- FR-10248 - add tooltip for card list item
- FR-10248 - mfa fixes
- FR-10246 - Add impersonation indication in login session table

- FR-10275 - Avoid calling conditioned hook in Google onetap code

- FR-9413 - fix main login validation for on boarding
- FR-10241 - added support for redirectUrl on prelogin
- FR-10240 - remove linkedin from inactive providers

- FR-9983 - make sure that OTC fields are in one column with submit button
- FR-9642 - Logout on OAuth service on Hosted Login
- FR-8022 - support linkedin
- FR-10212 - hide disabled cards from mfa list

- FR-10162 - added support for google one tap
- FR-9983 - Improve digits component
- FR-9987 - fix social btns UI
- FR-9413 - Login, unified behaviour 

- FR-10047 - fix bad UI webhook
- FR-9993 - Add custom event to add user by bulk
- FR-10118 - fix apple logo color change when font color changes
- FR-9976 - refactor otc


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

