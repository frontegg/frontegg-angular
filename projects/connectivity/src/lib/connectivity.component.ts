import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { ConnectivityPage } from '@frontegg/react-connectivity';
import { FronteggBaseComponent } from '@frontegg/ng-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fe-connectivity-page',
  template: ``,
})
export class ConnectivityComponent extends FronteggBaseComponent implements AfterViewInit {
  constructor(protected elem: ElementRef, private route: ActivatedRoute) {
    super(elem);
    this.name = 'ConnectivityPage';
  }

  ngAfterViewInit(): void {
    this.mountElement('ConnectivityPage', ConnectivityPage, {
      rootPath: this.findActiveRoute(this.route),
    });
  }
}
