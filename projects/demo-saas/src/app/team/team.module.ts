import { NgModule } from '@angular/core';

import { TeamComponent } from './team.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@frontegg/ng-core';


@NgModule({
  declarations: [
    TeamComponent,
  ],
  imports: [
    RouterModule,
    CoreModule,
  ],
})
export class TeamModule {
}
