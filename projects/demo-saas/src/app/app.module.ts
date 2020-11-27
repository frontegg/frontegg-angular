import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@frontegg/ng-core';
import { HomeModule } from './home/home.module';
import { TeamModule } from './team/team.module';
import { CommonModule } from '@angular/common';
import { SsoModule } from './sso/sso.module';
import { MfaModule } from './mfa/mfa.module';
import { LoginModule } from './login/login.module';
import { AuthModule } from '@frontegg/ng-auth';
import { NavComponent } from './nav/nav.component';
import { AuditsModule } from '@frontegg/ng-audits';

declare global {
  type JSX = any;
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
  ],
  imports: [
    LoginModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot({
      context: {
        baseUrl: `http://localhost:8080`,
        requestCredentials: 'include',
      },
    }),
    AuthModule.forRoot(),
    AuditsModule.forRoot(),
    HomeModule,
    TeamModule,
    SsoModule,
    MfaModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
