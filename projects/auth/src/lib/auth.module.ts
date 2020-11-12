import { NgModule } from '@angular/core';
import { MfaComponent } from './mfa';
import { ProfileComponent } from './profile';
import { LoginComponent } from './login';
import { TeamHeaderComponent, TeamPageComponent } from './team';
import { SsoPageComponent, SsoHeaderComponent, SsoRouterComponent, SsoToggleComponent } from './sso';

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
  
  //mfa
  MfaComponent,

  //login
  LoginComponent
];

@NgModule({
  declarations: components,
  imports: [],
  exports: components,
})
export class AuthModule {
}
