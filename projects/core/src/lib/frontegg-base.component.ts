import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { DOMProxy } from '@frontegg/react-core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <ng-template [ngIf]="this.loaded">
      <ng-content></ng-content>
    </ng-template>`,
})
export class FronteggBaseComponent implements OnInit, OnDestroy {
  public loaded = false;
  protected rcParent: any;
  protected rcPortal: any;
  protected rcSetPortals: any;
  protected rcChildren: Set<FronteggBaseComponent>;
  public state: 'registered' | 'rendered' = null;
  protected name: string;
  protected registered = false;


  constructor(protected elem: ElementRef) {
    this.elem.nativeElement.ngClass = this;
    this.rcChildren = new Set();
  }

  ngOnInit(): void {
    console.log(this.name, 'ngOnInit');
    this.registerComponent();
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

  protected registerChild(child: FronteggBaseComponent): void {
    console.log(this.name, 'registerChild', child.name);
    // debugger;
    if (this.rcChildren.has(child)) {
      this.rcChildren.delete(child);
    }
    this.rcChildren.add(child);
  }

  protected registerComponent(): void {
    // debugger;
    const isProvider = this.name === 'FronteggProvider';
    let parent = this.elem.nativeElement.parentElement;
    while (parent != null && !parent.ngClass) {
      parent = parent.parentElement;
    }
    if (!isProvider && parent == null) {
      setTimeout(() => this.registerComponent(), 100);
      return;
    }

    if (!isProvider) {
      this.registered = true;
    }
    parent?.ngClass?.registerChild?.(this);
  }

  protected mountElement<T = any>(name: string, component: any, otherProps?: T): void {
    console.log(this.name, 'mountElement');
    this.state = 'rendered';
    const isProvider = this.name === 'FronteggProvider';
    let parent = this.elem.nativeElement.parentElement;
    while (parent != null && !parent.ngClass) {
      parent = parent.parentElement;
    }
    if (!isProvider && (parent == null || !this.registered)) {
      setTimeout(() => this.mountElement(name, component, otherProps), 100);
      return;
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
      this.rcParent.mountChild();
    }
  }

  public mountChild(): void {
    let isAllChildrenRendered = true;
    const portalsToInject = [];
    this.rcChildren.forEach(rcChild => {
      isAllChildrenRendered = isAllChildrenRendered && rcChild.state === 'rendered';
      portalsToInject.push(rcChild.rcPortal);
    });
    if (!isAllChildrenRendered) {
      return;
    }
    if (this.rcSetPortals == null) {
      setTimeout(() => this.mountChild(), 0);
      return;
    }
    this.rcSetPortals(portalsToInject);
  }

  // noinspection JSUnusedGlobalSymbols
  public unmountChild(child: FronteggBaseComponent): void {
    console.log('unmountChild', this.name);
    this.rcChildren.delete(child);
    this.mountChild();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy', this.name);
    this.rcParent?.unmountChild(this);
  }

}
