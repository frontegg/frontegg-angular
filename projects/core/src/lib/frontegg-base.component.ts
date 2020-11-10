import { Component, ElementRef, OnDestroy } from '@angular/core';
import { DOMProxy } from '@frontegg/react-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <ng-content></ng-content>`,
})
export class FronteggBaseComponent implements OnDestroy {
  protected name: any;
  protected rcParent: any;
  protected rcPortal: any;
  protected rcSetPortals: any;
  protected cc: any[];

  constructor(protected elem: ElementRef) {
    this.elem.nativeElement.ngClass = this;
  }

  protected findActiveRoute(route: ActivatedRoute): string {
    let snapshot = route.snapshot;
    let activated = route.firstChild;
    if (activated != null) {
      while (activated != null) {
        snapshot = activated.snapshot;
        activated = activated.firstChild;
      }
    }

    if (!snapshot.routeConfig) {
      return '/';
    }
    while (snapshot.routeConfig.path === '**' || snapshot.routeConfig.path === '*') {
      snapshot = snapshot.parent;
    }

    return `/${snapshot.routeConfig.path}`;
  }

  protected mountElement<T = any>(name: string, component: any, otherProps?: T): void {
    this.name = name;
    console.log('mountElement', this.name);
    let parent = this.elem.nativeElement.parentElement;
    while (parent != null && !parent.ngClass) {
      parent = parent.parentElement;
    }
    const ngChildren = [...this.elem.nativeElement.childNodes];
    const ngComponents = ngChildren.length === 0 ? null : DOMProxy.createElement('div', {
      ref: ref => ngChildren.forEach(node => ref?.appendChild(node as any)),
    }, []);

    this.rcPortal = DOMProxy.createPortal(DOMProxy.createElement(component, {
      _resolvePortals: (setPortals) => this.rcSetPortals = setPortals,
      ...otherProps,
    } as any, ngComponents), this.elem.nativeElement);
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
    if (this.rcSetPortals == null) {
      console.log('mount.mountChild', this.name, child.containerInfo);
      setTimeout(() => this.mountChild(child), 0);
      return;
    }
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
