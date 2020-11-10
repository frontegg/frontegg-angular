import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-2',
  template: '<ng-content></ng-content>',
})
export class Test2Component implements OnInit, DoCheck, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
    console.log('Test2', 'ngOnInit');
  }

  ngDoCheck(): void {
    console.log('Test2', 'ngDoCheck');
  }

  ngOnChanges(): void {
    console.log('Test2', 'ngOnChanges');
  }

  ngAfterContentInit(): void {
    console.log('Test2', 'ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('Test2', 'ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('Test2', 'ngAfterViewInit');
  }

}
