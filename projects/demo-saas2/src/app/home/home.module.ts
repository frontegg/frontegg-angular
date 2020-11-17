import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { AppRoutingModule } from '../app-routing.module';
import { CoreModule } from '@frontegg/ng-core';
import { RedirectComponent } from './redirect.component';


@NgModule({
  declarations: [
    HomeComponent,
    RedirectComponent,
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
