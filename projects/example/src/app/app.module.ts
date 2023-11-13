import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found.component';
import { EmptyAppComponent } from './components/empty.component';
import { PrivateRouteComponent } from './components/private-route.component';
import { AppHomeComponent } from './components/home.component';
import { FronteggComponent, FronteggAppModule } from '@frontegg/angular';
import { CheckoutDialogModule } from './checkout-dialog/checkout-dialog.module';
// import { EntitlementsComponent } from './components/Entitlements/entitlements.component';


@NgModule({
  declarations: [ AppComponent, NotFoundComponent, AppHomeComponent, EmptyAppComponent, PrivateRouteComponent ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FronteggAppModule.forRoot(
      // @ts-ignore
      window.CYPRESS_CONFIG ||
      {
        contextOptions: {
          baseUrl: 'https://app-o1uurvajm1on.stg.frontegg.com',
          // baseUrl: process.env.PUBLIC_URL || process.env.REACT_APP_BASE_URL,
          clientId: '9e23d2c9-b45a-4f6a-a879-1418469b1c89', //process.env.REACT_APP_CLIENT_ID,    
        },
        authOptions: {
          keepSessionAlive: true,
        },
        entitlementsOptions: {
          enabled: true
        }
      },
    ),
    CheckoutDialogModule,
  ],
  entryComponents: [ FronteggComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
