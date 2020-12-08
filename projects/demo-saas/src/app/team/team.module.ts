import { NgModule } from '@angular/core';

import { TeamComponent } from './team.component';
import { AuthModule } from '@frontegg/ng-auth';

@NgModule({
  declarations: [TeamComponent],
  imports: [AuthModule],
})
export class TeamModule {}
