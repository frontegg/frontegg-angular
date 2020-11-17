## Profile Component

This collection contains built-in components to provide the ability to display your user profile,
change password and MFA (multi-factor authentication) settings.

## Usage

To use this component you need to import it from `@frontegg/ng-auth`

```tsx
import { FronteggGuard } from "@frontegg/ng-core";
import { ProfileComponent } from "@frontegg/ng-auth";

const routes: Routes = [
  {
    path: "",
    canActivate: [FronteggGuard],
    children: [
      {
        path: "profile",
        children: [
          {
            path: "**",
            component: ProfileComponent,
          },
        ],
      },
      // ...rest routes
    ],
  },
];
```
