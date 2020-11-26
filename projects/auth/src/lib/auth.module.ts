import { ModuleWithProviders, NgModule } from '@angular/core';
import { SsoPageComponent, SsoHeaderComponent, SsoRouterComponent, SsoToggleComponent } from './sso';
import { ProfileComponent } from './profile';
import { TeamHeaderComponent, TeamPageComponent } from './team';
import { MfaComponent } from './mfa';
import { AuthService } from './auth.service';
import { FE_AUTH_PLUGIN_CONFIG } from '@frontegg/ng-core';
import { AuthPlugin } from '@frontegg/react-auth';
import { AuthPluginOptions } from '@frontegg/react-auth/interfaces';
import { LoginComponent } from './login';
import { AuthGuard } from './auth.guard';

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

  // login
  LoginComponent,
];

@NgModule({
  imports: [],
  declarations: components,
  providers: [
    AuthGuard,
    AuthService,
  ],
  exports: [
    ...components,
  ],
})
export class AuthModule {
  static forRoot(config?: AuthPluginOptions): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: FE_AUTH_PLUGIN_CONFIG,
          useValue: AuthPlugin(config),
        },
      ],
    };
  }
}
