import { ModuleWithProviders, NgModule } from '@angular/core';
import { FronteggProviderComponent } from './frontegg-provider.component';
import { PortalModule } from '@angular/cdk/portal';
import { PageHeaderComponent } from './components/page-header.component';
import { FronteggBaseComponent } from './frontegg-base.component';
import { CommonModule } from '@angular/common';
import { FeProviderProps } from '@frontegg/react-core';
import { FE_PROVIDER_CONFIG } from './constants';
import { FronteggGuard } from './frontegg.guard';

@NgModule({
  declarations: [
    FronteggProviderComponent,
    PageHeaderComponent,
    FronteggBaseComponent,
  ],
  imports: [
    PortalModule,
    CommonModule,
  ],
  providers: [
    CoreModule,
    FronteggGuard,
  ],
  exports: [
    FronteggProviderComponent,
    PageHeaderComponent,
    FronteggBaseComponent,
  ],
})
export class CoreModule {

  static forRoot(config?: Omit<FeProviderProps, 'plugins'>): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [{
        provide: FE_PROVIDER_CONFIG,
        useValue: config,
      }],
    };
  }
}
