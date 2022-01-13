import { NgModule } from '@angular/core';
import { NestedPrivateRouteComponent } from './nested-private-route.component';
import { CommonModule } from '@angular/common';
import { NestedRoutingModule } from './nested-routing.module';


@NgModule({
  declarations: [
    NestedPrivateRouteComponent,
  ],
  imports: [
    CommonModule,
    NestedRoutingModule,
  ],
})
export class NestedModule {
}
