# FronteggAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## How to use

1.  Add FronteggAppModule to imports.
2.  Use forRoot method to pass properties.

```
/app.module.ts

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FronteggAppModule.forRoot({
      version: 'next',
      contextOptions: {
        baseUrl: 'https://max.frontegg.com'
      }
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

3.  Add method to handle showing Frontegg application with FronteggAppService

```
/app.component.ts

export class AppComponent {
 constructor(private fronteggAppService: FronteggAppService) { }

 showApp(): void {
   this.fronteggAppService?.openFronteggApp()
 }
}
```

4. Add lib-frontegg-app selector to your app component

```
/app.component.html

<div>
  <router-outlet></router-outlet>
  <lib-frontegg-app></lib-frontegg-app>
</div>
```

5. Add button with click callback to handle Frontegg aplication opening.

```
/app.component.html

<div>
  <router-outlet></router-outlet>
  <lib-frontegg-app></lib-frontegg-app>
  <button (click)="showApp()"><h2>Open Frontegg app</h2></button>
</div>
```

6. Add auth routes to your routing module. By default it /account/**

```
/app-routing.module.ts

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'account', children: [
      { path: '**', component: EmptyAppComponent }
    ], component: EmptyAppComponent
  },
];
```

7. Add FronteggGuard to your routing module to redirect user to login page.

```
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'private-route', canActivate: [FronteggAuthGuard], component: PrivateComponent },
  {
    path: 'account', children: [
      { path: '**', component: EmptyAppComponent }
    ], component: EmptyAppComponent
  },
];
```

8. Subscribe to FronteggApp state

```
/app.component.ts

export class AppComponent implements OnInit {
  private fronteggAppStateSubject$ = new BehaviorSubject<FronteggAppState>(null);

  constructor(private fronteggAppService: FronteggAppService) { }

  ngOnInit(): void {
    this.fronteggAppService?.fronteggAppState$.subscribe((s) => {
      this.fronteggAppStateSubject$.next(s)
    })
  }
}
```

9. Enjoy!
