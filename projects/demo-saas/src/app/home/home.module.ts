import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { CoreModule } from '@frontegg/ng-core';
import { AuthModule } from '@frontegg/ng-auth';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomeComponent],
  imports: [CoreModule, AuthModule, CommonModule],
  exports: [HomeComponent],
})
export class HomeModule {}
