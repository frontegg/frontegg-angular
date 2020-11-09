import { Component, OnInit } from '@angular/core';
import { AuthUserObservable, isAuthenticatedObservable } from '@frontegg/ng-auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  title = 'demo-saas';
  user = null;
  isAuthenticated = false;


  ngOnInit(): void {
    AuthUserObservable().subscribe(user => {
      console.log('AuthUserObservable', user);
      this.user = user;
    });

    isAuthenticatedObservable().subscribe((state ) => {
      console.log('isAuthenticatedObservable', state.isAuthenticated);
      this.isAuthenticated = state.isAuthenticated;
    });
  }
}
