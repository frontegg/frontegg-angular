import { NgModule } from '@angular/core';
import { SsoPageComponent, SsoHeaderComponent, SsoRouterComponent, SsoToggleComponent } from './sso';
import { ProfileComponent } from './profile';
import { TeamHeaderComponent, TeamPageComponent } from './team';
import { MfaComponent } from './mfa';
import { AuthService } from './auth.service';

const components = [
  ProfileComponent,

  // sso
  SsoPageComponent,
  SsoHeaderComponent,
  SsoRouterComponent,
  SsoToggleComponent,

  // team
  TeamHeaderComponent,
  TeamPageComponent,

  // mfa
  MfaComponent,
];

@NgModule({
  imports: [],
  declarations: components,
  providers: [
    AuthService,
  ],
  exports: [
    ...components,
  ],
})
export class AuthModule {
}
