import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found.component';
import { EmptyAppComponent } from './components/empty.component';
import { PrivateRouteComponent } from './components/private-route.component';
import { HomePage } from './components/home-page/home-page.component';
import { FronteggAppModule } from '@frontegg/angular';
import { CheckoutDialogModule } from './checkout-dialog/checkout-dialog.module';
import { StepUpHighMaxAgePage } from './components/step-up/step-up-high-max-age-page.component';
import { EntitlementsPage } from './components/entitlements-page/entitlements-page.component';
import { BaseStepUp } from './components/step-up/base-step-up/base-step-up.component';
import { StepUpSmallMaxAgePage } from './components/step-up/step-up-small-max-age-page.component';
import { StepUpNoMaxAgePage } from './components/step-up/step-up-no-max-age-page.component';
import { StepUpFull } from './components/step-up/step-up-full/step-up-full.component';
import { AuthorizedContentPage } from './components/authorized-content/authorized-content-page.component';

const IS_HOSTED_MODE = false;

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomePage,
    BaseStepUp,
    StepUpHighMaxAgePage,
    StepUpSmallMaxAgePage,
    StepUpNoMaxAgePage,
    StepUpFull,
    EntitlementsPage,
    EmptyAppComponent,
    AuthorizedContentPage,
    PrivateRouteComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FronteggAppModule.forRoot(
      // @ts-ignore
      window.CYPRESS_CONFIG ||
      {
        contextOptions: {
          baseUrl: 'https://demo.frontegg.com',
          clientId: 'b6adfe4c-d695-4c04-b95f-3ec9fd0c6cca',
        },
        hostedLoginBox: IS_HOSTED_MODE, // don't remove it. Change it via the const value above
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
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
