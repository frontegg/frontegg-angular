# Login Component

Login components provide end-to-end integration with Authentication Service.

Each Auth Component export two types of component.

1. Full page (includes styles, headers, etc.)
2. Standalone Component (Display components as used in the UI)

## Usage

```ts
import { LoginPageComponent } from "@frontegg/ng-auth";

const routes: Routes = withFronteggRoutes([
    {
      path: "login",
      children: [
        {
          path: "**",
          component: LoginPageComponent,
        },
      ],
    },
  // ...rest routes
]);
```
