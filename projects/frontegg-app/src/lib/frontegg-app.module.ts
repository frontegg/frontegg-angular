import { FronteggAuthGuard } from './frontegg-app-guards.guard';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FronteggAppComponent } from './frontegg-app.component';
import { FE_PROVIDER_CONFIG } from "./constants";
import { AdminBoxMetadata } from '@frontegg/admin-portal';
import { FronteggAppService } from './frontegg-app.service';
import { FronteggAppAuthService } from './frontegg-app-auth.service';
import { RouterModule } from '@angular/router';
import { FronteggRouterComponent } from './frontegg-router.component';
//TODO: export this type from admin-portal
export interface FronteggConfigOptions {
  version?: string | 'latest' | 'stable' | 'next';
  cdn?: string;
  contextOptions: any;
  themeOptions?: any;
  headerImage?: string;
  backgroundImage?: string;
  store?: any;
  customStyles?: string;
  metadata?: AdminBoxMetadata;
  previewMode?: boolean;
  customLoginBox?: boolean;
}

@NgModule({
  declarations: [FronteggAppComponent, FronteggRouterComponent],
  imports: [CommonModule, RouterModule],
  exports: [FronteggAppComponent, FronteggRouterComponent]
})
export class FronteggAppModule {
  public constructor() { }
  static forRoot(config: FronteggConfigOptions): ModuleWithProviders<FronteggAppModule> {

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
