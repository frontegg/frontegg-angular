import { NgModule } from '@angular/core';

import { MfaComponent } from './mfa.component';
import { AuthModule } from '@frontegg/ng-auth';
import { CoreModule } from '@frontegg/ng-core';

@NgModule({
  declarations: [
    MfaComponent,
  ],
  imports: [
    CoreModule,
    AuthModule,
  ],
})
export class MfaModule {
}
