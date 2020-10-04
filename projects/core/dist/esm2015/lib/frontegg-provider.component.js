import { Component, } from '@angular/core';
import { FronteggProvider } from '@frontegg/react-core';
import { NavigationEnd } from '@angular/router';
import { FronteggBaseComponent } from './frontegg-base.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const _c0 = ["*"];
export class FronteggProviderComponent extends FronteggBaseComponent {
    // 1) createElement(RcComponent)
    //   1.1) pass upper props to RcComponent
    //   1.2) create smart children component with unique id to inject ng-content after mount
    // 2) create React Portal to be rendered inside this.elementRef
    // 3) search for parent Rc Component to inject this ReactPortal to it's children
    // 4) after React.Portal did mount, inject ng-container to it's smart children component
    constructor(elem, router) {
        super(elem);
        this.router = router;
        this.routeListeners = [];
    }
    ngAfterViewInit() {
        // @ts-ignore
        const pl = this.router.location._platformLocation;
        pl._history.listen = (e) => {
            this.routeListeners.push(e);
            return () => this.routeListeners = this.routeListeners.filter(l => l !== e);
        };
        pl._history.createHref = (e) => e.pathname;
        pl._history.push = (path, data) => this.router.navigate([path], { state: data, replaceUrl: false });
        pl._history.replace = (path, data) => this.router.navigate([path], { state: data, replaceUrl: true });
        pl._history.location = pl.location;
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.routeListeners.forEach(l => l(pl.location));
            }
        });
        this.mountElement(FronteggProvider, {
            _history: pl._history,
            plugins: [],
            debugMode: true,
            context: {
                baseUrl: `http://localhost:8080`,
                requestCredentials: 'include',
            },
        });
    }
}
FronteggProviderComponent.ɵfac = function FronteggProviderComponent_Factory(t) { return new (t || FronteggProviderComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.Router)); };
FronteggProviderComponent.ɵcmp = i0.ɵɵdefineComponent({ type: FronteggProviderComponent, selectors: [["frontegg-provider"]], features: [i0.ɵɵInheritDefinitionFeature], ngContentSelectors: _c0, decls: 1, vars: 0, template: function FronteggProviderComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FronteggProviderComponent, [{
        type: Component,
        args: [{
                selector: 'frontegg-provider',
                template: `
    <ng-content></ng-content>`,
                styles: [],
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.Router }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlZ2ctcHJvdmlkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9kYXZpZGFudG9vbi9naXQvZnJvbnRlZ2cvZnJvbnRlZ2ctYW5ndWxhci9wcm9qZWN0cy9jb3JlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9mcm9udGVnZy1wcm92aWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsR0FJVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQVksZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7QUFTbEUsTUFBTSxPQUFPLHlCQUEwQixTQUFRLHFCQUFxQjtJQUVsRSxnQ0FBZ0M7SUFDaEMseUNBQXlDO0lBQ3pDLHlGQUF5RjtJQUN6RiwrREFBK0Q7SUFDL0QsZ0ZBQWdGO0lBQ2hGLHdGQUF3RjtJQUV4RixZQUFZLElBQWdCLEVBQVUsTUFBYztRQUNsRCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFEd0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVJwRCxtQkFBYyxHQUFVLEVBQUUsQ0FBQztJQVUzQixDQUFDO0lBRUQsZUFBZTtRQUNiLGFBQWE7UUFDYixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRCxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM5RSxDQUFDLENBQUM7UUFDRixFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUMzQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3BHLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdEcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUVuQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQyxJQUFJLEtBQUssWUFBWSxhQUFhLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQ2xEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFO1lBQ2xDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUTtZQUNyQixPQUFPLEVBQUUsRUFBRTtZQUNYLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFO2dCQUNQLE9BQU8sRUFBRSx1QkFBdUI7Z0JBQ2hDLGtCQUFrQixFQUFFLFNBQVM7YUFDOUI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOztrR0F4Q1UseUJBQXlCOzhEQUF6Qix5QkFBeUI7O1FBSGxDLGtCQUFZOztrREFHSCx5QkFBeUI7Y0FOckMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRTs4QkFDa0I7Z0JBQzVCLE1BQU0sRUFBRSxFQUFFO2FBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPTVByb3h5LCBGcm9udGVnZ1Byb3ZpZGVyIH0gZnJvbSAnQGZyb250ZWdnL3JlYWN0LWNvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEZyb250ZWdnQmFzZUNvbXBvbmVudCB9IGZyb20gJy4vZnJvbnRlZ2ctYmFzZS5jb21wb25lbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zyb250ZWdnLXByb3ZpZGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgc3R5bGVzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgRnJvbnRlZ2dQcm92aWRlckNvbXBvbmVudCBleHRlbmRzIEZyb250ZWdnQmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICByb3V0ZUxpc3RlbmVyczogYW55W10gPSBbXTtcbiAgLy8gMSkgY3JlYXRlRWxlbWVudChSY0NvbXBvbmVudClcbiAgLy8gICAxLjEpIHBhc3MgdXBwZXIgcHJvcHMgdG8gUmNDb21wb25lbnRcbiAgLy8gICAxLjIpIGNyZWF0ZSBzbWFydCBjaGlsZHJlbiBjb21wb25lbnQgd2l0aCB1bmlxdWUgaWQgdG8gaW5qZWN0IG5nLWNvbnRlbnQgYWZ0ZXIgbW91bnRcbiAgLy8gMikgY3JlYXRlIFJlYWN0IFBvcnRhbCB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhpcy5lbGVtZW50UmVmXG4gIC8vIDMpIHNlYXJjaCBmb3IgcGFyZW50IFJjIENvbXBvbmVudCB0byBpbmplY3QgdGhpcyBSZWFjdFBvcnRhbCB0byBpdCdzIGNoaWxkcmVuXG4gIC8vIDQpIGFmdGVyIFJlYWN0LlBvcnRhbCBkaWQgbW91bnQsIGluamVjdCBuZy1jb250YWluZXIgdG8gaXQncyBzbWFydCBjaGlsZHJlbiBjb21wb25lbnRcblxuICBjb25zdHJ1Y3RvcihlbGVtOiBFbGVtZW50UmVmLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XG4gICAgc3VwZXIoZWxlbSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHBsID0gdGhpcy5yb3V0ZXIubG9jYXRpb24uX3BsYXRmb3JtTG9jYXRpb247XG4gICAgcGwuX2hpc3RvcnkubGlzdGVuID0gKGUpID0+IHtcbiAgICAgIHRoaXMucm91dGVMaXN0ZW5lcnMucHVzaChlKTtcbiAgICAgIHJldHVybiAoKSA9PiB0aGlzLnJvdXRlTGlzdGVuZXJzID0gdGhpcy5yb3V0ZUxpc3RlbmVycy5maWx0ZXIobCA9PiBsICE9PSBlKTtcbiAgICB9O1xuICAgIHBsLl9oaXN0b3J5LmNyZWF0ZUhyZWYgPSAoZSkgPT4gZS5wYXRobmFtZTtcbiAgICBwbC5faGlzdG9yeS5wdXNoID0gKHBhdGgsIGRhdGEpID0+IHRoaXMucm91dGVyLm5hdmlnYXRlKFtwYXRoXSwgeyBzdGF0ZTogZGF0YSwgcmVwbGFjZVVybDogZmFsc2UgfSk7XG4gICAgcGwuX2hpc3RvcnkucmVwbGFjZSA9IChwYXRoLCBkYXRhKSA9PiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcGF0aF0sIHsgc3RhdGU6IGRhdGEsIHJlcGxhY2VVcmw6IHRydWUgfSk7XG4gICAgcGwuX2hpc3RvcnkubG9jYXRpb24gPSBwbC5sb2NhdGlvbjtcblxuICAgIHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgIHRoaXMucm91dGVMaXN0ZW5lcnMuZm9yRWFjaChsID0+IGwocGwubG9jYXRpb24pKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMubW91bnRFbGVtZW50KEZyb250ZWdnUHJvdmlkZXIsIHtcbiAgICAgIF9oaXN0b3J5OiBwbC5faGlzdG9yeSxcbiAgICAgIHBsdWdpbnM6IFtdLFxuICAgICAgZGVidWdNb2RlOiB0cnVlLFxuICAgICAgY29udGV4dDoge1xuICAgICAgICBiYXNlVXJsOiBgaHR0cDovL2xvY2FsaG9zdDo4MDgwYCxcbiAgICAgICAgcmVxdWVzdENyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==