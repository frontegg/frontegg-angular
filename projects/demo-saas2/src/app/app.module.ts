import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@frontegg/ng-auth';
import { CoreModule } from '@frontegg/ng-core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { TeamModule } from './team/team.module';
import { SsoModule } from './sso/sso.module';
import { NavComponent } from './nav/nav.component';
import { MfaModule } from './mfa/mfa.module';
import { AuthPlugin } from '@frontegg/react-auth';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot({
      context: {
        baseUrl: `http://localhost:8080`,
        requestCredentials: 'include',
      },
      plugins: [AuthPlugin()],
    }),
    AuthModule,
    SsoModule,
    MfaModule,
    HomeModule,
    TeamModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
