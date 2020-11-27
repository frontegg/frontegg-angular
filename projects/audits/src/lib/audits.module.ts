import { ModuleWithProviders, NgModule } from '@angular/core';
import { FE_AUDITS_PLUGIN_CONFIG } from '@frontegg/ng-core';
import { AuditsPlugin } from '@frontegg/react-audits';
import { AuditsService } from './audits.service';
import { AuditsComponent } from './audits.component';
import { AuditsGuard } from './audits.guard';
import { AuditsDirective } from './audits.directive';

const components = [
  AuditsComponent,
  AuditsDirective,
];

@NgModule({
  imports: [],
  declarations: components,
  providers: [
    AuditsService,
    AuditsGuard,
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
        {
          provide: FE_AUDITS_PLUGIN_CONFIG,
          useValue: AuditsPlugin(),
        },
      ],
    };
  }
}
