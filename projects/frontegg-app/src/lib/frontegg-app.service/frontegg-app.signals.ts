import { FronteggState } from '@frontegg/redux-store';
import { Signal, toSignal } from '../v16';
import { FronteggAppObservables } from './frontegg-app.observables';

export class FronteggAppSignals extends FronteggAppObservables {
  get authStateSignal(): Signal<FronteggState['auth'] | undefined> {
    return toSignal(this.authState$);
  }

  get auditsStateSignal(): Signal<FronteggState['audits'] | undefined> {
    return toSignal(this.auditsState$);
  }

  get connectivityStateSignal(): Signal<FronteggState['connectivity'] | undefined> {
    return toSignal(this.connectivityState$);
  }

  get subscriptionsStateSignal(): Signal<FronteggState['subscriptions'] | undefined> {
    return toSignal(this.subscriptionsState$);
  }

  get vendorStateSignal(): Signal<FronteggState['vendor'] | undefined> {
    return toSignal(this.vendorState$);
  }

  get isLoadingSignal(): Signal<boolean | undefined> {
    return toSignal(this.isLoading$);
  }

  get isAuthenticatedSignal(): Signal<boolean | undefined> {
    return toSignal(this.isAuthenticated$);
  }
}
