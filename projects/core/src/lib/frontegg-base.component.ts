import { Component, ElementRef, OnDestroy } from '@angular/core';
import { DOMProxy } from '@frontegg/react-core';

@Component({
  template: `
    <ng-content></ng-content>`,
})
export class FronteggBaseComponent implements OnDestroy {
  protected rcParent: any;
  protected rcPortal: any;
  protected rcSetPortals: any;

  constructor(protected elem: ElementRef) {
    this.elem.nativeElement.ngClass = this;
  }

  protected mountElement(component: any, otherProps?: any): void {
    let parent = this.elem.nativeElement.parentElement;
    while (parent != null && !parent.ngClass) {
      parent = parent.parentElement;
    }
    const ngChildren = [...this.elem.nativeElement.childNodes];
    const ngComponents = DOMProxy.createElement('div', {
      ref: ref => ngChildren.forEach(node => ref?.appendChild(node as any)),
    }, []);

    this.rcPortal = DOMProxy.createPortal(DOMProxy.createElement(component, {
      _resolvePortals: (setPortals) => this.rcSetPortals = setPortals,
      ...otherProps,
    }, ngComponents), this.elem.nativeElement);
    if (!parent) {
      const rcProxy = document.createElement('div');
      document.body.appendChild(rcProxy);
      DOMProxy.render(this.rcPortal, rcProxy);
    } else {
      this.rcParent = parent.ngClass;
      this.rcParent.mountChild(this.rcPortal);
    }
  }


  // noinspection JSUnusedGlobalSymbols
  public mountChild(child): void {
    this.rcSetPortals(portals => [...portals, child]);
  }

  // noinspection JSUnusedGlobalSymbols
  public unmountChild(child): void {
    this.rcSetPortals(portals => [...portals.filter(p => p !== child)]);
  }

  ngOnDestroy(): void {
    // console.log('FronteggFirstComponent.ngOnDestroy');
    // this.rcParent?.unmountChild(this.rcPortal);
  }

}
