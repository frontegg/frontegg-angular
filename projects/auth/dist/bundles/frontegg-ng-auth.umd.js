(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@frontegg/ng-auth', ['exports', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.frontegg = global.frontegg || {}, global.frontegg['ng-auth'] = {}), global.ng.core));
}(this, (function (exports, i0) { 'use strict';

    var AuthService = /** @class */ (function () {
        function AuthService() {
        }
        return AuthService;
    }());
    AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(); };
    AuthService.ɵprov = i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AuthService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return []; }, null);
    })();

    var AuthComponent = /** @class */ (function () {
        function AuthComponent() {
        }
        AuthComponent.prototype.ngOnInit = function () {
        };
        return AuthComponent;
    }());
    AuthComponent.ɵfac = function AuthComponent_Factory(t) { return new (t || AuthComponent)(); };
    AuthComponent.ɵcmp = i0.ɵɵdefineComponent({ type: AuthComponent, selectors: [["lib-auth"]], decls: 2, vars: 0, template: function AuthComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "p");
                i0.ɵɵtext(1, " auth works! ");
                i0.ɵɵelementEnd();
            }
        }, encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AuthComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-auth',
                        template: "\n    <p>\n      auth works!\n    </p>\n  ",
                        styles: []
                    }]
            }], function () { return []; }, null);
    })();

    var AuthModule = /** @class */ (function () {
        function AuthModule() {
        }
        return AuthModule;
    }());
    AuthModule.ɵmod = i0.ɵɵdefineNgModule({ type: AuthModule });
    AuthModule.ɵinj = i0.ɵɵdefineInjector({ factory: function AuthModule_Factory(t) { return new (t || AuthModule)(); }, imports: [[]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AuthModule, { declarations: [AuthComponent], exports: [AuthComponent] }); })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AuthModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [AuthComponent],
                        imports: [],
                        exports: [AuthComponent]
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of auth
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AuthComponent = AuthComponent;
    exports.AuthModule = AuthModule;
    exports.AuthService = AuthService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=frontegg-ng-auth.umd.js.map
