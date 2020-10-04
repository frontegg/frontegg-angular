import { AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FronteggBaseComponent } from './frontegg-base.component';
import * as i0 from "@angular/core";
export declare class FronteggProviderComponent extends FronteggBaseComponent implements AfterViewInit {
    private router;
    routeListeners: any[];
    constructor(elem: ElementRef, router: Router);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<FronteggProviderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<FronteggProviderComponent, "frontegg-provider", never, {}, {}, never, ["*"]>;
}
//# sourceMappingURL=frontegg-provider.component.d.ts.map