import { Component, OnDestroy, OnInit } from '@angular/core';
import { FronteggAppService } from '@frontegg/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = true;
  loadingSubscription: Subscription;

  constructor(private fronteggAppService: FronteggAppService) {
    this.loadingSubscription = fronteggAppService.isLoading$.subscribe((isLoading) => this.isLoading = isLoading);
  }

  ngOnInit(): void {
    console.log('AppComponent', 'ngOnInit');
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
