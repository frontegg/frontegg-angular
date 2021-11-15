import { Component, OnInit } from '@angular/core';
import { FronteggAppService, FronteggAuthService } from '@frontegg/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class AppHomeComponent implements OnInit {
  authenticated?: boolean;
  user?: any;

  constructor(private fronteggAppService: FronteggAppService,
    private fronteggAuthService: FronteggAuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.fronteggAppService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.authenticated = isAuthenticated;
    });

    this.fronteggAuthService.user$.subscribe((user: any) => {
      this.user = user;
    });
  }

  showApp(): void {
    this.fronteggAppService.showAdminPortal();
  }

  doLogout(): void {
    this.router.navigateByUrl(this.fronteggAppService.authRoutes.logoutUrl);
  }

  loginWithRedirect(): void {
    this.fronteggAuthService.loginWithRedirect();
  }

}
