import { NgModule } from '@angular/core';

import { PageWrapperComponent } from './page-wrapper.component';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
  ],
  declarations: [
    NavComponent,
    PageWrapperComponent,
  ],
})
export class PageWrapperModule {
}
