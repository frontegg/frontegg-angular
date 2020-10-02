import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@frontegg/ng-core';
import { AuthModule } from '@frontegg/ng-auth';
import { HomeModule } from './home/home.module';
import { TeamModule } from './team/team.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    HomeModule,
    TeamModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
