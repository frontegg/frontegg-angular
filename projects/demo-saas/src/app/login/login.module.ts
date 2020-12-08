import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { CoreModule } from '@frontegg/ng-core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@frontegg/ng-auth';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, BrowserModule, CoreModule, AuthModule],
})
export class LoginModule {}
