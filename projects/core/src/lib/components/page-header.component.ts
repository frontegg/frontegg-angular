import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { FronteggBaseComponent } from '../frontegg-base.component';
import { PageHeader } from '@frontegg/react-core';

@Component({
  selector: 'frontegg-page-header',
  template: ``,
})
export class PageHeaderComponent extends FronteggBaseComponent implements AfterViewInit {
  @Input() title: string;
  @Input() subTitle: string;

  constructor(protected elem: ElementRef) {
    super(elem);
  }

  ngAfterViewInit(): void {
    const {
      title,
      subTitle,
    } = this;
    this.mountElement(PageHeader, {
      title,
      subTitle,
    });
  }
}
