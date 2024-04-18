import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FronteggAuthGuard } from '@frontegg/angular';
import { PrivateRouteComponent } from './components/private-route.component';
import { NotFoundComponent } from './components/not-found.component';
import { HomePage } from './components/home-page/home-page.component';
import { StepUpHighMaxAgePage } from './components/step-up/step-up-high-max-age-page.component';
import { EntitlementsPage } from './components/entitlements-page/entitlements-page.component';

import { StepUpSmallMaxAgePage } from './components/step-up/step-up-small-max-age-page.component';
import { StepUpNoMaxAgePage } from './components/step-up/step-up-no-max-age-page.component';
import { StepUpFull } from './components/step-up/step-up-full/step-up-full.component';
import { AuthorizedContentPage } from './components/authorized-content/authorized-content-page.component';
import { ROUTE_PATHS } from './links';

const protectSingleRoutes: Routes = [
  { path: ROUTE_PATHS.HOME_PAGE, component: HomePage },
  { path: ROUTE_PATHS.ENTITLEMENTS, component: EntitlementsPage },
  { path: ROUTE_PATHS.STEP_UP_HIGH_MAX_AGE, component: StepUpHighMaxAgePage },
  { path: ROUTE_PATHS.STEP_UP_SMALL_MAX_AGE, component: StepUpSmallMaxAgePage },
  { path: ROUTE_PATHS.STEP_UP_NO_MAX_AGE, component: StepUpNoMaxAgePage },
  { path: ROUTE_PATHS.STEPPED_UP_FULL, component: StepUpFull },
  { path: ROUTE_PATHS.AUTHORIZED_CONTENT, component: AuthorizedContentPage },
  { path: ROUTE_PATHS.TEST_PRIVATE_ROUTE, component: PrivateRouteComponent, canActivate: [FronteggAuthGuard] },
  { path: ROUTE_PATHS.TEST, pathMatch: 'full', redirectTo: ROUTE_PATHS.NESTED_ROUTER },
  {
    path: ROUTE_PATHS.NESTED_ROUTER,
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
