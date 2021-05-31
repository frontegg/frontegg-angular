import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FronteggAppModule } from 'frontegg-app';

const palette: any = {
  'primary': '#CF323B',
  'primaryText': '#FFF',
  'secondary': '#EBECED',
  'secondaryText': '#87888E',
  'info': '#8CCADC',
  'success': '#27CD41',
  'warning': '#FDC234',
  'error': '#FF6058',
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FronteggAppModule.forRoot({
      version: 'next',
      contextOptions: {
        baseUrl: 'https://max.frontegg.com'
      },
      metadata: {
        navigation: {
          users: {
            visibility: 'hidden',
          },
        },
        theme: {
          palette
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
