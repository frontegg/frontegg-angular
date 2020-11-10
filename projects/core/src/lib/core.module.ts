import { NgModule } from '@angular/core';
import { FronteggProviderComponent } from './frontegg-provider.component';
import { PortalModule } from '@angular/cdk/portal';
import { PageHeaderComponent } from './components/page-header.component';
import { FronteggBaseComponent } from './frontegg-base.component';
import { CommonModule } from '@angular/common';

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
  exports: [
    FronteggProviderComponent,
    PageHeaderComponent,
    FronteggBaseComponent,
  ],
})
export class CoreModule {
}
