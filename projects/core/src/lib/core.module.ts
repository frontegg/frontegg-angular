import { ModuleWithProviders, NgModule } from '@angular/core';
import { FronteggProviderComponent } from './frontegg-provider.component';
import { PortalModule } from '@angular/cdk/portal';
import { PageHeaderComponent } from './components/page-header.component';
import { FronteggBaseComponent } from './frontegg-base.component';
import { CommonModule } from '@angular/common';
import { FeProviderProps } from '@frontegg/react-core';
import { FE_PROFIVER_CONFIG } from './constants';

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
  ],
  exports: [
    FronteggProviderComponent,
    PageHeaderComponent,
    FronteggBaseComponent,
  ],
})
export class CoreModule {

  static forRoot(config?: FeProviderProps): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [{
        provide: FE_PROFIVER_CONFIG,
        useValue: config,
      }],
    };
  }
}
