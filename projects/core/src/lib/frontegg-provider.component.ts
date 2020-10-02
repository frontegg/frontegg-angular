import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2, ViewContainerRef,
} from '@angular/core';
import { createElement, Wrapper, createPortal, render, FirstComp } from 'ng-test';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'frontegg-provider',
  template: `
    <!--    <frontegg-router></frontegg-router>-->
    <ng-content></ng-content>`,
  styles: [],
})
export class FronteggProviderComponent implements AfterViewInit, OnInit, OnDestroy {
  rcWrapper: any;
  rcWrapperRef: any;
  rcProxy: any;
  rcPortals: any[] = [];
  ngChildren: any[] = [];
  routeListeners: any[] = [];
  // 1) createElement(RcComponent)
  //   1.1) pass upper props to RcComponent
  //   1.2) create smart children component with unique id to inject ng-content after mount
  // 2) create React Portal to be rendered inside this.elementRef
  // 3) search for parent Rc Component to inject this ReactPortal to it's children
  // 4) after React.Portal did mount, inject ng-container to it's smart children component

  constructor(private elem: ElementRef, private router: Router) {
    this.elem.nativeElement.ngClass = this;
  }

  ngAfterViewInit(): void {
    this.rcProxy = document.createElement('div');
    document.body.appendChild(this.rcProxy);
    this.ngChildren = [...this.elem.nativeElement.childNodes];
    const ngComponents = createElement('div', {
      ref: ref => this.ngChildren.forEach(node => ref?.appendChild(node as any)),
    }, []);

    // @ts-ignore
    window.ngH = this.router;
    // @ts-ignore
    this.router.location._platformLocation._history.listen = (e) => {
      this.routeListeners.push(e);
      return () => {
        this.routeListeners = this.routeListeners.filter(l => l !== e);
      };
    };
    // @ts-ignore
    this.router.location._platformLocation._history.createHref = (e) => {
      return e.pathname;
    };
    // @ts-ignore
    this.router.location._platformLocation._history.push = (path, data) => {
      // @ts-ignore
      this.router.navigate([path], { state: data, replaceUrl: false });
    };
    // @ts-ignore
    this.router.location._platformLocation._history.replace = (path, data) => {
      this.router.navigate([path], { state: data, replaceUrl: true });
    };
    // @ts-ignore
    this.router.location._platformLocation._history.location = this.router.location._platformLocation.location;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // @ts-ignore
        this.routeListeners.forEach(l => l(this.router.location._platformLocation.location));
      }
    });

    this.rcWrapper = createPortal(createElement(Wrapper, {
      ref: ref => this.rcWrapperRef = ref,
      ngComponents,
      rcPortals: this.rcPortals,
      // @ts-ignore
      _history: this.router.location._platformLocation._history,
    } as any), this.elem.nativeElement);
    render(this.rcWrapper, this.rcProxy);
  }

  ngOnInit(): void {

  }

  public mountChild(child): void {
    this.rcWrapperRef.mountChild(child);
  }

  public unmountChild(child): void {
    this.rcWrapperRef.unmountChild(child);
  }

  ngOnDestroy(): void {
    // this.nodeRef?.remove();
  }

}
