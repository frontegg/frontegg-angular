import { NgModule } from '@angular/core';
import { FronteggProviderComponent } from './frontegg-provider.component';
import { PortalModule } from '@angular/cdk/portal';
import { PageHeaderComponent } from './components/page-header.component';
import { FronteggBaseComponent } from './frontegg-base.component';

@NgModule({
  declarations: [
    FronteggProviderComponent,
    PageHeaderComponent,
  ],
  imports: [
    PortalModule,
  ],
  exports: [
    FronteggProviderComponent,
    PageHeaderComponent,
  ],
})
export class CoreModule {
}
