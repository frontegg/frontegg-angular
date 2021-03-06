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

@NgModule({
  declarations: [AppComponent],
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

And wrap your application with `frontegg-app` selector to make sure you have the right context

```
/app.component.html

<frontegg-app>
  <div>
    <router-outlet></router-outlet>
  </div>
</frontegg-app>
```

3. Getting the user context
   Frontegg exposes the user context and the authentication state via a `FronteggAppService`.
   You can access the whole authentication state via the `FronteggAppService`.
   To have an access to memoized authentication substates like user state, SSO state, MFA state, etc.
   use `FronteggAppAuthService` as in the following sample:

```
import { Component, OnInit } from '@angular/core';
import { FronteggAppAuthService, AuthState } from '@frontegg/angular';

@Component({
  selector: 'app-root',
  template: `<div *ngIf="authenticated">
    <img src={{user?.profilePictureUrl}} alt={{user?.name}} />
    <div>User name: {{user?.name}}</div>
  </div>`,
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

4. Wrapp your routes with connectFronteggRouter. Note that path: '**' should be predefined.
   Also, you can add FronteggGuard to your routing module to redirect the user to the login page if the user not
   authenticated and trying to reach a private route.

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyAppComponent } from './empty/empty.component';
import { FronteggAuthGuard, connectFronteggRouter } from '@frontegg/angular';


const routes: Routes = connectFronteggRouter([
  { path: '', component: EmptyAppComponent },
  { path: 'test-private-route', canActivate: [FronteggAuthGuard], component: EmptyAppComponent },
  { path: '**', component: NotFoundComponent },
]);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
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
Open http://localhost:8080/account/sign-up and sign up with your first user.

# Frontegg Admin Portal Integration

In order to allow your end users to control the Security Settings, Profile, Team Management and more, the next step will be to embed the `Admin Portal` into your application.

For Frontegg admin portal integration we will import the`FronteggAppService` from the `frontegg-app` package and use `showAdminPortal`
method when clicking on the relevant button.


```
import { Component, OnInit } from '@angular/core';
import { FronteggAppService } from '@frontegg/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private fronteggAppService: FronteggAppService) { }

  showApp(): void {
    this.fronteggAppService?.showAdminPortal()
  }
}
```

6. Enjoy!
