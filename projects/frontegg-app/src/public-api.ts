/*
 * Public API Surface of frontegg-app
 */

export { FronteggAppModule } from './lib/frontegg-app.module';
export { FronteggAppService } from './lib/frontegg-app.service';
export { FronteggComponent } from './lib/frontegg.component';
export { FronteggAuthService } from './lib/frontegg-auth.service';
export { FronteggSubscriptionService } from './lib/frontegg-subscription.services';
export * from './lib/directives/authorized-content.directive';
export * from './lib/guards/frontegg-auth.guard';
export * from './lib/guards/frontegg-load.guard';
export { ContextHolder } from '@frontegg/rest-api';
