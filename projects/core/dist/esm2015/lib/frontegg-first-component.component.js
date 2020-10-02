import { Component } from '@angular/core';
import { createElement, createPortal, FirstComp, render } from 'ng-test';
import * as i0 from "@angular/core";
const _c0 = ["*"];
export class FronteggFirstComponent {
    constructor(elem) {
        this.elem = elem;
        console.log('FronteggFirstComponent.constructor');
        this.elem.nativeElement.ngClass = this;
    }
    ngAfterViewInit() {
        let parent = this.elem.nativeElement.parentElement;
        while (parent != null && !parent.ngClass) {
            parent = parent.parentElement;
        }
        this.rcPortal = createPortal(createElement(FirstComp, { isNg: true }, null), this.elem.nativeElement);
        if (!parent) {
            const rcProxy = document.createElement('div');
            document.body.appendChild(rcProxy);
            render(this.rcPortal, rcProxy);
        }
        else {
            this.rcParent = parent.ngClass;
            this.rcParent.mountChild(this.rcPortal);
        }
    }
    ngOnInit() {
        console.log('FronteggFirstComponent.ngOnInit');
    }
    ngOnDestroy() {
        console.log('FronteggFirstComponent.ngOnDestroy');
        this.rcParent.unmountChild(this.rcPortal);
    }
}
FronteggFirstComponent.ɵfac = function FronteggFirstComponent_Factory(t) { return new (t || FronteggFirstComponent)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
FronteggFirstComponent.ɵcmp = i0.ɵɵdefineComponent({ type: FronteggFirstComponent, selectors: [["frontegg-first-component"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function FronteggFirstComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FronteggFirstComponent, [{
        type: Component,
        args: [{
                selector: 'frontegg-first-component',
                template: `<ng-content></ng-content>`,
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlZ2ctZmlyc3QtY29tcG9uZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZGF2aWRhbnRvb24vZ2l0L2Zyb250ZWdnL2Zyb250ZWdnLWFuZ3VsYXIvcHJvamVjdHMvY29yZS9zcmMvIiwic291cmNlcyI6WyJsaWIvZnJvbnRlZ2ctZmlyc3QtY29tcG9uZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBaUMsTUFBTSxlQUFlLENBQUM7QUFDeEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQzs7O0FBTXpFLE1BQU0sT0FBTyxzQkFBc0I7SUFJakMsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN6QyxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztRQUNuRCxPQUFPLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3hDLE1BQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2hDO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUdELFdBQVc7UUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7OzRGQWpDVSxzQkFBc0I7MkRBQXRCLHNCQUFzQjs7UUFGdEIsa0JBQVk7O2tEQUVaLHNCQUFzQjtjQUpsQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsUUFBUSxFQUFFLDJCQUEyQjthQUN0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGNyZWF0ZVBvcnRhbCwgRmlyc3RDb21wLCByZW5kZXIgfSBmcm9tICduZy10ZXN0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZnJvbnRlZ2ctZmlyc3QtY29tcG9uZW50JyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbn0pXG5leHBvcnQgY2xhc3MgRnJvbnRlZ2dGaXJzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgcmNQYXJlbnQ6IGFueTtcbiAgcmNQb3J0YWw6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW06IEVsZW1lbnRSZWYpIHtcbiAgICBjb25zb2xlLmxvZygnRnJvbnRlZ2dGaXJzdENvbXBvbmVudC5jb25zdHJ1Y3RvcicpO1xuICAgIHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50Lm5nQ2xhc3MgPSB0aGlzO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGxldCBwYXJlbnQgPSB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIHdoaWxlIChwYXJlbnQgIT0gbnVsbCAmJiAhcGFyZW50Lm5nQ2xhc3MpIHtcbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgIH1cbiAgICB0aGlzLnJjUG9ydGFsID0gY3JlYXRlUG9ydGFsKGNyZWF0ZUVsZW1lbnQoRmlyc3RDb21wLCB7IGlzTmc6IHRydWUgfSBhcyBhbnksIG51bGwpLCB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCk7XG4gICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgIGNvbnN0IHJjUHJveHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmNQcm94eSk7XG4gICAgICByZW5kZXIodGhpcy5yY1BvcnRhbCwgcmNQcm94eSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmNQYXJlbnQgPSBwYXJlbnQubmdDbGFzcztcbiAgICAgIHRoaXMucmNQYXJlbnQubW91bnRDaGlsZCh0aGlzLnJjUG9ydGFsKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnRnJvbnRlZ2dGaXJzdENvbXBvbmVudC5uZ09uSW5pdCcpO1xuICB9XG5cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnRnJvbnRlZ2dGaXJzdENvbXBvbmVudC5uZ09uRGVzdHJveScpO1xuICAgIHRoaXMucmNQYXJlbnQudW5tb3VudENoaWxkKHRoaXMucmNQb3J0YWwpO1xuICB9XG5cbn1cbiJdfQ==