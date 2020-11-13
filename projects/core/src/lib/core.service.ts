import { Injectable } from '@angular/core';
import { FronteggStoreEvent } from './constants';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public state: any;
  public actions: any;

  constructor() {
    (window as any).coreService = this;
  }


  public updateState(state: any, action: any): void {
    this.state = state;
    const storeName = action.type.substring(0, action.type.indexOf('/'));
    document.dispatchEvent(new CustomEvent(`${FronteggStoreEvent}/${storeName}`, {
      bubbles: true,
      cancelable: false,
      detail: action,
    }));
  }
}
