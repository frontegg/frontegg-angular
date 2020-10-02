import { Component, } from '@angular/core';
import { NavigationStart } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const _c0 = ["*"];
export class FronteggRouterComponent {
    constructor(elem, router) {
        this.elem = elem;
        // @ts-ignore
        window.ngHistory = router;
        router.events.subscribe((event) => {
            console.log(event);
            if (event instanceof NavigationStart) {
                console.log(event);
                if (event.navigationTrigger === 'imperative') {
                    // @ts-ignore
                    (window.rcHistory).replace(event.url, event.restoredState);
                }
                // @ts-ignore
                // console.log(window.ngHistory.location._platformLocation._history);
                // @ts-ignore
                // Object.assign(window.rcHistory, window.ngHistory.location._platformLocation._history);
                // event.url
                // window.localStorage.setItem('previousUrl', this.router.url);
            }
        });
    }
}
FronteggRouterComponent.ɵfac = function FronteggRouterComponent_Factory(t) { return new (t || FronteggRouterComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.Router)); };
FronteggRouterComponent.ɵcmp = i0.ɵɵdefineComponent({ type: FronteggRouterComponent, selectors: [["frontegg-router"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function FronteggRouterComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FronteggRouterComponent, [{
        type: Component,
        args: [{
                selector: 'frontegg-router',
                template: `
    <ng-content></ng-content>`,
                styles: [],
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.Router }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlZ2ctcm91dGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZGF2aWRhbnRvb24vZ2l0L2Zyb250ZWdnL2Zyb250ZWdnLWFuZ3VsYXIvcHJvamVjdHMvY29yZS9zcmMvIiwic291cmNlcyI6WyJsaWIvZnJvbnRlZ2ctcm91dGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsU0FBUyxHQU1WLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBaUIsZUFBZSxFQUE0QixNQUFNLGlCQUFpQixDQUFDOzs7O0FBVTNGLE1BQU0sT0FBTyx1QkFBdUI7SUFDbEMsWUFBb0IsSUFBZ0IsRUFBRSxNQUFjO1FBQWhDLFNBQUksR0FBSixJQUFJLENBQVk7UUFFbEMsYUFBYTtRQUNiLE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixJQUFJLEtBQUssWUFBWSxlQUFlLEVBQUU7Z0JBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLElBQUksS0FBSyxDQUFDLGlCQUFpQixLQUFLLFlBQVksRUFBRTtvQkFDNUMsYUFBYTtvQkFDYixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7aUJBQzVEO2dCQUNELGFBQWE7Z0JBQ2IscUVBQXFFO2dCQUNyRSxhQUFhO2dCQUNiLHlGQUF5RjtnQkFDekYsWUFBWTtnQkFDWiwrREFBK0Q7YUFDaEU7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OzhGQXJCVSx1QkFBdUI7NERBQXZCLHVCQUF1Qjs7UUFIaEMsa0JBQVk7O2tEQUdILHVCQUF1QjtjQU5uQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzhCQUNrQjtnQkFDNUIsTUFBTSxFQUFFLEVBQUU7YUFDWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgV3JhcHBlciwgY3JlYXRlUG9ydGFsLCByZW5kZXIsIEZpcnN0Q29tcCB9IGZyb20gJ25nLXRlc3QnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgTmF2aWdhdGlvblN0YXJ0LCBSb3V0ZXIsIFJvdXRlc1JlY29nbml6ZWQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZmlsdGVyLCBwYWlyd2lzZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmcm9udGVnZy1yb3V0ZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICBzdHlsZXM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBGcm9udGVnZ1JvdXRlckNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbTogRWxlbWVudFJlZiwgcm91dGVyOiBSb3V0ZXIpIHtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB3aW5kb3cubmdIaXN0b3J5ID0gcm91dGVyO1xuICAgIHJvdXRlci5ldmVudHMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgaWYgKGV2ZW50Lm5hdmlnYXRpb25UcmlnZ2VyID09PSAnaW1wZXJhdGl2ZScpIHtcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgKHdpbmRvdy5yY0hpc3RvcnkpLnJlcGxhY2UoZXZlbnQudXJsLCBldmVudC5yZXN0b3JlZFN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHdpbmRvdy5uZ0hpc3RvcnkubG9jYXRpb24uX3BsYXRmb3JtTG9jYXRpb24uX2hpc3RvcnkpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIC8vIE9iamVjdC5hc3NpZ24od2luZG93LnJjSGlzdG9yeSwgd2luZG93Lm5nSGlzdG9yeS5sb2NhdGlvbi5fcGxhdGZvcm1Mb2NhdGlvbi5faGlzdG9yeSk7XG4gICAgICAgIC8vIGV2ZW50LnVybFxuICAgICAgICAvLyB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ByZXZpb3VzVXJsJywgdGhpcy5yb3V0ZXIudXJsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19