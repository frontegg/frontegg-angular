import { NgModule } from '@angular/core';
import { FronteggProviderComponent } from './frontegg-provider.component';
import { PortalModule } from '@angular/cdk/portal';
import { PageHeaderComponent } from './components/page-header.component';
import * as i0 from "@angular/core";
export class CoreModule {
}
CoreModule.ɵmod = i0.ɵɵdefineNgModule({ type: CoreModule });
CoreModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CoreModule_Factory(t) { return new (t || CoreModule)(); }, imports: [[
            PortalModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CoreModule, { declarations: [FronteggProviderComponent,
        PageHeaderComponent], imports: [PortalModule], exports: [FronteggProviderComponent,
        PageHeaderComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CoreModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    FronteggProviderComponent,
                    PageHeaderComponent,
                ],
                imports: [
                    PortalModule,
                ],
                exports: [
                    FronteggProviderComponent,
                    PageHeaderComponent,
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2RhdmlkYW50b29uL2dpdC9mcm9udGVnZy9mcm9udGVnZy1hbmd1bGFyL3Byb2plY3RzL2NvcmUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOztBQWdCekUsTUFBTSxPQUFPLFVBQVU7OzhDQUFWLFVBQVU7bUdBQVYsVUFBVSxrQkFSWjtZQUNQLFlBQVk7U0FDYjt3RkFNVSxVQUFVLG1CQVhuQix5QkFBeUI7UUFDekIsbUJBQW1CLGFBR25CLFlBQVksYUFHWix5QkFBeUI7UUFDekIsbUJBQW1CO2tEQUdWLFVBQVU7Y0FidEIsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWix5QkFBeUI7b0JBQ3pCLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHlCQUF5QjtvQkFDekIsbUJBQW1CO2lCQUNwQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZyb250ZWdnUHJvdmlkZXJDb21wb25lbnQgfSBmcm9tICcuL2Zyb250ZWdnLXByb3ZpZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcGFnZS1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZyb250ZWdnQmFzZUNvbXBvbmVudCB9IGZyb20gJy4vZnJvbnRlZ2ctYmFzZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGcm9udGVnZ1Byb3ZpZGVyQ29tcG9uZW50LFxuICAgIFBhZ2VIZWFkZXJDb21wb25lbnQsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBQb3J0YWxNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBGcm9udGVnZ1Byb3ZpZGVyQ29tcG9uZW50LFxuICAgIFBhZ2VIZWFkZXJDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvcmVNb2R1bGUge1xufVxuIl19