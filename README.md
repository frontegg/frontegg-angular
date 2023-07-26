<div align="center">
<img src="https://fronteggstuff.blob.core.windows.net/frongegg-logos/logo-transparent.png" alt="Frontegg Logo" width="400" height="90">
<h3 align="center">Frontegg Angular</h3>
  <p align="center">
    Frontegg is a web platform where SaaS companies can set up their fully managed, scalable and brand aware - SaaS features and integrate them into their SaaS portals in up to 5 lines of code.
    <br />
</div>
<br />

## BREAKING CHANGES SINCE VERSION 3.0.1
If you are migrating from `@frontegg/angular` version 2 or earlier, you can find a [migration guide here](https://docs.frontegg.com/docs/migration-guide-fronteggangular-v2-v3)

### 1. Install Frontegg Libraries 

Run the following command to Install Frontegg Angular library:

```bash
npm install @frontegg/angular
```

### 2. Configuration
1. Add `FronteggAppModule` to `AppModule.imports[]`
2. Add `FronteggComponent` to `AppModule.entryComponents[]`

```ts
/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FronteggAppModule, FronteggComponent } from '@frontegg/angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,

    /** 1. Import Frontegg Module **/
    FronteggAppModule.forRoot(
      {
        contextOptions: {
          baseUrl: 'https://[YOUR_SUBDOMAIN].frontegg.com',
          clientId: '[YOUR_CLIENT_ID]'
        },
      }
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

#### Connect your application bootstrap component with `fronteggService` to listen for frontegg loading state

```ts
//app.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FronteggAuthService, FronteggAppService } from '@frontegg/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  isLoading = true;
  loadingSubscription: Subscription;
  constructor(private fronteggAppService: FronteggAppService) {
    this.loadingSubscription = fronteggAppService.isLoading$.subscribe((isLoading) => this.isLoading = isLoading)
  }
  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe()
  }
}
```

#### And wrap your application with `*ngIf="!isLoading"` selector to make sure you have the right context

```html
<!-- app.component.html -->

<div *ngIf="!isLoading">
    <router-outlet></router-outlet>
</div>
```

### 3. Getting the user context 

Frontegg exposes the user context and the authentication state via a `FronteggAppService`. You can access the whole authentication state via the `FronteggAppService`. To have an access to memoized
authentication substates like user state, SSO state, MFA state, etc. use `FronteggAuthService` as in the following
sample:

```ts
// app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FronteggAuthService, FronteggAppService } from '@frontegg/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = true;
  loadingSubscription: Subscription;
  user?: any;

  constructor(
    private fronteggAuthService: FronteggAuthService, 
    private fronteggAppService: FronteggAppService) {
  	this.loadingSubscription = 
      fronteggAppService.isLoading$.subscribe((isLoading) => this.isLoading = isLoading)
  }

  ngOnInit(): void {
    this.fronteggAuthService?.user$.subscribe((user) => {
      this.user = user
    })
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe()
  }
}
```

Update `app.component.html` to display the user's name and avatar:

```html
<!-- app.component.html-->

<div *ngIf="!isLoading">
    <img src={{user?.profilePictureUrl}} alt={{user?.name}} />
    <div>User name: {{user?.name}}</div>
</div>

```

### 4. Add FronteggAuthGuard to your routing module 

Use the `FronteggAuthGuard` to redirect the user to the login page if the user not authenticated and trying to reach a private route.

```ts
// app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedAppComponent } from './components/protected.component';
import { NotFoundComponent } from './components/not-found.component';
import { HomeComponent } from './components/home.component';
import { UsersComponent } from './components/users.component';
import { FronteggAuthGuard } from '@frontegg/angular';

/** Option to protect a specific route **/
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test-private-route', canActivate: [FronteggAuthGuard], component: ProtectedAppComponent },
  { path: '**', component: NotFoundComponent },
]

/** Option to protect all routes **/
const routes: Routes = [
  {
    path: '',
    canActivate: [FronteggAuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: '**', component: NotFoundComponent },
    ]
  },
]

@NgModule({
  declarations: [ProtectedAppComponent, HomeComponent, UsersComponent, NotFoundComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

### 5. Run the App, Signup & Login

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

In order to allow your end users to control the Security Settings, Profile, Team Management and more, the next step will
be to embed the `Admin Portal` into your application.

For Frontegg admin portal integration we will import the`FronteggAppService` from the `frontegg-app` package and
use `showAdminPortal`
method when clicking on the relevant button.

```ts
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

### 6. Using signals

In order to use frontegg signals you will have to call it from the frontegg services and assign them to the component state

```
import { Component, OnInit } from '@angular/core';
import { FronteggAppService, FronteggAuthService, AuthState } from '@frontegg/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class AppComponent implements OnInit {
  user?: AuthState['user']
  authenticated?: boolean
  constructor(private fronteggAppService: FronteggAppService,
    private fronteggAuthService: FronteggAuthService) {
    this.user = this.fronteggAuthService.userSignal()
    this.authenticated = this.fronteggAppService.isAuthenticatedSignal()
  }
}
```

7. Enjoy!