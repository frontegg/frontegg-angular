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
          baseUrl: 'https://app-na8f2nf315s2.stg.frontegg.com',
          clientId: '11508f8e-3f77-42c5-87b4-d3d11a7e1f75'
        },
      },
    )
  ],
  entryComponents: [FronteggComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
