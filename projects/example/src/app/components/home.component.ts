import { Component, OnInit } from '@angular/core';
import { FronteggAppService } from '@frontegg/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class AppHomeComponent implements OnInit {
  authenticated?: boolean;

  constructor(private fronteggAppService: FronteggAppService, private router: Router) { }

  ngOnInit(): void {
    this.fronteggAppService.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.authenticated = isAuthenticated;
    });
  }

  showApp(): void {
    this.fronteggAppService.showAdminPortal();
  }

  doLogout(): void {
    this.router.navigateByUrl(this.fronteggAppService.authRoutes.logoutUrl);
  }

}
