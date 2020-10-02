import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { createElement, createPortal, FirstComp, render } from 'ng-test';

@Component({
  selector: 'frontegg-first-component',
  template: `<ng-content></ng-content>`,
})
export class FronteggFirstComponent implements OnInit, AfterViewInit, OnDestroy {
  rcParent: any;
  rcPortal: any;

  constructor(private elem: ElementRef) {
    console.log('FronteggFirstComponent.constructor');
    this.elem.nativeElement.ngClass = this;
  }

  ngAfterViewInit(): void {
    let parent = this.elem.nativeElement.parentElement;
    while (parent != null && !parent.ngClass) {
      parent = parent.parentElement;
    }
    this.rcPortal = createPortal(createElement(FirstComp, { isNg: true } as any, null), this.elem.nativeElement);
    if (!parent) {
      const rcProxy = document.createElement('div');
      document.body.appendChild(rcProxy);
      render(this.rcPortal, rcProxy);
    } else {
      this.rcParent = parent.ngClass;
      this.rcParent.mountChild(this.rcPortal);
    }
  }

  ngOnInit(): void {
    console.log('FronteggFirstComponent.ngOnInit');
  }


  ngOnDestroy(): void {
    console.log('FronteggFirstComponent.ngOnDestroy');
    this.rcParent.unmountChild(this.rcPortal);
  }

}
