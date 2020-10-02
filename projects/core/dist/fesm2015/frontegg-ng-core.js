import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵdirectiveInject, ElementRef, ɵɵdefineComponent, ɵɵprojectionDef, ɵɵprojection, Component, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { createElement, createPortal, Wrapper, render, FirstComp } from 'ng-test';
import { NavigationEnd, Router, NavigationStart } from '@angular/router';
import { PortalModule } from '@angular/cdk/portal';
import { CountdownModule } from 'ngx-countdown';

class CoreService {
    constructor() { }
}
CoreService.ɵfac = function CoreService_Factory(t) { return new (t || CoreService)(); };
CoreService.ɵprov = ɵɵdefineInjectable({ token: CoreService, factory: CoreService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CoreService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

const _c0 = ["*"];
class FronteggProviderComponent {
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
FronteggProviderComponent.ɵfac = function FronteggProviderComponent_Factory(t) { return new (t || FronteggProviderComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Router)); };
FronteggProviderComponent.ɵcmp = ɵɵdefineComponent({ type: FronteggProviderComponent, selectors: [["frontegg-provider"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function FronteggProviderComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FronteggProviderComponent, [{
        type: Component,
        args: [{
                selector: 'frontegg-provider',
                template: `
    <!--    <frontegg-router></frontegg-router>-->
    <ng-content></ng-content>`,
                styles: [],
            }]
    }], function () { return [{ type: ElementRef }, { type: Router }]; }, null); })();

const _c0$1 = ["*"];
class FronteggFirstComponent {
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
FronteggFirstComponent.ɵfac = function FronteggFirstComponent_Factory(t) { return new (t || FronteggFirstComponent)(ɵɵdirectiveInject(ElementRef)); };
FronteggFirstComponent.ɵcmp = ɵɵdefineComponent({ type: FronteggFirstComponent, selectors: [["frontegg-first-component"]], ngContentSelectors: _c0$1, decls: 1, vars: 0, template: function FronteggFirstComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FronteggFirstComponent, [{
        type: Component,
        args: [{
                selector: 'frontegg-first-component',
                template: `<ng-content></ng-content>`,
            }]
    }], function () { return [{ type: ElementRef }]; }, null); })();

const _c0$2 = ["*"];
class FronteggRouterComponent {
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
FronteggRouterComponent.ɵfac = function FronteggRouterComponent_Factory(t) { return new (t || FronteggRouterComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Router)); };
FronteggRouterComponent.ɵcmp = ɵɵdefineComponent({ type: FronteggRouterComponent, selectors: [["frontegg-router"]], ngContentSelectors: _c0$2, decls: 1, vars: 0, template: function FronteggRouterComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FronteggRouterComponent, [{
        type: Component,
        args: [{
                selector: 'frontegg-router',
                template: `
    <ng-content></ng-content>`,
                styles: [],
            }]
    }], function () { return [{ type: ElementRef }, { type: Router }]; }, null); })();

class CoreModule {
}
CoreModule.ɵmod = ɵɵdefineNgModule({ type: CoreModule });
CoreModule.ɵinj = ɵɵdefineInjector({ factory: function CoreModule_Factory(t) { return new (t || CoreModule)(); }, imports: [[
            PortalModule,
            CountdownModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(CoreModule, { declarations: [FronteggProviderComponent,
        FronteggFirstComponent,
        FronteggRouterComponent], imports: [PortalModule,
        CountdownModule], exports: [FronteggProviderComponent,
        FronteggFirstComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(CoreModule, [{
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

/*
 * Public API Surface of core
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CoreModule, CoreService, FronteggFirstComponent, FronteggProviderComponent };
//# sourceMappingURL=frontegg-ng-core.js.map
