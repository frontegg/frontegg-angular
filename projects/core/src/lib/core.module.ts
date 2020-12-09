import { ModuleWithProviders, NgModule } from '@angular/core';
import { FronteggProviderComponent } from './frontegg-provider.component';
import { PageHeaderComponent } from './components/page-header.component';
import { FronteggBaseComponent } from './frontegg-base.component';
import { CommonModule } from '@angular/common';
import { FeProviderProps } from '@frontegg/react-core';
import { FE_PROVIDER_CONFIG } from './constants';
import { FronteggGuard } from './frontegg.guard';
import { CoreService } from './core.service';
import { FronteggRouterComponent } from './frontegg-router.component';

@NgModule({
  declarations: [FronteggProviderComponent, PageHeaderComponent, FronteggBaseComponent, FronteggRouterComponent],
  imports: [CommonModule],
  exports: [FronteggProviderComponent, PageHeaderComponent, FronteggBaseComponent, FronteggRouterComponent],
})
export class CoreModule {
  static forRoot(config?: Omit<FeProviderProps, 'plugins'>): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        CoreService,
        FronteggGuard,
        {
          provide: FE_PROVIDER_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
