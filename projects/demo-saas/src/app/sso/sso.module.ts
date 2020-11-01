import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CoreModule } from '@frontegg/ng-core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@frontegg/ng-auth';
import { SsoComponent } from './sso.component';


@NgModule({
  declarations: [
    SsoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    CoreModule,
    AuthModule,
  ],
})
export class SsoModule {
}
