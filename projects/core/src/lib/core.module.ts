import { NgModule } from '@angular/core';
import { FronteggProviderComponent } from './frontegg-provider.component';
import { PortalModule } from '@angular/cdk/portal';
import { CountdownModule } from 'ngx-countdown';
import { FronteggFirstComponent } from './frontegg-first-component.component';
import { FronteggRouterComponent } from './frontegg-router.component';


@NgModule({
  declarations: [
    FronteggProviderComponent,
    FronteggFirstComponent,
    FronteggRouterComponent,
  ],
  imports: [
    PortalModule,
    CountdownModule,
  ],
  exports: [
    FronteggProviderComponent,
    FronteggFirstComponent,
  ],
})
export class CoreModule {
}
