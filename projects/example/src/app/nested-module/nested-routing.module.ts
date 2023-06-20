import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NestedPrivateRouteComponent } from './nested-private-route.component';
import { FronteggAuthGuard } from 'frontegg-angular-16';

const protectSingleRoutes: Routes = [
  { path: '', component: NestedPrivateRouteComponent, canActivate: [FronteggAuthGuard] },
];


@NgModule({
  imports: [RouterModule.forChild(protectSingleRoutes)],
  providers: [],
})
export class NestedRoutingModule {
}
