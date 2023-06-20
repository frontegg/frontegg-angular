import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateRouteComponent } from './components/private-route.component';
import { NotFoundComponent } from './components/not-found.component';
import { AppHomeComponent } from './components/home.component';
import { FronteggAuthGuard } from 'frontegg-angular-16';

const protectSingleRoutes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'test-private-route', component: PrivateRouteComponent, canActivate: [FronteggAuthGuard] },
  { path: 'test', pathMatch: 'full', redirectTo: 'nested-router' },
  {
    path: 'nested-router',
    loadChildren: () => import('./nested-module/nested-module.module').then(m => m.NestedModule),
  },
  { path: '**', component: NotFoundComponent },
];

// const protectAllRoutes: Routes = [
//   {
//     path: '', canActivate: [FronteggAuthGuard], children: [
//       { path: '', component: AppHomeComponent },
//       { path: 'test-private-route', component: PrivateRouteComponent },
//       { path: '**', component: NotFoundComponent },
//     ],
//   },
// ];


@NgModule({
  imports: [RouterModule.forRoot(protectSingleRoutes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
