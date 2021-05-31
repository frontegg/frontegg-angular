import { Component, OnInit } from '@angular/core';
import { FronteggAppService } from 'frontegg-app';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private fronteggAppStateSubject$ = new BehaviorSubject<any>(null);
  authenticated!: string;

  constructor(private fronteggAppService: FronteggAppService) { }

  ngOnInit(): void {
    this.fronteggAppService?.fronteggAppState$.subscribe((s) => {
      this.fronteggAppStateSubject$.next(s)
      this.authenticated = s?.auth?.isAuthenticated
    })
  }

  showApp(): void {
    const fronteggState = this.fronteggAppStateSubject$.getValue()
    if (!!fronteggState && !!fronteggState?.auth?.isAuthenticated) {
      this.fronteggAppService?.showFronteggApp()
    }
  }

  showState(): void {
    console.log('STATE', this.fronteggAppStateSubject$.getValue())
  }
}
