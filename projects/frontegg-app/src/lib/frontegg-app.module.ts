import { FronteggAuthGuard } from './frontegg-app-guards.guard';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FronteggAppComponent } from './frontegg-app.component';
import { FE_PROVIDER_CONFIG } from "./constants";
import { FronteggAppOptions } from '@frontegg/types';
import { FronteggAppService } from './frontegg-app.service';
import { FronteggAppAuthService } from './frontegg-app-auth.service';
import { RouterModule } from '@angular/router';
import { FronteggRouterComponent } from './frontegg-router.component';

@NgModule({
  declarations: [FronteggAppComponent, FronteggRouterComponent],
  imports: [CommonModule, RouterModule],
  exports: [FronteggAppComponent, FronteggRouterComponent]
})
export class FronteggAppModule {
  public constructor() { }
  static forRoot(config: FronteggAppOptions): ModuleWithProviders<FronteggAppModule> {

    return {
      ngModule: FronteggAppModule,
      providers: [
        FronteggAuthGuard,
        FronteggAppService,
        FronteggAppAuthService,
        {
          provide: FE_PROVIDER_CONFIG,
          useValue: config
        }
      ],
    };
  }
}
