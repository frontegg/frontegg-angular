import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { MfaComponent } from './mfa/mfa.component';
import { RedirectComponent } from './home/redirect.component';
import { AuthService, ProfileComponent, SsoPageComponent } from '@frontegg/ng-auth';
import { FronteggGuard } from '@frontegg/ng-core';
import { AuthGuard } from '@frontegg/ng-auth';
import { AuditsComponent, AuditsService, AuditsModule } from '@frontegg/ng-audits';

// 1. all services is loaded
// 2. all saga actions inserted
// 3. plugin state updated from react
// 4. isLoading || if we are in auth-components -> prevent gaurd
const routes: Routes = [
  {
    path: '',
    canActivate: [FronteggGuard],
    canActivateChild: [FronteggGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'team',
        canActivate: [AuthGuard],
        children: [{
          path: '**', component: TeamComponent,
        }],
      },
      {
        path: 'sso', children: [{
          path: '**', component: SsoPageComponent,
          // path: '**', component: SsoComponent,
        }],
      },
      {
        path: 'profile', children: [{
          path: '**', component: ProfileComponent,
        }],
      },
      {
        path: 'mfa', children: [{
          path: '**', component: MfaComponent,
        }],
      },
      {
        path: 'audits', children: [{
          path: '**', component: AuditsComponent,
        }],
      },
      {
        path: '**', component: RedirectComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuditsModule,
  ],
  providers: [
    AuthService,
    AuditsService
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
