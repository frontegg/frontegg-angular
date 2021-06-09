import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyAppComponent } from './empty/empty.component';
import { FronteggAuthGuard, connectFronteggRouter } from 'frontegg-app';
import { NotFoundComponent } from './not-found.component';


const routes: Routes = connectFronteggRouter([
  { path: '', component: EmptyAppComponent },
  { path: 'test-private-route', canActivate: [FronteggAuthGuard], component: EmptyAppComponent },
  // { path: '**', component: RedirectHome },
  { path: '**', component: NotFoundComponent },
]);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
