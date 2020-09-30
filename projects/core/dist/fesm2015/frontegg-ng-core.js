import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵdefineComponent, ɵɵelementStart, ɵɵtext, ɵɵelementEnd, Component, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';

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

class CoreComponent {
    constructor() { }
    ngOnInit() {
    }
}
CoreComponent.ɵfac = function CoreComponent_Factory(t) { return new (t || CoreComponent)(); };
CoreComponent.ɵcmp = ɵɵdefineComponent({ type: CoreComponent, selectors: [["lib-core"]], decls: 2, vars: 0, template: function CoreComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "p");
        ɵɵtext(1, " core works! aa ");
        ɵɵelementEnd();
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CoreComponent, [{
        type: Component,
        args: [{
                selector: 'lib-core',
                template: `
    <p>
      core works! aa
    </p>
  `,
                styles: []
            }]
    }], function () { return []; }, null); })();

class CoreModule {
}
CoreModule.ɵmod = ɵɵdefineNgModule({ type: CoreModule });
CoreModule.ɵinj = ɵɵdefineInjector({ factory: function CoreModule_Factory(t) { return new (t || CoreModule)(); }, imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(CoreModule, { declarations: [CoreComponent], exports: [CoreComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(CoreModule, [{
        type: NgModule,
        args: [{
                declarations: [CoreComponent],
                imports: [],
                exports: [CoreComponent]
            }]
    }], null, null); })();

/*
 * Public API Surface of core
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CoreComponent, CoreModule, CoreService };
//# sourceMappingURL=frontegg-ng-core.js.map
