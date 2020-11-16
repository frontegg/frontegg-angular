import { Component, OnInit } from '@angular/core';
import { AuthService, AuthUserObservable, isAuthenticatedObservable } from '@frontegg/ng-auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  title = 'demo-saas';
  user = null;

  constructor(private authService: AuthService) {
    console.log('test');
    debugger;
  }


  ngOnInit(): void {
  }
}
