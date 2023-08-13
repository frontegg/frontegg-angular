import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FronteggAppOptions } from '@frontegg/types';
import { FronteggAppOptionsClass, FronteggAppService, FronteggLoadGuard } from './frontegg-app.service';
import { FronteggComponent } from './frontegg.component';
import { FronteggAuthGuard } from './guards/frontegg-auth.guard';
import { FronteggAuthService } from './frontegg-auth.service';
import { AuthorizedContentDirective } from './directives/authorized-content.directive';
import { FronteggSubscriptionService } from './frontegg-subscription.services';
import { FronteggEntitlementsService } from './frontegg-entitlements.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FronteggComponent, AuthorizedContentDirective],
  exports: [FronteggComponent, AuthorizedContentDirective],
})
export class FronteggAppModule {
  static forRoot(config: FronteggAppOptions): ModuleWithProviders<FronteggAppModule> {
    return {
      ngModule: FronteggAppModule,
      providers: [
        FronteggAppService,
        FronteggAuthGuard,
        FronteggLoadGuard,
        FronteggAuthService,
        FronteggEntitlementsService,
        FronteggSubscriptionService,
        {
          provide: FronteggAppOptionsClass,
          useValue: config,
        },
      ],
    };
  }
}
