import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { FronteggBaseComponent } from '../frontegg-base.component';
import { PageHeader, PageHeaderProps } from '@frontegg/react-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'frontegg-page-header',
  template: ``,
})
export class PageHeaderComponent extends FronteggBaseComponent implements AfterViewInit {
  @Input() className: string;
  @Input() title: string;
  @Input() titleClassName: string;
  @Input() subTitle?: string;
  @Input() childClassName?: string;
  @Input() onBackButtonClick?: (e) => void;

  constructor(protected elem: ElementRef) {
    super(elem);
  }

  ngAfterViewInit(): void {
    this.mountElement<PageHeaderProps>('PageHeader', PageHeader, {
      className: this.className,
      title: this.title,
      titleClassName: this.titleClassName,
      subTitle: this.subTitle,
      childClassName: this.childClassName,
      onBackButtonClick: this.onBackButtonClick,
    });
  }
}
