import { Component, Signal } from '@angular/core';
import { FronteggAppService } from '@frontegg/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isLoading: Signal<boolean | undefined>;
  constructor(private fronteggAppService: FronteggAppService) {
    this.isLoading = this.fronteggAppService.isLoadingSignal;
  }
}
