
<p align="center">  
  <a href="https://www.frontegg.com/" rel="noopener" target="_blank">  
    <img style="margin-top:40px" height="50" src="https://frontegg.com/wp-content/uploads/2020/04/logo_frrontegg.svg" alt="Frontegg logo">  
  </a>  
</p>  
<h1 align="center">Connectivity Plugin</h1>  
<div align="center">  

[Angular](https://angular.io/) pre-built Component for faster and simpler integration with Frontegg services.
</div>  
  
## Installation  
Frontegg-Ng-Auth is available as an [npm package](https://www.npmjs.com/package/@frontegg/ng-auth).  
  
```sh  
// using npm  
npm install @frontegg/ng-connectivity  
  
// using yarn  
yarn add @frontegg/ng-connectivity  
  
// NOTE: to get the latest stable use @latest.  
```   
## Usage  
  
All you need is to add ConnectivityModule to the ``CoreModule``: 
  
```ts
/* app.module.ts file */

import { AppComponent } from "./app.component";
import { CoreModule } from "@frontegg/ng-core";
import { ConnectivityModule } from '@frontegg/ng-connectivity';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule.forRoot({
      context: {
        baseUrl: `${window.location.protocol}/${host}`,
        requestCredentials: "include",
      },
    }),
    ConnectivityModule.forRoot(),
    // ...rest modules
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

and add the ConnectivityComponent to your ``RoutingModule``

```ts
/* routing.module.ts */

// ...import all modules
import { ConnectivityComponent } from '@frontegg/ng-connectivity';

const routes: Routes = [
  {
    path: '',
    // ...any dependency injections for the route
    children: [
      // ...main routes
      {
        path: 'connectivity',
        children: [{
          path: '**', component: ConnectivityComponent,
        }],
      },
      // ...other routes
    ]
  }
]

```

### Usage only part of the Component
If you want to customize the Connectivity component you can use one of the separate components:

 - ConnectivityContentComponent - the main component like as the ``ConnectivityComponent`` but without the header.
 - ConnectivityWebhookComponent - only the Webhook list and configuration form for it
 - ConnectivitySMSComponent - only the SMS list and configuration 
 - ConnectivityEmailComponent - only the Email list and configuration 
 - ConnectivitySlackComponent - only the Slack list and configuration with authorization component for it

The example of routing with SMS and Email components:

```ts
/* routing.module.ts */

// ...import all modules
import { ConnectivitySMSComponent, ConnectivityEmailComponent } from '@frontegg/ng-connectivity';

const routes: Routes = [
  {
    path: '',
    // ...any dependency injections for the route
    children: [
      // ...main routes
      {
        path: 'sms',
        children: [{
          path: '**', component: ConnectivitySMSComponent,
        }],
      },
      {
        path: 'email',
        children: [{
          path: '**', component: ConnectivityEmailComponent,
        }],
      },
      // ...other routes
    ]
  }
]

```
