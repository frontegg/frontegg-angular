import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyAppComponent } from './empty/empty.component';
import { FronteggAuthGuard } from 'frontegg-app';

const routes: Routes = [
  { path: '', component: EmptyAppComponent },
  { path: 'test-private-route', canActivate: [FronteggAuthGuard], component: EmptyAppComponent },
  { path: '**', component: EmptyAppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
