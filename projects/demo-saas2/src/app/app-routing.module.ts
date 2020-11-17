import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { MfaComponent } from './mfa/mfa.component';
import { RedirectComponent } from './home/redirect.component';
import { ProfileComponent, SsoPageComponent } from '@frontegg/ng-auth';
import { SsoComponent } from './sso/sso.component';
import { FronteggGuard } from '@frontegg/ng-core';

const routes: Routes = [
  {
    path: '', canActivate: [], children: [
      { path: '', component: HomeComponent },
      {
        path: 'team', children: [{
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
        path: '**', component: RedirectComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
