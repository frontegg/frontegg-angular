import { Component, OnInit } from '@angular/core';
import { FronteggAppService } from 'frontegg-app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private fronteggAppState: any;
  private fronteggAppAuthState: any;
  authenticated!: string;

  constructor(private fronteggAppService: FronteggAppService) { }

  ngOnInit(): void {
    this.fronteggAppService?.fronteggAppState$.subscribe((s) => {
      this.fronteggAppState = s
    })
    this.fronteggAppService?.fronteggAppAuthState$.subscribe((authState) => {
      this.fronteggAppAuthState = authState
      this.authenticated = authState?.isAuthenticated
    })
  }

  showApp(): void {
    const fronteggState = this.fronteggAppState
    if (!!fronteggState && !!fronteggState?.auth?.isAuthenticated) {
      this.fronteggAppService?.showFronteggApp()
    }
  }

  showState(): void {
    console.log('STATE', this.fronteggAppState);
    console.log('AUTH STATE', this.fronteggAppAuthState);
    console.log('AUTHENTICATED', this.authenticated);
  }
}
