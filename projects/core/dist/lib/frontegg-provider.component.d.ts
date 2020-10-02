import { AfterViewInit, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
export declare class FronteggProviderComponent implements AfterViewInit, OnInit, OnDestroy {
    private elem;
    private router;
    rcWrapper: any;
    rcWrapperRef: any;
    rcProxy: any;
    rcPortals: any[];
    ngChildren: any[];
    routeListeners: any[];
    constructor(elem: ElementRef, router: Router);
    ngAfterViewInit(): void;
    ngOnInit(): void;
    mountChild(child: any): void;
    unmountChild(child: any): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<FronteggProviderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<FronteggProviderComponent, "frontegg-provider", never, {}, {}, never, ["*"]>;
}
//# sourceMappingURL=frontegg-provider.component.d.ts.map