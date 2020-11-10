import { DOMProxy } from '@frontegg/react-core';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, DoCheck, ElementRef, OnChanges, OnInit } from '@angular/core';
import { MFA } from '@frontegg/react-auth';
import { FronteggBaseComponent } from '@frontegg/ng-core';

@Component({
  selector: 'app-test-1',
  template: '<ng-content></ng-content>',
})
export class Test1Component implements OnInit, DoCheck, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit {
  constructor(protected elem: ElementRef) {
  }

  ngOnInit(): void {
    console.log('Test1', 'ngOnInit', this.elem.nativeElement.innerHTML);
  }

  renderComponent(): void {
    DOMProxy.render(DOMProxy.createElement(MFA.Layout, {}), this.elem.nativeElement);
  }

  ngDoCheck(): void {
    console.log('Test1', 'ngDoCheck', this.elem.nativeElement.innerHTML);
  }

  ngOnChanges(): void {
    console.log('Test1', 'ngOnChanges', this.elem.nativeElement.innerHTML);
  }

  ngAfterContentInit(): void {
    console.log('Test1', 'ngAfterContentInit', this.elem.nativeElement.innerHTML);
  }

  ngAfterContentChecked(): void {
    console.log('Test1', 'ngAfterContentChecked', this.elem.nativeElement.innerHTML);
  }

  ngAfterViewInit(): void {
    console.log('Test1', 'ngAfterViewInit', this.elem.nativeElement.innerHTML);
  }

}
