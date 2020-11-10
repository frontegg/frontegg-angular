import { NgModule } from '@angular/core';
import { SsoPageComponent, SsoHeaderComponent, SsoRouterComponent, SsoToggleComponent } from './sso';
import { ProfileComponent } from './profile';
import { TeamHeaderComponent, TeamPageComponent } from './team';
import { MfaComponent } from './mfa';

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
  MfaComponent
];

@NgModule({
  declarations: components,
  imports: [],
  exports: components,
})
export class AuthModule {
}
