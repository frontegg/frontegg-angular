import { CoreModule } from '@frontegg/ng-core';
import { NgModule } from '@angular/core';

import { SsoComponent } from './sso.component';
import { AuthModule } from '@frontegg/ng-auth';

@NgModule({
  declarations: [SsoComponent],
  imports: [AuthModule, CoreModule],
  exports: [SsoComponent],
})
export class SsoModule {}
