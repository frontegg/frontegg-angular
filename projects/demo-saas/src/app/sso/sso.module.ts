import { NgModule } from '@angular/core';

import { SsoComponent } from './sso.component';
import { AuthModule } from '@frontegg/ng-auth';

@NgModule({
  declarations: [SsoComponent],
  imports: [AuthModule],
  exports: [SsoComponent],
})
export class SsoModule {}
