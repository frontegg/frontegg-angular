# Frontegg Angular

## How to use

1. Install Frontegg Libraries
   Run the following command to Install Frontegg Angular library.

```
npm install @frontegg/angular
```

2. Configuration
   Add `FronteggAppModule` to `AppModule`

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FronteggAppModule } from '@frontegg/angular';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FronteggAppModule.forRoot(
      {
        contextOptions: {
          baseUrl: 'https://[YOUR_SUBDOMAIN].frontegg.com'
        },
        // Replace this with your app logo 👇
        headerImage: 'https://assets.frontegg.com/public-frontegg-assets/acme-logo.svg';
      }
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

3. Wrapp your routes with connectFronteggRouter.

   Note that path: '**' should be predefined.
   Note that you must wrapp your wildcard route with our FronteggRouterComponent as in example.

   Also, you can add FronteggAuthGuard to your routing module to redirect the user to the login page if the user is not authenticated and tries to reach a private route.

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmptyAppComponent } from './empty/empty.component';
import { FronteggAuthGuard, FronteggRouterComponent } from '@frontegg/angular';


const routes: Routes = connectFronteggRouter([
  { path: '', component: HomeComponent },
  { path: 'test-private-route', canActivate: [FronteggAuthGuard], component: EmptyAppComponent },
  {
    path: '**', component: FronteggRouterComponent,
    children: [{ path: '**', component: NotFoundComponent }],
  },
]);

@NgModule({
  declarations: [EmptyAppComponent],
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

4. Getting the user context
  Wrap your application with `frontegg-app` selector to make sure you have the right context

```
/app.component.html

<frontegg-app>
  <div>
    <router-outlet></router-outlet>
  </div>
</frontegg-app>
```

   Frontegg exposes the user context and the authentication state via a `FronteggAppService`.
   You can access the whole authentication state via the `FronteggAppService`.
   To have an access to memoized authentication substates like user state, SSO state, MFA state, etc.
   use `FronteggAppAuthService` as in the following sample:

```
import { Component, OnInit } from '@angular/core';
import { FronteggAppAuthService, AuthState } from '@frontegg/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  authenticated?: boolean;
  user?: AuthState['user'] | null;

  constructor(private fronteggAppAuthService: FronteggAppAuthService) {
    this.user
  }

  ngOnInit(): void {
    this.fronteggAppAuthService?.isAuthenticated$.subscribe((isAuthenticated) => {
      this.authenticated = isAuthenticated
    })
    this.fronteggAppAuthService?.userState$.subscribe((user) => {
      this.user = user
    })
  }
}
```

Here is an example of how to use the user context:

```
/app.component.html

<frontegg-app>
  <div *ngIf="authenticated">
    <img src={{user?.profilePictureUrl}} alt={{user?.name}} />
    <div>User name: {{user?.name}}</div>
  </div>
  <router-outlet></router-outlet>
</frontegg-app>
```

5.  Run the App, Signup & Login

We are all set. Let's run the application and see Frontegg in action.

```
npm run serve
```

Great, Frontegg is now integrated with your app!

Login and logout routes have been added to your app:

Signup screen will be at http://localhost:4200/account/sign-up

Login screen will be at http://localhost:4200/account/login

If you are already logged in, go to http://localhost:4200/account/logout and log out.

Give it a try by now by signing up & logging in.

Give it a try now!
Open http://localhost:4200/account/sign-up and sign up with your first user.

# Frontegg Admin Portal Integration

In order to allow your end users to control the Security Settings, Profile, Team Management and more, the next step will be to embed the `Admin Portal` into your application.

For Frontegg admin portal integration, we will import theFronteggAppService
from the @frontegg/angular package and use showAdminPortal method when clicking on the relevant button.


```
import { Component } from '@angular/core';
import { FronteggAppService } from '@frontegg/angular';

@Component({
  selector: 'show-admin-portal',
  template: '<button (click)="showAdminPortal()">Show Admin Portal</button>',
})
export class ShowAdminPortalComponent {
  constructor(private fronteggAppService: FronteggAppService) { }

  showAdminPortal(): void {
    this.fronteggAppService?.showAdminPortal()
  }
}
```

6. Enjoy!
