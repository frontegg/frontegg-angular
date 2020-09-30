import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵdefineComponent, ɵɵelementStart, ɵɵtext, ɵɵelementEnd, Component, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';

class AuthService {
    constructor() { }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(); };
AuthService.ɵprov = ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

class AuthComponent {
    constructor() { }
    ngOnInit() {
    }
}
AuthComponent.ɵfac = function AuthComponent_Factory(t) { return new (t || AuthComponent)(); };
AuthComponent.ɵcmp = ɵɵdefineComponent({ type: AuthComponent, selectors: [["lib-auth"]], decls: 2, vars: 0, template: function AuthComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "p");
        ɵɵtext(1, " auth works! ");
        ɵɵelementEnd();
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AuthComponent, [{
        type: Component,
        args: [{
                selector: 'lib-auth',
                template: `
    <p>
      auth works!
    </p>
  `,
                styles: []
            }]
    }], function () { return []; }, null); })();

class AuthModule {
}
AuthModule.ɵmod = ɵɵdefineNgModule({ type: AuthModule });
AuthModule.ɵinj = ɵɵdefineInjector({ factory: function AuthModule_Factory(t) { return new (t || AuthModule)(); }, imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(AuthModule, { declarations: [AuthComponent], exports: [AuthComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(AuthModule, [{
        type: NgModule,
        args: [{
                declarations: [AuthComponent],
                imports: [],
                exports: [AuthComponent]
            }]
    }], null, null); })();

/*
 * Public API Surface of auth
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AuthComponent, AuthModule, AuthService };
//# sourceMappingURL=frontegg-ng-auth.js.map
