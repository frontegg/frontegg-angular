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


@NgModule({
  declarations: [AppComponent, NotFoundComponent, AppHomeComponent, EmptyAppComponent, PrivateRouteComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FronteggAppModule.forRoot(
      {
        contextOptions: {
          baseUrl: 'https://isra-stg-v4.stg.frontegg.com',
          clientId: '4e013910-fd8a-47cb-9208-a15622143f5e'
        },
      },
    ),
    CheckoutDialogModule
  ],
  entryComponents: [FronteggComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
