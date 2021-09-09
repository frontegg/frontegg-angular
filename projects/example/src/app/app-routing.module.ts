import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyAppComponent } from './empty/empty.component';
import { FronteggAuthGuard, FronteggRouterComponent } from '@frontegg/angular';
import { PrivateRouteComponent } from './empty/private-route.component';
import { NotFoundComponent } from './not-found.component';


const routes: Routes = [
  { path: '', component: EmptyAppComponent },
  { path: 'test-private-route', canActivate: [FronteggAuthGuard], component: PrivateRouteComponent },
  {
    path: '**', component: FronteggRouterComponent,
    children: [{ path: '**', component: NotFoundComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
