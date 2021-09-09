import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FronteggAppModule } from '@frontegg/angular';
import { NotFoundComponent } from './not-found.component';
import { EmptyAppComponent } from './empty/empty.component';
import { PrivateRouteComponent } from './empty/private-route.component';


@NgModule({
  declarations: [AppComponent, NotFoundComponent, EmptyAppComponent, PrivateRouteComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FronteggAppModule.forRoot(
      {
        contextOptions: {
          baseUrl: 'https://david.frontegg.com',
        }
      },
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
