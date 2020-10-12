import { Component, } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { FronteggBaseComponent } from './frontegg-base.component';
import { FronteggProvider } from '@frontegg/react-core';
import { AuthPlugin } from '@frontegg/react-auth';
import { uiLibrary } from '@frontegg/react-elements-semantic';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const _c0 = ["*"];
// declare namespace JSX { interface ElementAttributesProperty {} }
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
            plugins: [AuthPlugin()],
            uiLibrary,
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
                template: `<ng-content></ng-content>`,
                styles: [],
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.Router }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlZ2ctcHJvdmlkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9kYXZpZGFudG9vbi9naXQvZnJvbnRlZ2cvZnJvbnRlZ2ctYW5ndWxhci9wcm9qZWN0cy9jb3JlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9mcm9udGVnZy1wcm92aWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7OztBQUU5RCxtRUFBbUU7QUFPbkUsTUFBTSxPQUFPLHlCQUEwQixTQUFRLHFCQUFxQjtJQUVsRSxnQ0FBZ0M7SUFDaEMseUNBQXlDO0lBQ3pDLHlGQUF5RjtJQUN6RiwrREFBK0Q7SUFDL0QsZ0ZBQWdGO0lBQ2hGLHdGQUF3RjtJQUV4RixZQUFZLElBQWdCLEVBQVUsTUFBYztRQUNsRCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFEd0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVJwRCxtQkFBYyxHQUFVLEVBQUUsQ0FBQztJQVUzQixDQUFDO0lBRUQsZUFBZTtRQUNiLGFBQWE7UUFDYixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRCxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM5RSxDQUFDLENBQUM7UUFDRixFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUMzQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3BHLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdEcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUVuQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQyxJQUFJLEtBQUssWUFBWSxhQUFhLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQ2xEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFO1lBQ2xDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUTtZQUNyQixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN2QixTQUFTO1lBQ1QsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLHVCQUF1QjtnQkFDaEMsa0JBQWtCLEVBQUUsU0FBUzthQUM5QjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7O2tHQXpDVSx5QkFBeUI7OERBQXpCLHlCQUF5Qjs7UUFIekIsa0JBQVk7O2tEQUdaLHlCQUF5QjtjQUxyQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsTUFBTSxFQUFFLEVBQUU7YUFDWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRnJvbnRlZ2dCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi9mcm9udGVnZy1iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGcm9udGVnZ1Byb3ZpZGVyIH0gZnJvbSAnQGZyb250ZWdnL3JlYWN0LWNvcmUnO1xuaW1wb3J0IHsgQXV0aFBsdWdpbiB9IGZyb20gJ0Bmcm9udGVnZy9yZWFjdC1hdXRoJztcbmltcG9ydCB7IHVpTGlicmFyeSB9IGZyb20gJ0Bmcm9udGVnZy9yZWFjdC1lbGVtZW50cy1zZW1hbnRpYyc7XG5cbi8vIGRlY2xhcmUgbmFtZXNwYWNlIEpTWCB7IGludGVyZmFjZSBFbGVtZW50QXR0cmlidXRlc1Byb3BlcnR5IHt9IH1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZnJvbnRlZ2ctcHJvdmlkZXInLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICBzdHlsZXM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBGcm9udGVnZ1Byb3ZpZGVyQ29tcG9uZW50IGV4dGVuZHMgRnJvbnRlZ2dCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIHJvdXRlTGlzdGVuZXJzOiBhbnlbXSA9IFtdO1xuICAvLyAxKSBjcmVhdGVFbGVtZW50KFJjQ29tcG9uZW50KVxuICAvLyAgIDEuMSkgcGFzcyB1cHBlciBwcm9wcyB0byBSY0NvbXBvbmVudFxuICAvLyAgIDEuMikgY3JlYXRlIHNtYXJ0IGNoaWxkcmVuIGNvbXBvbmVudCB3aXRoIHVuaXF1ZSBpZCB0byBpbmplY3QgbmctY29udGVudCBhZnRlciBtb3VudFxuICAvLyAyKSBjcmVhdGUgUmVhY3QgUG9ydGFsIHRvIGJlIHJlbmRlcmVkIGluc2lkZSB0aGlzLmVsZW1lbnRSZWZcbiAgLy8gMykgc2VhcmNoIGZvciBwYXJlbnQgUmMgQ29tcG9uZW50IHRvIGluamVjdCB0aGlzIFJlYWN0UG9ydGFsIHRvIGl0J3MgY2hpbGRyZW5cbiAgLy8gNCkgYWZ0ZXIgUmVhY3QuUG9ydGFsIGRpZCBtb3VudCwgaW5qZWN0IG5nLWNvbnRhaW5lciB0byBpdCdzIHNtYXJ0IGNoaWxkcmVuIGNvbXBvbmVudFxuXG4gIGNvbnN0cnVjdG9yKGVsZW06IEVsZW1lbnRSZWYsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICBzdXBlcihlbGVtKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcGwgPSB0aGlzLnJvdXRlci5sb2NhdGlvbi5fcGxhdGZvcm1Mb2NhdGlvbjtcbiAgICBwbC5faGlzdG9yeS5saXN0ZW4gPSAoZSkgPT4ge1xuICAgICAgdGhpcy5yb3V0ZUxpc3RlbmVycy5wdXNoKGUpO1xuICAgICAgcmV0dXJuICgpID0+IHRoaXMucm91dGVMaXN0ZW5lcnMgPSB0aGlzLnJvdXRlTGlzdGVuZXJzLmZpbHRlcihsID0+IGwgIT09IGUpO1xuICAgIH07XG4gICAgcGwuX2hpc3RvcnkuY3JlYXRlSHJlZiA9IChlKSA9PiBlLnBhdGhuYW1lO1xuICAgIHBsLl9oaXN0b3J5LnB1c2ggPSAocGF0aCwgZGF0YSkgPT4gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3BhdGhdLCB7IHN0YXRlOiBkYXRhLCByZXBsYWNlVXJsOiBmYWxzZSB9KTtcbiAgICBwbC5faGlzdG9yeS5yZXBsYWNlID0gKHBhdGgsIGRhdGEpID0+IHRoaXMucm91dGVyLm5hdmlnYXRlKFtwYXRoXSwgeyBzdGF0ZTogZGF0YSwgcmVwbGFjZVVybDogdHJ1ZSB9KTtcbiAgICBwbC5faGlzdG9yeS5sb2NhdGlvbiA9IHBsLmxvY2F0aW9uO1xuXG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgdGhpcy5yb3V0ZUxpc3RlbmVycy5mb3JFYWNoKGwgPT4gbChwbC5sb2NhdGlvbikpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5tb3VudEVsZW1lbnQoRnJvbnRlZ2dQcm92aWRlciwge1xuICAgICAgX2hpc3Rvcnk6IHBsLl9oaXN0b3J5LFxuICAgICAgcGx1Z2luczogW0F1dGhQbHVnaW4oKV0sXG4gICAgICB1aUxpYnJhcnksXG4gICAgICBkZWJ1Z01vZGU6IHRydWUsXG4gICAgICBjb250ZXh0OiB7XG4gICAgICAgIGJhc2VVcmw6IGBodHRwOi8vbG9jYWxob3N0OjgwODBgLFxuICAgICAgICByZXF1ZXN0Q3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxufVxuIl19