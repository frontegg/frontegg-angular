import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵdirectiveInject, ElementRef, ɵɵdefineComponent, ɵɵprojectionDef, ɵɵprojection, Component, ɵɵInheritDefinitionFeature, Input, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DOMProxy, FronteggProvider, PageHeader } from '@frontegg/react-core';
import { AuthPlugin } from '@frontegg/react-auth';
import { uiLibrary } from '@frontegg/react-elements-material-ui';
import { PortalModule } from '@angular/cdk/portal';

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
class FronteggBaseComponent {
    constructor(elem) {
        this.elem = elem;
        this.elem.nativeElement.ngClass = this;
    }
    findActiveRoute(route) {
        let snapshot = route.snapshot;
        let activated = route.firstChild;
        if (activated != null) {
            while (activated != null) {
                snapshot = activated.snapshot;
                activated = activated.firstChild;
            }
        }
        if (!snapshot.routeConfig) {
            return '/';
        }
        while (snapshot.routeConfig.path === '**' || snapshot.routeConfig.path === '*') {
            snapshot = snapshot.parent;
        }
        return `/${snapshot.routeConfig.path}`;
    }
    mountElement(component, otherProps) {
        let parent = this.elem.nativeElement.parentElement;
        while (parent != null && !parent.ngClass) {
            parent = parent.parentElement;
        }
        const ngChildren = [...this.elem.nativeElement.childNodes];
        const ngComponents = ngChildren.length === 0 ? null : DOMProxy.createElement('div', {
            ref: ref => ngChildren.forEach(node => ref === null || ref === void 0 ? void 0 : ref.appendChild(node)),
        }, []);
        this.rcPortal = DOMProxy.createPortal(DOMProxy.createElement(component, Object.assign({ _resolvePortals: (setPortals) => this.rcSetPortals = setPortals }, otherProps), ngComponents), this.elem.nativeElement);
        if (!parent) {
            const rcProxy = document.createElement('div');
            document.body.appendChild(rcProxy);
            DOMProxy.render(this.rcPortal, rcProxy);
        }
        else {
            this.rcParent = parent.ngClass;
            this.rcParent.mountChild(this.rcPortal);
        }
    }
    // noinspection JSUnusedGlobalSymbols
    mountChild(child) {
        this.rcSetPortals(portals => [...portals, child]);
    }
    // noinspection JSUnusedGlobalSymbols
    unmountChild(child) {
        this.rcSetPortals(portals => [...portals.filter(p => p !== child)]);
    }
    ngOnDestroy() {
        // console.log('FronteggFirstComponent.ngOnDestroy');
        // this.rcParent?.unmountChild(this.rcPortal);
    }
}
FronteggBaseComponent.ɵfac = function FronteggBaseComponent_Factory(t) { return new (t || FronteggBaseComponent)(ɵɵdirectiveInject(ElementRef)); };
FronteggBaseComponent.ɵcmp = ɵɵdefineComponent({ type: FronteggBaseComponent, selectors: [["ng-component"]], ngContentSelectors: _c0, decls: 1, vars: 0, template: function FronteggBaseComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FronteggBaseComponent, [{
        type: Component,
        args: [{
                template: `
    <ng-content></ng-content>`,
            }]
    }], function () { return [{ type: ElementRef }]; }, null); })();

const _c0$1 = ["*"];
// declare namespace JSX { interface ElementAttributesProperty {} }
class FronteggProviderComponent extends FronteggBaseComponent {
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
FronteggProviderComponent.ɵfac = function FronteggProviderComponent_Factory(t) { return new (t || FronteggProviderComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Router)); };
FronteggProviderComponent.ɵcmp = ɵɵdefineComponent({ type: FronteggProviderComponent, selectors: [["frontegg-provider"]], features: [ɵɵInheritDefinitionFeature], ngContentSelectors: _c0$1, decls: 1, vars: 0, template: function FronteggProviderComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FronteggProviderComponent, [{
        type: Component,
        args: [{
                selector: 'frontegg-provider',
                template: `
    <ng-content></ng-content>`,
                styles: [],
            }]
    }], function () { return [{ type: ElementRef }, { type: Router }]; }, null); })();

class PageHeaderComponent extends FronteggBaseComponent {
    constructor(elem) {
        super(elem);
        this.elem = elem;
    }
    ngAfterViewInit() {
        this.mountElement(PageHeader, {
            className: this.className,
            title: this.title,
            titleClassName: this.titleClassName,
            subTitle: this.subTitle,
            childClassName: this.childClassName,
            onBackButtonClick: this.onBackButtonClick,
        });
    }
}
PageHeaderComponent.ɵfac = function PageHeaderComponent_Factory(t) { return new (t || PageHeaderComponent)(ɵɵdirectiveInject(ElementRef)); };
PageHeaderComponent.ɵcmp = ɵɵdefineComponent({ type: PageHeaderComponent, selectors: [["frontegg-page-header"]], inputs: { className: "className", title: "title", titleClassName: "titleClassName", subTitle: "subTitle", childClassName: "childClassName", onBackButtonClick: "onBackButtonClick" }, features: [ɵɵInheritDefinitionFeature], decls: 0, vars: 0, template: function PageHeaderComponent_Template(rf, ctx) { }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PageHeaderComponent, [{
        type: Component,
        args: [{
                selector: 'frontegg-page-header',
                template: ``,
            }]
    }], function () { return [{ type: ElementRef }]; }, { className: [{
            type: Input
        }], title: [{
            type: Input
        }], titleClassName: [{
            type: Input
        }], subTitle: [{
            type: Input
        }], childClassName: [{
            type: Input
        }], onBackButtonClick: [{
            type: Input
        }] }); })();

class CoreModule {
}
CoreModule.ɵmod = ɵɵdefineNgModule({ type: CoreModule });
CoreModule.ɵinj = ɵɵdefineInjector({ factory: function CoreModule_Factory(t) { return new (t || CoreModule)(); }, imports: [[
            PortalModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(CoreModule, { declarations: [FronteggProviderComponent,
        PageHeaderComponent,
        FronteggBaseComponent], imports: [PortalModule], exports: [FronteggProviderComponent,
        PageHeaderComponent,
        FronteggBaseComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(CoreModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    FronteggProviderComponent,
                    PageHeaderComponent,
                    FronteggBaseComponent,
                ],
                imports: [
                    PortalModule,
                ],
                exports: [
                    FronteggProviderComponent,
                    PageHeaderComponent,
                    FronteggBaseComponent,
                ],
            }]
    }], null, null); })();

/*
 * Public API Surface of core
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CoreModule, CoreService, FronteggBaseComponent, FronteggProviderComponent, PageHeaderComponent };
//# sourceMappingURL=frontegg-ng-core.js.map
