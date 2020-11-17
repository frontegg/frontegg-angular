## SSO (Single Sign On)

This collection contains built-in components to provide the ability to display your sso configuration, update and etc.

## Usage

To use this component you need to import it from `@frontegg/ng-auth`

```tsx
import { FronteggGuard } from "@frontegg/ng-core";
import { SsoPageComponent } from "@frontegg/ng-auth";

const routes: Routes = [
  {
    path: "",
    canActivate: [FronteggGuard],
    children: [
      {
        path: "sso",
        children: [
          {
            path: "**",
            component: SsoPageComponent,
          },
        ],
      },
      // ...rest routes
    ],
  },
];
```
