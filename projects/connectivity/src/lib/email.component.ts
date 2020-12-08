import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { EmailComponent } from '@frontegg/react-connectivity';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fe-connectivity-email',
  template: ``,
})
export class ConnectivityEmailComponent extends FronteggBaseComponent implements AfterViewInit {
  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
    this.name = 'ConnectivityEmailComponent';
  }

  ngAfterViewInit(): void {
    this.mountElement('EmailComponent', EmailComponent, {
      rootPath: this.findActiveRoute(this.route),
    });
  }
}
