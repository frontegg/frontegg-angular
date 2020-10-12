import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@frontegg/ng-core';
import { HomeModule } from './home/home.module';
import { TeamModule } from './team/team.module';
import { CommonModule } from '@angular/common';


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
    // AuthModule,
    HomeModule,
    TeamModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
