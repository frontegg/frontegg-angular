import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@frontegg/ng-core';
import { HomeModule } from './home/home.module';
import { TeamModule } from './team/team.module';
import { CommonModule } from '@angular/common';
import { SsoModule } from './sso/sso.module';

declare global {
  type JSX = any;
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    TeamModule,
    SsoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
