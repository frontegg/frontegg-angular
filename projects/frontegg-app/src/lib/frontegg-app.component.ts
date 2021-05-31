import { Component, OnInit, OnDestroy } from '@angular/core';
import { FronteggAppService } from './frontegg-app.service';
@Component({
  selector: 'lib-frontegg-app',
  template: ``,
})
export class FronteggAppComponent implements OnInit, OnDestroy {
  name: string;
  constructor(private fronteggAppService: FronteggAppService) {
    this.name = 'FronteggApp';
  }

  ngAfterViewInit(): void {
    this.fronteggAppService?.fronteggApp?.mountAdminPortal()
  }

  ngOnDestroy(): void {
    this.fronteggAppService?.fronteggApp?.unmountAdminPortal()
  }


  ngOnInit(): void {
  }

}
