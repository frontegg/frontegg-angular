import { ModuleWithProviders, NgModule } from '@angular/core';
import { FE_CONNECTIVITY_PLUGIN_CONFIG } from '@frontegg/ng-core';
import { ConnectivityPlugin } from '@frontegg/react-connectivity';
import { ConnectivityService } from './connectivity.service';
import { ConnectivityComponent } from './connectivityPage';

const components = [
  ConnectivityComponent,
];

@NgModule({
  imports: [],
  declarations: components,
  providers: [
    ConnectivityService,
  ],
  exports: [
    ...components,
  ],
})
export class ConnectivityModule {
  constructor(private connectivityService: ConnectivityService) {
  }

  static forRoot(): ModuleWithProviders<ConnectivityModule> {
    return {
      ngModule: ConnectivityModule,
      providers: [
        {
          provide: FE_CONNECTIVITY_PLUGIN_CONFIG,
          useValue: ConnectivityPlugin(),

        },
      ],
    };
  }
}
