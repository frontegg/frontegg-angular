
<p align="center">  
  <a href="https://www.frontegg.com/" rel="noopener" target="_blank">  
    <img style="margin-top:40px" height="50" src="https://frontegg.com/wp-content/uploads/2020/04/logo_frrontegg.svg" alt="Frontegg logo">  
  </a>  
</p>  
<h1 align="center">Authentication Plugin</h1>  
<div align="center">  

[Angular](https://angular.io/) pre-built Component for faster and simpler integration with Frontegg services.
</div>  
  
## Installation  
Frontegg-Ng-Auth is available as an [npm package](https://www.npmjs.com/package/@frontegg/ng-auth).  
  
```sh  
// using npm  
npm install @frontegg/ng-auth  
  
// using yarn  
yarn add @frontegg/ng-auth  
  
// NOTE: to get the latest stable use @latest.  
```   
## Usage  
  
All you need is to add AuthModule to the ``CoreModule``: 
  
```ts
/* app.module.ts file */

import { AppComponent } from "./app.component";
import { CoreModule } from "@frontegg/ng-core";
import { AuthModule } from '@frontegg/ng-auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule.forRoot({
      context: {
        baseUrl: `${window.location.protocol}/${host}`,
        requestCredentials: "include",
      },
      plugins: [AuthModule],
    }),
    // ...rest modules
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Options and Customizations
**Frontegg-Ng-Auth** provide the ability to fully customize your components 
to align it with your App UI design.

- [`header`](#header-ngcomponent) `<Component>`
- [`backgroundImage`](#backgroundimage-string) `<string>`
- [`backgroundColor`](#backgroundcolor-csscolor) `<CSSColor>`
- [`loaderComponent`](#loadercomponent-ngcomponent) `<Component>`
- [`routes`](#routes-string) `<string[]>`

**Advanced Customizations**

- [`Login Component`](src/login/README.md)

### `header <Component>`

*(optional)* The Ng Component is used to customize your authentication page header
```ts
{
  plugins: [
   AuthPlugin.forRoot({
    header: MyAuthPageHeader,
    // ...rest options
   })
  ]
}
```
### `backgroundImage <string>`

*(optional)* The CSS Color is used to for authentication page background color
```ts
{
  plugins: [
   AuthPlugin.forRoot({
    backgroundImage: 'https://image_url' | 'data:image/png;base64,...',  
    // ...rest options
   })
  ]
}
```

### `backgroundColor <CSSColor>`

*(optional)* The CSS Color is used to for authentication page background color
```ts
{
  plugins: [
   AuthPlugin.forRoot({
    backgroundColor: '#FAFAFA' | 'red' | 'rgb(200,200,200)',
    // ...rest options
   })
  ]
}
```

### `loaderComponent <Component>`

*(optional)* The Ng Component displayed on first load while resolving the verifying the authenticated user, refreshing the token, 
and to check if the user should be redirected to the login page. 
```ts
{
  plugins: [
   AuthPlugin.forRoot({
    loaderComponent: <MyLoaderComponent>,  
    // ...rest options
   })
  ]
}
```

### `routes <string[]>`

*(optional)* The path routes for the Authentication Components, these pathes are used to redirect
an user to a specific route depends on the authentication state. 
```ts
{
  const plugins = [
    AuthPlugin({
      routes: {
        /**
         * redirect to the page when a user is authenticated 
         */
        authenticatedUrl: '/',
        /**
         * redirect to the page when a user is not authenticated 
         */      
        loginUrl: '/account/login',
        /**
         * when navigating to this url, AuthProvider will logout and remove cookies 
         */
        logoutUrl: '/account/logout',
        /**
         * redirect to the page when a user wants to activate their account 
         */
        activateUrl: '/account/activate',
        /**
         * redirect to the page when a user forgot his account password 
         */
        forgetPasswordUrl: '/account/forgot/password',
        /**
         * redirect to the page when a user is redirected from the forgot password url 
         */
        resetPasswordUrl: '/account/reset/password',
      },  
      //...rest options
    })
  ];
}
```

## Contributing

The main purpose of this repository is to continue developing Frontegg Angular to making it faster and easier to use.
Read our [contributing guide](/CONTRIBUTING.md) to learn about our development process.

**Notice** that contributions go far beyond pull requests and commits.

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
