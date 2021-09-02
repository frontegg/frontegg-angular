import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FronteggAppModule } from '@frontegg/angular';
import { NotFoundComponent } from './not-found.component';
import { EmptyAppComponent } from './empty/empty.component';
import { PrivateRouteComponent } from './empty/private-route.component';
import { FronteggRouterComponent } from '../../../frontegg-app/src/lib/frontegg-router.component';

const palette: any = {
  primary: '#CF323B',
  primaryText: '#FFF',
  secondary: '#EBECED',
  secondaryText: '#87888E',
  info: '#8CCADC',
  success: '#27CD41',
  warning: '#FDC234',
  error: '#FF6058',
};

@NgModule({
  declarations: [AppComponent, NotFoundComponent, EmptyAppComponent, PrivateRouteComponent, FronteggRouterComponent],
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
