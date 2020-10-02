import { Component, } from '@angular/core';
import { createElement, Wrapper, createPortal, render } from 'ng-test';
import { NavigationEnd } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const _c0 = ["*"];
export class FronteggProviderComponent {
    // 1) createElement(RcComponent)
    //   1.1) pass upper props to RcComponent
    //   1.2) create smart children component with unique id to inject ng-content after mount
    // 2) create React Portal to be rendered inside this.elementRef
    // 3) search for parent Rc Component to inject this ReactPortal to it's children
    // 4) after React.Portal did mount, inject ng-container to it's smart children component
    constructor(elem, router) {
        this.elem = elem;
        this.router = router;
        this.rcPortals = [];
        this.ngChildren = [];
        this.routeListeners = [];
        this.elem.nativeElement.ngClass = this;
    }
    ngAfterViewInit() {
        this.rcProxy = document.createElement('div');
        document.body.appendChild(this.rcProxy);
        this.ngChildren = [...this.elem.nativeElement.childNodes];
        const ngComponents = createElement('div', {
            ref: ref => this.ngChildren.forEach(node => ref === null || ref === void 0 ? void 0 : ref.appendChild(node)),
        }, []);
        // @ts-ignore
        window.ngH = this.router;
        // @ts-ignore
        this.router.location._platformLocation._history.listen = (e) => {
            this.routeListeners.push(e);
            return () => {
                this.routeListeners = this.routeListeners.filter(l => l !== e);
            };
        };
        // @ts-ignore
        this.router.location._platformLocation._history.createHref = (e) => {
            return e.pathname;
        };
        // @ts-ignore
        this.router.location._platformLocation._history.push = (path, data) => {
            // @ts-ignore
            this.router.navigate([path], { state: data, replaceUrl: false });
        };
        // @ts-ignore
        this.router.location._platformLocation._history.replace = (path, data) => {
            this.router.navigate([path], { state: data, replaceUrl: true });
        };
        // @ts-ignore
        this.router.location._platformLocation._history.location = this.router.location._platformLocation.location;
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // @ts-ignore
                this.routeListeners.forEach(l => l(this.router.location._platformLocation.location));
            }
        });
        this.rcWrapper = createPortal(createElement(Wrapper, {
            ref: ref => this.rcWrapperRef = ref,
            ngComponents,
            rcPortals: this.rcPortals,
            // @ts-ignore
            _history: this.router.location._platformLocation._history,
        }), this.elem.nativeElement);
        render(this.rcWrapper, this.rcProxy);
    }
    ngOnInit() {
    }
    mountChild(child) {
        this.rcWrapperRef.mountChild(child);
    }
    unmountChild(child) {
        this.rcWrapperRef.unmountChild(child);
    }
    ngOnDestroy() {
        // this.nodeRef?.remove();
    }
}
FronteggProviderComponent.ɵfac = function FronteggProviderComponent_Factory(t) { return new (t || FronteggProviderComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.Router)); };
FronteggProviderComponent.ɵcmp = i0.ɵɵdefineComponent({ type: FronteggProviderComponent, selectors: [["frontegg-provider"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function FronteggProviderComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FronteggProviderComponent, [{
        type: Component,
        args: [{
                selector: 'frontegg-provider',
                template: `
    <!--    <frontegg-router></frontegg-router>-->
    <ng-content></ng-content>`,
                styles: [],
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.Router }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlZ2ctcHJvdmlkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9kYXZpZGFudG9vbi9naXQvZnJvbnRlZ2cvZnJvbnRlZ2ctYW5ndWxhci9wcm9qZWN0cy9jb3JlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9mcm9udGVnZy1wcm92aWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLFNBQVMsR0FNVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFhLE1BQU0sU0FBUyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxhQUFhLEVBQTJCLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFVekUsTUFBTSxPQUFPLHlCQUF5QjtJQU9wQyxnQ0FBZ0M7SUFDaEMseUNBQXlDO0lBQ3pDLHlGQUF5RjtJQUN6RiwrREFBK0Q7SUFDL0QsZ0ZBQWdGO0lBQ2hGLHdGQUF3RjtJQUV4RixZQUFvQixJQUFnQixFQUFVLE1BQWM7UUFBeEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFWNUQsY0FBUyxHQUFVLEVBQUUsQ0FBQztRQUN0QixlQUFVLEdBQVUsRUFBRSxDQUFDO1FBQ3ZCLG1CQUFjLEdBQVUsRUFBRSxDQUFDO1FBU3pCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDekMsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxD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QWlCLENBQUMsUUFBUTtTQUNuRCxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELFFBQVE7SUFFUixDQUFDO0lBRU0sVUFBVSxDQUFDLEtBQUs7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLFlBQVksQ0FBQyxLQUFLO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxXQUFXO1FBQ1QsMEJBQTBCO0lBQzVCLENBQUM7O2tHQWxGVSx5QkFBeUI7OERBQXpCLHlCQUF5Qjs7UUFIbEMsa0JBQVk7O2tEQUdILHlCQUF5QjtjQVByQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs4QkFFa0I7Z0JBQzVCLE1BQU0sRUFBRSxFQUFFO2FBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLCBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIFdyYXBwZXIsIGNyZWF0ZVBvcnRhbCwgcmVuZGVyLCBGaXJzdENvbXAgfSBmcm9tICduZy10ZXN0JztcbmltcG9ydCB7IE5hdmlnYXRpb25FbmQsIE5hdmlnYXRpb25TdGFydCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmcm9udGVnZy1wcm92aWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPCEtLSAgICA8ZnJvbnRlZ2ctcm91dGVyPjwvZnJvbnRlZ2ctcm91dGVyPi0tPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxuICBzdHlsZXM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBGcm9udGVnZ1Byb3ZpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICByY1dyYXBwZXI6IGFueTtcbiAgcmNXcmFwcGVyUmVmOiBhbnk7XG4gIHJjUHJveHk6IGFueTtcbiAgcmNQb3J0YWxzOiBhbnlbXSA9IFtdO1xuICBuZ0NoaWxkcmVuOiBhbnlbXSA9IFtdO1xuICByb3V0ZUxpc3RlbmVyczogYW55W10gPSBbXTtcbiAgLy8gMSkgY3JlYXRlRWxlbWVudChSY0NvbXBvbmVudClcbiAgLy8gICAxLjEpIHBhc3MgdXBwZXIgcHJvcHMgdG8gUmNDb21wb25lbnRcbiAgLy8gICAxLjIpIGNyZWF0ZSBzbWFydCBjaGlsZHJlbiBjb21wb25lbnQgd2l0aCB1bmlxdWUgaWQgdG8gaW5qZWN0IG5nLWNvbnRlbnQgYWZ0ZXIgbW91bnRcbiAgLy8gMikgY3JlYXRlIFJlYWN0IFBvcnRhbCB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhpcy5lbGVtZW50UmVmXG4gIC8vIDMpIHNlYXJjaCBmb3IgcGFyZW50IFJjIENvbXBvbmVudCB0byBpbmplY3QgdGhpcyBSZWFjdFBvcnRhbCB0byBpdCdzIGNoaWxkcmVuXG4gIC8vIDQpIGFmdGVyIFJlYWN0LlBvcnRhbCBkaWQgbW91bnQsIGluamVjdCBuZy1jb250YWluZXIgdG8gaXQncyBzbWFydCBjaGlsZHJlbiBjb21wb25lbnRcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW06IEVsZW1lbnRSZWYsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5uZ0NsYXNzID0gdGhpcztcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJjUHJveHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucmNQcm94eSk7XG4gICAgdGhpcy5uZ0NoaWxkcmVuID0gWy4uLnRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LmNoaWxkTm9kZXNdO1xuICAgIGNvbnN0IG5nQ29tcG9uZW50cyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgIHJlZjogcmVmID0+IHRoaXMubmdDaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4gcmVmPy5hcHBlbmRDaGlsZChub2RlIGFzIGFueSkpLFxuICAgIH0sIFtdKTtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB3aW5kb3cubmdIID0gdGhpcy5yb3V0ZXI7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMucm91dGVyLmxvY2F0aW9uLl9wbGF0Zm9ybUxvY2F0aW9uLl9oaXN0b3J5Lmxpc3RlbiA9IChlKSA9PiB7XG4gICAgICB0aGlzLnJvdXRlTGlzdGVuZXJzLnB1c2goZSk7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICB0aGlzLnJvdXRlTGlzdGVuZXJzID0gdGhpcy5yb3V0ZUxpc3RlbmVycy5maWx0ZXIobCA9PiBsICE9PSBlKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5yb3V0ZXIubG9jYXRpb24uX3BsYXRmb3JtTG9jYXRpb24uX2hpc3RvcnkuY3JlYXRlSHJlZiA9IChlKSA9PiB7XG4gICAgICByZXR1cm4gZS5wYXRobmFtZTtcbiAgICB9O1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLnJvdXRlci5sb2NhdGlvbi5fcGxhdGZvcm1Mb2NhdGlvbi5faGlzdG9yeS5wdXNoID0gKHBhdGgsIGRhdGEpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtwYXRoXSwgeyBzdGF0ZTogZGF0YSwgcmVwbGFjZVVybDogZmFsc2UgfSk7XG4gICAgfTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5yb3V0ZXIubG9jYXRpb24uX3BsYXRmb3JtTG9jYXRpb24uX2hpc3RvcnkucmVwbGFjZSA9IChwYXRoLCBkYXRhKSA9PiB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcGF0aF0sIHsgc3RhdGU6IGRhdGEsIHJlcGxhY2VVcmw6IHRydWUgfSk7XG4gICAgfTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5yb3V0ZXIubG9jYXRpb24uX3BsYXRmb3JtTG9jYXRpb24uX2hpc3RvcnkubG9jYXRpb24gPSB0aGlzLnJvdXRlci5sb2NhdGlvbi5fcGxhdGZvcm1Mb2NhdGlvbi5sb2NhdGlvbjtcblxuICAgIHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5yb3V0ZUxpc3RlbmVycy5mb3JFYWNoKGwgPT4gbCh0aGlzLnJvdXRlci5sb2NhdGlvbi5fcGxhdGZvcm1Mb2NhdGlvbi5sb2NhdGlvbikpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yY1dyYXBwZXIgPSBjcmVhdGVQb3J0YWwoY3JlYXRlRWxlbWVudChXcmFwcGVyLCB7XG4gICAgICByZWY6IHJlZiA9PiB0aGlzLnJjV3JhcHBlclJlZiA9IHJlZixcbiAgICAgIG5nQ29tcG9uZW50cyxcbiAgICAgIHJjUG9ydGFsczogdGhpcy5yY1BvcnRhbHMsXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBfaGlzdG9yeTogdGhpcy5yb3V0ZXIubG9jYXRpb24uX3BsYXRmb3JtTG9jYXRpb24uX2hpc3RvcnksXG4gICAgfSBhcyBhbnkpLCB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCk7XG4gICAgcmVuZGVyKHRoaXMucmNXcmFwcGVyLCB0aGlzLnJjUHJveHkpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgfVxuXG4gIHB1YmxpYyBtb3VudENoaWxkKGNoaWxkKTogdm9pZCB7XG4gICAgdGhpcy5yY1dyYXBwZXJSZWYubW91bnRDaGlsZChjaGlsZCk7XG4gIH1cblxuICBwdWJsaWMgdW5tb3VudENoaWxkKGNoaWxkKTogdm9pZCB7XG4gICAgdGhpcy5yY1dyYXBwZXJSZWYudW5tb3VudENoaWxkKGNoaWxkKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIC8vIHRoaXMubm9kZVJlZj8ucmVtb3ZlKCk7XG4gIH1cblxufVxuIl19