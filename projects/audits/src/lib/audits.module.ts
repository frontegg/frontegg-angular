import { ModuleWithProviders, NgModule } from '@angular/core';
import { FE_AUDITS_PLUGIN_CONFIG } from '@frontegg/ng-core';
import { AuditsPlugin } from '@frontegg/react-audits';
import { AuditsService } from './audits.service';
import { AuditsComponent } from './audits.component';

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
  constructor(private auditsService: AuditsService) {
  }

  static forRoot(): ModuleWithProviders<AuditsModule> {
    return {
      ngModule: AuditsModule,
      providers: [
        {
          provide: FE_AUDITS_PLUGIN_CONFIG,
          useValue: AuditsPlugin(),

        },
      ],
    };
  }
}
