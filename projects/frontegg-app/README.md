# Frontegg Angular

## How to use

### 1. Install Frontegg Libraries Run the following command to Install Frontegg Angular library.

```
npm install @frontegg/angular
```

### 2. Configuration
  1. Add `FronteggAppModule` to `AppModule.imports[]`
  2. Add `FronteggComponent` to `AppModule.entryComponents[]`

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

    /** 1. Import Frontegg Module **/
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

  /** 2. Add Frontetgg Component to your entryComponents **/
  entryComponents: [FronteggComponent],

  bootstrap: [AppComponent],
})
export class AppModule { }
```

#### Connect your application bootstrap component with `fronteggService` to listen for frontegg loading state

```
/app.component.ts

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDistory {
  isLoading = true;
  loadingSubscription: Subscription;

  constructor(private fronteggAppService: FronteggAppService) {
    this.loadingSubscription = fronteggAppService.isLoading$.subscribe((isLoading) => this.isLoading = isLoading);
  }

  ngOnDistory(): void {
    this.loadingSubscription.unsubscribe()
  }
}
```

#### And wrap your application with `*ngIf="!isLoading"` selector to make sure you have the right context

```
/app.component.html

<div *ngIf="!isLoading">
    <router-outlet></router-outlet>
</div>
```

### 3. Getting the user context Frontegg exposes the user context and the authentication state via a `FronteggAppService`. You can access the whole authentication state via the `FronteggAppService`. To have an access to memoized
   authentication substates like user state, SSO state, MFA state, etc. use `FronteggAppAuthService` as in the following
   sample:

```
import { Component, OnInit } from '@angular/core';
import { FronteggAuthService, AuthState } from '@frontegg/angular';

@Component({
  selector: 'app-root',
  template: `<div *ngIf="authenticated">
    <img src={{user?.profilePictureUrl}} alt={{user?.name}} />
    <div>User name: {{user?.name}}</div>
  </div>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user?: AuthState['user'] | null;

  constructor(private fronteggAuthService: FronteggAuthService) {
  }

  ngOnInit(): void {
    this.fronteggAppAuthService?.userState$.subscribe((user) => {
      this.user = user
    })
  }
}
```

### 4. Tou can add FronteggAuthGuard to your routing module to redirect the user to the login page if the user not authenticated and trying to reach a private route.

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedAppComponent } from './components/protected.component';
import { NotFoundComponent } from './components/not-found.component';
import { FronteggAuthGuard } from '@frontegg/angular';

/** Option to protect a specific route **/
const routes: Routes = [
  { path: '', component: EmptyAppComponent },
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
  imports: [RouterModule.forRoot(routes)],
  providers: [],
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

### 6. Using signals
In order to use frontegg signals you will have to call it from the frontegg services and assign them to the component state

```
import { Component, OnInit, Signal } from '@angular/core';
import { FronteggAppService, FronteggAuthService, AuthState } from '@frontegg/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class AppComponent implements OnInit {
  user: Signal<AuthState['user'] | undefined>
  authenticated: Signal<boolean | undefined>
  constructor(private fronteggAppService: FronteggAppService,
    private fronteggAuthService: FronteggAuthService,
    private router: Router) {
    this.user = this.fronteggAuthService.signals.user
    this.authenticated = this.fronteggAppService.signals.isAuthenticated
  }
}
```

Then access it from the html component file
```
<div>
    <p>Authenticated: {{authenticated()}}</p>
    <p>Authenticated as: {{user()?.name}}</p>
</div>
```

7. Enjoy!