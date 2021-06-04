# FronteggApp

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.9.

## Code scaffolding

Run `ng generate component component-name --project frontegg-app` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project frontegg-app`.
> Note: Don't forget to add `--project frontegg-app` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build frontegg-app` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build frontegg-app`, go to the dist folder `cd dist/frontegg-app` and run `npm publish`.

## Running unit tests

Run `ng test frontegg-app` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Documentation

Angular integration

## STEP 1: Create a New Angular application

## STEP 2: Install Frontegg Libraries
Run the following command to Install frontegg Angular library.

```
npm install @frontegg/frontegg-angular
```

## STEP 3: Configuration

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FronteggAppModule } from 'frontegg-app';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FronteggAppModule.forRoot(
      {
        contextOptions: {
          baseUrl: 'https://max.frontegg.com'
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

And wrap your application with lib-frontegg-app selector to make sure you have the right context

```
/app.component.html

<lib-frontegg-app>
  <div>
    <router-outlet></router-outlet>
  </div>
</lib-frontegg-app>
```

## STEP 4: Getting the user context

Frontegg exposes the user context and the authentication state via a FronteggAppService. You can access the authentication state via the FronteggAppService as in the following sample:

```
/app.component.ts

export class AppComponent implements OnInit {

  constructor(private fronteggAppService: FronteggAppService) { }

  ngOnInit(): void {
    this.fronteggAppService?.fronteggAppAuthState$.subscribe((authState) => {
      console.log(authState)
    })
  }
}
```

## STEP 5: Run the App, Signup & Login

We are all set. Let's run the application and see Frontegg in action.

```
npm run serve
```

Great, Frontegg is now integrated with your app!

Login and logout routes have been added to your app:

Signup screen will be at http://localhost:8080/account/sign-up

Login screen will be at http://localhost:8080/account/login

If you are already logged in, go to http://localhost:8080/account/logout and log out.

Give it a try by now by signing up & logging in.

Give it a try now!
Open http://localhost:8080/account/sign-up and sign up with your first user.

## Frontegg Admin Portal Integration

For Frontegg admin portal integration we will import the FronteggAppService from the @frontegg/angular package and use showFronteggApp method when clicking on the relevant button

```
import { Component, OnInit } from '@angular/core';
import { FronteggAppService } from 'frontegg-app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private fronteggAppService: FronteggAppService) { }

  showApp(): void {
    this.fronteggAppService?.showFronteggApp()
  }

}
```

You are good to go!
The admin portal should now be shown and you are on the part for a full self-served experience on your product!
