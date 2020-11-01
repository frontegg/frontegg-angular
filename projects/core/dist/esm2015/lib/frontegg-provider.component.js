import { Component, } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { FronteggBaseComponent } from './frontegg-base.component';
import { FronteggProvider } from '@frontegg/react-core';
import { AuthPlugin } from '@frontegg/react-auth';
import { uiLibrary } from '@frontegg/react-elements-material-ui';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const _c0 = ["*"];
// declare namespace JSX { interface ElementAttributesProperty {} }
export class FronteggProviderComponent extends FronteggBaseComponent {
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
                template: `
    <ng-content></ng-content>`,
                styles: [],
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.Router }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlZ2ctcHJvdmlkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9kYXZpZGFudG9vbi9naXQvZnJvbnRlZ2cvZnJvbnRlZ2ctYW5ndWxhci9wcm9qZWN0cy9jb3JlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9mcm9udGVnZy1wcm92aWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWtCLGFBQWEsRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7QUFFakUsbUVBQW1FO0FBUW5FLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxxQkFBcUI7SUFHbEUsWUFBWSxJQUFnQixFQUFVLE1BQWM7UUFDbEQsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRHdCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFGcEQsbUJBQWMsR0FBVSxFQUFFLENBQUM7SUFJM0IsQ0FBQztJQUVELGVBQWU7UUFDYixhQUFhO1FBQ2IsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7UUFDbEQsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOUUsQ0FBQyxDQUFDO1FBQ0YsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDM0MsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNwRyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3RHLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFFbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDckMsSUFBSSxLQUFLLFlBQVksYUFBYSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNsRDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRTtZQUNsQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVE7WUFDckIsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDdkIsU0FBUztZQUNULFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFO2dCQUNQLE9BQU8sRUFBRSx1QkFBdUI7Z0JBQ2hDLGtCQUFrQixFQUFFLFNBQVM7YUFDOUI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOztrR0FuQ1UseUJBQXlCOzhEQUF6Qix5QkFBeUI7O1FBSGxDLGtCQUFZOztrREFHSCx5QkFBeUI7Y0FOckMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRTs4QkFDa0I7Z0JBQzVCLE1BQU0sRUFBRSxFQUFFO2FBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBGcm9udGVnZ0Jhc2VDb21wb25lbnQgfSBmcm9tICcuL2Zyb250ZWdnLWJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEZyb250ZWdnUHJvdmlkZXIgfSBmcm9tICdAZnJvbnRlZ2cvcmVhY3QtY29yZSc7XG5pbXBvcnQgeyBBdXRoUGx1Z2luIH0gZnJvbSAnQGZyb250ZWdnL3JlYWN0LWF1dGgnO1xuaW1wb3J0IHsgdWlMaWJyYXJ5IH0gZnJvbSAnQGZyb250ZWdnL3JlYWN0LWVsZW1lbnRzLW1hdGVyaWFsLXVpJztcblxuLy8gZGVjbGFyZSBuYW1lc3BhY2UgSlNYIHsgaW50ZXJmYWNlIEVsZW1lbnRBdHRyaWJ1dGVzUHJvcGVydHkge30gfVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmcm9udGVnZy1wcm92aWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG4gIHN0eWxlczogW10sXG59KVxuZXhwb3J0IGNsYXNzIEZyb250ZWdnUHJvdmlkZXJDb21wb25lbnQgZXh0ZW5kcyBGcm9udGVnZ0Jhc2VDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgcm91dGVMaXN0ZW5lcnM6IGFueVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoZWxlbTogRWxlbWVudFJlZiwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xuICAgIHN1cGVyKGVsZW0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBwbCA9IHRoaXMucm91dGVyLmxvY2F0aW9uLl9wbGF0Zm9ybUxvY2F0aW9uO1xuICAgIHBsLl9oaXN0b3J5Lmxpc3RlbiA9IChlKSA9PiB7XG4gICAgICB0aGlzLnJvdXRlTGlzdGVuZXJzLnB1c2goZSk7XG4gICAgICByZXR1cm4gKCkgPT4gdGhpcy5yb3V0ZUxpc3RlbmVycyA9IHRoaXMucm91dGVMaXN0ZW5lcnMuZmlsdGVyKGwgPT4gbCAhPT0gZSk7XG4gICAgfTtcbiAgICBwbC5faGlzdG9yeS5jcmVhdGVIcmVmID0gKGUpID0+IGUucGF0aG5hbWU7XG4gICAgcGwuX2hpc3RvcnkucHVzaCA9IChwYXRoLCBkYXRhKSA9PiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcGF0aF0sIHsgc3RhdGU6IGRhdGEsIHJlcGxhY2VVcmw6IGZhbHNlIH0pO1xuICAgIHBsLl9oaXN0b3J5LnJlcGxhY2UgPSAocGF0aCwgZGF0YSkgPT4gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3BhdGhdLCB7IHN0YXRlOiBkYXRhLCByZXBsYWNlVXJsOiB0cnVlIH0pO1xuICAgIHBsLl9oaXN0b3J5LmxvY2F0aW9uID0gcGwubG9jYXRpb247XG5cbiAgICB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICB0aGlzLnJvdXRlTGlzdGVuZXJzLmZvckVhY2gobCA9PiBsKHBsLmxvY2F0aW9uKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm1vdW50RWxlbWVudChGcm9udGVnZ1Byb3ZpZGVyLCB7XG4gICAgICBfaGlzdG9yeTogcGwuX2hpc3RvcnksXG4gICAgICBwbHVnaW5zOiBbQXV0aFBsdWdpbigpXSxcbiAgICAgIHVpTGlicmFyeSxcbiAgICAgIGRlYnVnTW9kZTogdHJ1ZSxcbiAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgYmFzZVVybDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4MGAsXG4gICAgICAgIHJlcXVlc3RDcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=