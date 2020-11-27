import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { AuditsPage } from '@frontegg/react-audits';
import { FronteggBaseComponent } from '@frontegg/ng-core';

@Component({
  selector: 'fe-audits',
  template: ``,
})
export class AuditsComponent extends FronteggBaseComponent implements AfterViewInit {

  constructor(protected elem: ElementRef) {
    super(elem);
  }

  ngAfterViewInit(): void {
    this.mountElement('Audits', AuditsPage);
  }
}
