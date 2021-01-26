
<p align="center">  
  <a href="https://www.frontegg.com/" rel="noopener" target="_blank">  
    <img style="margin-top:40px" height="50" src="https://frontegg.com/wp-content/uploads/2020/04/logo_frrontegg.svg" alt="Frontegg logo">  
  </a>  
</p>  
<h1 align="center">Audits Plugin</h1>  
<div align="center">  

[Angular](https://angular.io/) pre-built Component for faster and simpler integration with Frontegg services.
</div>  
  
## Installation  
Frontegg-Ng-Audits is available as an [npm package](https://www.npmjs.com/package/@frontegg/ng-audits).  
  
```sh  
// using npm  
npm install @frontegg/ng-audits  
  
// using yarn  
yarn add @frontegg/ng-audits  
  
// NOTE: to get the latest stable use @latest.  
```   
## Usage  
  
All you need is to add AuditsModule to the ``AppModule``: 
  
```ts
/* app.module.ts file */

import { AppComponent } from "./app.component";
import { CoreModule } from "@frontegg/ng-core";
import { AuditsModule } from '@frontegg/ng-audits';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule.forRoot({
      context: {
        baseUrl: `${window.location.protocol}/${host}`,
        requestCredentials: "include",
      },
    }),
    AuditsModule.forRoot(),
    // ...rest modules
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Contributing

The main purpose of this repository is to continue developing Frontegg Angular to making it faster and easier to use.
Read our [contributing guide](/CONTRIBUTING.md) to learn about our development process.

**Notice** that contributions go far beyond pull requests and commits.

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
