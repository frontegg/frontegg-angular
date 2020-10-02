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
import { NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';


@Component({
  selector: 'frontegg-router',
  template: `
    <ng-content></ng-content>`,
  styles: [],
})
export class FronteggRouterComponent {
  constructor(private elem: ElementRef, router: Router) {

    // @ts-ignore
    window.ngHistory = router;
    router.events.subscribe((event) => {
      console.log(event);
      if (event instanceof NavigationStart) {
        console.log(event);
        if (event.navigationTrigger === 'imperative') {
          // @ts-ignore
          (window.rcHistory).replace(event.url, event.restoredState);
        }
        // @ts-ignore
        // console.log(window.ngHistory.location._platformLocation._history);
        // @ts-ignore
        // Object.assign(window.rcHistory, window.ngHistory.location._platformLocation._history);
        // event.url
        // window.localStorage.setItem('previousUrl', this.router.url);
      }
    });
  }
}
