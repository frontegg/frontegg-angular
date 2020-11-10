import { NgModule } from '@angular/core';

import { TeamComponent } from './team.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@frontegg/ng-core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@frontegg/ng-auth';

@NgModule({
  declarations: [
    TeamComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    CoreModule,
    AuthModule
  ],
})
export class TeamModule {
}
