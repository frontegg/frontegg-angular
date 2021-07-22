import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyAppComponent } from './empty/empty.component';
import { FronteggAuthGuard } from '@frontegg/angular';
import { NotFoundComponent } from './not-found.component';
import { FronteggRouterComponent } from '../../../frontegg-app/src/lib/frontegg-router.component';
import { PrivateRouteComponent } from './empty/private-route.component';


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
