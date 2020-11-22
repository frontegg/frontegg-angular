import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { AuthModule } from '@frontegg/ng-auth';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    AuthModule,
  ],
})
export class ProfileModule {
}
