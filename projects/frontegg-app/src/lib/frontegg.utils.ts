import { NgZone } from '@angular/core';

export const runNgZoneIfNeeded = (ngZone: NgZone, fn: () => void) => {
  if (NgZone.isInAngularZone()) {
    fn();
  } else {
    ngZone.run(fn);
  }
};
