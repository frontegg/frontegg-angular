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
        FronteggAppModule.forRoot({
            contextOptions: {
                // @ts-ignore
                baseUrl: process.env.FRONTEGG_BASE_URL || 'https://demo.frontegg.com',
                // @ts-ignore
                clientId: process.env.FRONTEGG_CLIENT_ID || 'b6adfe4c-d695-4c04-b95f-3ec9fd0c6cca',
            },
            authOptions: {
                keepSessionAlive: true,
            },
        }),
        CheckoutDialogModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
