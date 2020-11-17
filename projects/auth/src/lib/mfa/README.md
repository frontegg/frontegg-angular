## Profile Component

MFA (multi-factor authentication) settings.

## Usage

To use this component you need to import it from `@frontegg/ng-auth`

```tsx
import { FronteggGuard } from "@frontegg/ng-core";
import { MfaComponent } from "@frontegg/ng-auth";

const routes: Routes = [
  {
    path: "",
    canActivate: [FronteggGuard],
    children: [
      {
        path: "mfa",
        children: [
          {
            path: "**",
            component: MfaComponent,
          },
        ],
      },
      // ...rest routes
    ],
  },
];
```
