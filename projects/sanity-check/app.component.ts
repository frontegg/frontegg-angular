import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FronteggAppService, FronteggAuthService} from "frontegg-angular-16";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = true;
  loadingSubscription: Subscription;
  user?: any;

  constructor(private fronteggAuthService: FronteggAuthService, private fronteggAppService: FronteggAppService) {
    this.loadingSubscription = fronteggAppService.isLoading$.subscribe((isLoading) => this.isLoading = isLoading)
  }

  ngOnInit(): void {
    this.fronteggAuthService?.user$.subscribe((user) => {
      this.user = user
    })
  }

  showAdminPortal(): void {
    this.fronteggAppService?.showAdminPortal()
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe()
  }
}
