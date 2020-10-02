import { NgModule } from '@angular/core';
import { FronteggProviderComponent } from './frontegg-provider.component';
import { PortalModule } from '@angular/cdk/portal';
import { CountdownModule } from 'ngx-countdown';
import { FronteggFirstComponent } from './frontegg-first-component.component';
import { FronteggRouterComponent } from './frontegg-router.component';
import * as i0 from "@angular/core";
export class CoreModule {
}
CoreModule.ɵmod = i0.ɵɵdefineNgModule({ type: CoreModule });
CoreModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CoreModule_Factory(t) { return new (t || CoreModule)(); }, imports: [[
            PortalModule,
            CountdownModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CoreModule, { declarations: [FronteggProviderComponent,
        FronteggFirstComponent,
        FronteggRouterComponent], imports: [PortalModule,
        CountdownModule], exports: [FronteggProviderComponent,
        FronteggFirstComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CoreModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    FronteggProviderComponent,
                    FronteggFirstComponent,
                    FronteggRouterComponent,
                ],
                imports: [
                    PortalModule,
                    CountdownModule,
                ],
                exports: [
                    FronteggProviderComponent,
                    FronteggFirstComponent,
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2RhdmlkYW50b29uL2dpdC9mcm9udGVnZy9mcm9udGVnZy1hbmd1bGFyL3Byb2plY3RzL2NvcmUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBa0J0RSxNQUFNLE9BQU8sVUFBVTs7OENBQVYsVUFBVTttR0FBVixVQUFVLGtCQVRaO1lBQ1AsWUFBWTtZQUNaLGVBQWU7U0FDaEI7d0ZBTVUsVUFBVSxtQkFibkIseUJBQXlCO1FBQ3pCLHNCQUFzQjtRQUN0Qix1QkFBdUIsYUFHdkIsWUFBWTtRQUNaLGVBQWUsYUFHZix5QkFBeUI7UUFDekIsc0JBQXNCO2tEQUdiLFVBQVU7Y0FmdEIsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWix5QkFBeUI7b0JBQ3pCLHNCQUFzQjtvQkFDdEIsdUJBQXVCO2lCQUN4QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixlQUFlO2lCQUNoQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AseUJBQXlCO29CQUN6QixzQkFBc0I7aUJBQ3ZCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRnJvbnRlZ2dQcm92aWRlckNvbXBvbmVudCB9IGZyb20gJy4vZnJvbnRlZ2ctcHJvdmlkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFBvcnRhbE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ291bnRkb3duTW9kdWxlIH0gZnJvbSAnbmd4LWNvdW50ZG93bic7XG5pbXBvcnQgeyBGcm9udGVnZ0ZpcnN0Q29tcG9uZW50IH0gZnJvbSAnLi9mcm9udGVnZy1maXJzdC1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IEZyb250ZWdnUm91dGVyQ29tcG9uZW50IH0gZnJvbSAnLi9mcm9udGVnZy1yb3V0ZXIuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGcm9udGVnZ1Byb3ZpZGVyQ29tcG9uZW50LFxuICAgIEZyb250ZWdnRmlyc3RDb21wb25lbnQsXG4gICAgRnJvbnRlZ2dSb3V0ZXJDb21wb25lbnQsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBQb3J0YWxNb2R1bGUsXG4gICAgQ291bnRkb3duTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRnJvbnRlZ2dQcm92aWRlckNvbXBvbmVudCxcbiAgICBGcm9udGVnZ0ZpcnN0Q29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb3JlTW9kdWxlIHtcbn1cbiJdfQ==