import { Component, OnInit } from '@angular/core';
import { AuthService, AuthUserObservable, isAuthenticatedObservable } from '@frontegg/ng-auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  title = 'demo-saas';
  user = null;

  constructor(public authService: AuthService) {
    // authService.isAuthenticated
  }


  ngOnInit(): void {

  }
}
