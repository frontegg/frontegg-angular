import { Routes } from '@angular/router';
import { FronteggGuard } from './frontegg.guard';
import { FronteggRouterComponent } from './frontegg-router.component';

export const withFronteggRoutes = (routes: Routes): Routes => {
  return [
    {
      path: '',
      canActivate: [FronteggGuard],
      canActivateChild: [FronteggGuard],
      children: [
        ...routes,
        {
          path: '**',
          component: FronteggRouterComponent,
        },
      ],
    },
  ];
};
