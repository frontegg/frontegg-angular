import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { MfaComponent } from './mfa/mfa.component';
import { RedirectComponent } from './home/redirect.component';
import { ProfileComponent } from '@frontegg/ng-auth';
import { FronteggGuard } from '@frontegg/ng-core';
import { AuthGuard } from '@frontegg/ng-auth';
import { AuditsComponent } from '@frontegg/ng-audits';
import {
  ConnectivityComponent,
  ConnectivityWebhookComponent,
  ConnectivitySMSComponent,
} from '@frontegg/ng-connectivity';
import { SsoComponent } from './sso/sso.component';

// 1. all services is loaded
// 2. all saga actions inserted
// 3. plugin state updated from react
// 4. isLoading || if we are in auth-components -> prevent gaurd
const routes: Routes = [
  {
    path: '',
    // canActivate: [FronteggGuard],
    // canActivateChild: [FronteggGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'team',
        canActivate: [AuthGuard],
        children: [
          {
            path: '**',
            component: TeamComponent,
          },
        ],
      },
      {
        path: 'sso',
        children: [
          {
            path: '**',
            component: SsoComponent,
            // path: '**', component: SsoComponent,
          },
        ],
      },
      {
        path: 'profile',
        children: [
          {
            path: '**',
            component: ProfileComponent,
          },
        ],
      },
      {
        path: 'mfa',
        children: [
          {
            path: '**',
            component: MfaComponent,
          },
        ],
      },
      {
        path: 'audits',
        children: [
          {
            path: '**',
            component: AuditsComponent,
          },
        ],
      },
      {
        path: 'connectivity',
        children: [
          {
            path: '**',
            component: ConnectivityComponent,
          },
        ],
      },
      {
        path: 'webhook',
        children: [
          {
            path: '**',
            component: ConnectivityWebhookComponent,
          },
        ],
      },
      {
        path: 'sms',
        children: [
          {
            path: '**',
            component: ConnectivitySMSComponent,
          },
        ],
      },
      {
        path: '**',
        component: RedirectComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
