import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { AppRoutingModule } from '../app-routing.module';
import { CoreModule } from '@frontegg/ng-core';
import { RedirectComponent } from './redirect.component';
import { Test1Component } from './test1.component';
import { Test2Component } from './test2.component';


@NgModule({
  declarations: [
    HomeComponent,
    RedirectComponent,
    Test1Component,
    Test2Component,
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
  ],
  exports: [
    HomeComponent,
  ],
})
export class HomeModule {

}
