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


@NgModule({
  declarations: [AppComponent, NotFoundComponent, AppHomeComponent, EmptyAppComponent, PrivateRouteComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FronteggAppModule.forRoot(
      {
        contextOptions: {
          baseUrl: 'https://loudapi.frontegg.com',
          clientId: '93447df4-edcc-45e5-8664-9fb8c196cf44'
        },
        hostedLoginBox: true,
      },
    ),
  ],
  entryComponents: [FronteggComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
