import { NgModule } from '@angular/core';

import { MfaComponent } from './mfa.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@frontegg/ng-core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@frontegg/ng-auth';


@NgModule({
  declarations: [
    MfaComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    CoreModule,
    AuthModule,
  ],
})
export class MfaModule {
}
