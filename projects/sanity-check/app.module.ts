import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FronteggAppModule, FronteggComponent } from 'frontegg-angular-16';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FronteggAppModule.forRoot(
      {
        contextOptions: {
          baseUrl: 'https://app-1p3iny7ql1ng.frontegg.com',
          clientId: 'f7094875-fa3b-48ab-b76f-3598095d2780'
        },
        hostedLoginBox: true,
      },
    ),
  ],
  providers: [],
  entryComponents: [FronteggComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
