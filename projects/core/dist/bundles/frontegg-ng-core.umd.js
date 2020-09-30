(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@frontegg/ng-core', ['exports', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.frontegg = global.frontegg || {}, global.frontegg['ng-core'] = {}), global.ng.core));
}(this, (function (exports, i0) { 'use strict';

    var CoreService = /** @class */ (function () {
        function CoreService() {
        }
        return CoreService;
    }());
    CoreService.ɵfac = function CoreService_Factory(t) { return new (t || CoreService)(); };
    CoreService.ɵprov = i0.ɵɵdefineInjectable({ token: CoreService, factory: CoreService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CoreService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return []; }, null);
    })();

    var CoreComponent = /** @class */ (function () {
        function CoreComponent() {
        }
        CoreComponent.prototype.ngOnInit = function () {
        };
        return CoreComponent;
    }());
    CoreComponent.ɵfac = function CoreComponent_Factory(t) { return new (t || CoreComponent)(); };
    CoreComponent.ɵcmp = i0.ɵɵdefineComponent({ type: CoreComponent, selectors: [["lib-core"]], decls: 2, vars: 0, template: function CoreComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "p");
                i0.ɵɵtext(1, " core works! aa ");
                i0.ɵɵelementEnd();
            }
        }, encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CoreComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-core',
                        template: "\n    <p>\n      core works! aa\n    </p>\n  ",
                        styles: []
                    }]
            }], function () { return []; }, null);
    })();

    var CoreModule = /** @class */ (function () {
        function CoreModule() {
        }
        return CoreModule;
    }());
    CoreModule.ɵmod = i0.ɵɵdefineNgModule({ type: CoreModule });
    CoreModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CoreModule_Factory(t) { return new (t || CoreModule)(); }, imports: [[]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CoreModule, { declarations: [CoreComponent], exports: [CoreComponent] }); })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CoreModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [CoreComponent],
                        imports: [],
                        exports: [CoreComponent]
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of core
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CoreComponent = CoreComponent;
    exports.CoreModule = CoreModule;
    exports.CoreService = CoreService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=frontegg-ng-core.umd.js.map
