import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { RedirectComponent } from './home/redirect.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'team', children: [{
      path: '**', component: TeamComponent,
    }],
  }, {
    path: '**', component: RedirectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
