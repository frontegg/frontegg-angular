import { ModuleWithProviders, NgModule } from '@angular/core';
import { FE_AUDITS_PLUGIN_CONFIG } from '@frontegg/ng-core';
import { AuditsPlugin } from '@frontegg/react-audits';
import { AuditsComponent } from './audits/audits-component';
import { AuditsService } from './audits.service'
// import { AuthGuard } from './auth.guard';

const components = [
  AuditsComponent,
];

@NgModule({
  imports: [],
  declarations: components,
  providers: [
    AuditsService,
    
  ],
  exports: [
    ...components,
  ],
})
export class AuditsModule {
  static forRoot(): ModuleWithProviders<AuditsModule> {
    return {
      ngModule: AuditsModule,
      providers: [
        AuditsService,
        {
          provide: FE_AUDITS_PLUGIN_CONFIG,
          useValue: AuditsPlugin(),
        },
      ],
    };
  }
}
