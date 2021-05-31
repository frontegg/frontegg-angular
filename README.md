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

5. Add button with click method to handle Frontegg aplication opening.

```
/app.component.html

<div>
  <router-outlet></router-outlet>
  <lib-frontegg-app></lib-frontegg-app>
  <button (click)="showApp()"><h2>Open Frontegg app</h2></button>
</div>
```

6. Add route \*\* to your routes

```
/app-routing.module.ts

const routes: Routes = [
  { path: '', component: Component },
  { path: '**, component: EmptyComponent },
];
```

7. Subscribe to FronteggApp state

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

8. Enjoy!
