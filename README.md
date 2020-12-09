<p align="center">
  <a href="https://www.frontegg.com/" rel="noopener" target="_blank">
    <img style="margin-top:40px" height="50" src="https://frontegg.com/wp-content/uploads/2020/04/logo_frrontegg.svg" alt="Frontegg logo">
  </a>
</p>
<h1 align="center">Frontegg-Angular</h1>
<div align="center">

[Angular](https://angular.io/) pre-built `hybrid` components wrapped by `Angular` components for faster and simpler integration with Frontegg services.

</div>

## Installation

Frontegg-Angular is available as an [npm package](https://www.npmjs.com/package/@frontegg/ng-core).

<font color='red'>**NOTE!**:</font> **For typescript project make sure you are using typescript with version > 3.9.0**

## Installation

using **YARN**:

```
/* install frontegg-core */
yarn add @frontegg/ng-core

yarn add @frontegg/ng-{plugin-name}

```

using **NPM**:

```
/* install frontegg-core */
npm install --save @frontegg/ng-core

npm install --save @frontegg/ng-{plugin-name}
```

## Usage

1. Import the CoreModule to your app.module file.

    ```ts
    /* app.module.ts file */

    import { AppComponent } from "./app.component";
    import { CoreModule } from "@frontegg/ng-core";
    import { AppRoutingModule } from './app-routing.module';

    @NgModule({
      declarations: [AppComponent],
      imports: [
        AppRoutingModule, // CoreModule inject routes and gaurds into application routes
        CoreModule.forRoot({
          context: {
            baseUrl: `${window.location.protocol}/${host}`,
            requestCredentials: "include",
          },
        }),
        // ...rest modules
      ],
      providers: [],
      bootstrap: [AppComponent],
    })
    export class AppModule {}
    ```

2. Add the AppRoutingModule to your root folder.

    ```ts
    /* app-routing.module.ts file */
    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';
    import { withFronteggRoutes } from '@frontegg/ng-core';

    const routes: Routes = withFronteggRoutes([

      /* here you can add your own routes */

    ])

    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule],
    })
    export class AppRoutingModule {
    }
    ```

3. Wrapp your app in `frontegg-provider` selector in `app.component.html`.

    ```html
    /* app.component.html file */

    <frontegg-provider>
      <router-outlet></router-outlet>
    </frontegg-provider>
    ```

`context` property uses:

- Communication Settings
- Theme Customization
- Component Configurations

```ts
interface context {
  baseUrl: string; // required
  urlPrefix?: string;
  requestCredentials?: RequestCredentials;
  tokenResolver?: () => Promise<string> | string;
  additionalHeadersResolver?: () => Promise<KeyValuePair[]> | KeyValuePair[];
  additionalQueryParamsResolver?: () => Promise<KeyValuePair[]> | KeyValuePair[];
}
```

## Plugins

**Frontegg-Angular** provides components per plugins for faster and simpler integration

- [Authentication Plugin](projects/auth)
- [Audits Plugin](projects/audits)
- [Team Management Plugin](projects/teams)
- [Notifications Plugin](projects/notifications)
- [Reports Plugin](projects/reports)
- [Integrations Plugin](projects/integrations)

## Contributing

The main purpose of this repository is to continue developing Frontend Angular to make it faster and easier to use.
Read our [contributing guide](/CONTRIBUTING.md) to learn about our development process.

**Notice** that contributions go far beyond pull requests and commits.

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
