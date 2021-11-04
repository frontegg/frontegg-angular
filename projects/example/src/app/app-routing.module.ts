import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateRouteComponent } from './components/private-route.component';
import { NotFoundComponent } from './components/not-found.component';
import { AppHomeComponent } from './components/home.component';
import { FronteggAuthGuard } from '@frontegg/angular';

const routes: Routes = [
  {
    path: '', canActivate: [FronteggAuthGuard], children: [
      { path: '', component: AppHomeComponent },
      { path: 'test-private-route', component: PrivateRouteComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
