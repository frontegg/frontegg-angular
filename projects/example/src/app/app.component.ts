import { Component, OnInit } from '@angular/core';
import { FronteggAppService, FronteggAppAuthService } from 'frontegg-app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private fronteggAppState: any;
  private fronteggAppAuthState: any;
  private fronteggAppAuditsState: any;
  authenticated?: boolean;

  constructor(private fronteggAppService: FronteggAppService, private froonteggAppAuthService: FronteggAppAuthService) { }

  ngOnInit(): void {
    this.fronteggAppService?.fronteggAppState$.subscribe((s: any) => {
      this.fronteggAppState = s;
    });
    this.fronteggAppService?.fronteggAppAuthState$.subscribe((authState: any) => {
      this.fronteggAppAuthState = authState;
    });
    this.fronteggAppService?.fronteggAppAuditsState$.subscribe((auditsState: any) => {
      this.fronteggAppAuditsState = auditsState;
    });
    this.froonteggAppAuthService?.loginState$.subscribe((s: any) => console.log(s, 'auth service memoized login state'));
    this.froonteggAppAuthService?.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.authenticated = isAuthenticated
    });
  }

  showApp(): void {
    this.fronteggAppService?.showAdminPortal();
  }

  showState(): void {
    console.log('STATE', this.fronteggAppState);
    console.log('AUTH STATE', this.fronteggAppAuthState);
    console.log('AUTHENTICATED', this.authenticated);
    console.log('AUDITS', this.fronteggAppAuditsState);
  }
}
