import { NgModule } from '@angular/core';
import { SsoPageComponent, SsoHeaderComponent, SsoRouterComponent, SsoToggleComponent } from './sso';
import { ProfileComponent } from './profile';
import { TeamHeaderComponent, TeamPageComponent } from './team';


const components = [
  ProfileComponent,

  // sso
  SsoPageComponent,
  SsoHeaderComponent,
  SsoRouterComponent,
  SsoToggleComponent,

  // team
  TeamHeaderComponent,
  TeamPageComponent
];

@NgModule({
  declarations: components,
  imports: [],
  exports: components,
})
export class AuthModule {
}
