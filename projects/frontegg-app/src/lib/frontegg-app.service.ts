import { Inject, Injectable } from '@angular/core';
import { initialize } from "@frontegg/admin-portal";
import { BehaviorSubject } from 'rxjs';
import { FE_PROVIDER_CONFIG } from './constants';
import { FronteggConfigOptions } from './frontegg-app.module';

type TFronteggApp = ReturnType<typeof initialize>;

@Injectable({
  providedIn: 'root'
})
export class FronteggAppService {
  fronteggApp: TFronteggApp;
  //TODO: types
  private fronteggAppStateSubject$ = new BehaviorSubject<any>(null);
  readonly fronteggAppState$ = this.fronteggAppStateSubject$.asObservable();

  constructor(@Inject(FE_PROVIDER_CONFIG) private config: FronteggConfigOptions) {
    const _config = this.config ?? {
      version: 'next',
      contextOptions: {
        baseUrl: 'https://max.frontegg.com',
      }
    }
    const fronteggApp = initialize(_config)
    this.fronteggApp = fronteggApp

    fronteggApp.onStoreChanged(() => {
      this.fronteggAppStateSubject$.next(this.fronteggApp.store?.getState())
    })
  }

  showFronteggApp(): void {
    this.fronteggApp?.adminPortal?.open()
  }
}
