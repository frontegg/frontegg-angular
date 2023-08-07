/** @ts-ignore **/
import { Signal } from '@angular/core';
import { SIGNALS_ERROR_MESSAGE } from './consts';
import { isAngular16 } from './isAngular16';

let toSignal = (observable: any) => {
    if (!isAngular16) {
        throw new Error(SIGNALS_ERROR_MESSAGE)
    }

}

if (isAngular16) {
    //This is a workaround to prevent build error
    const importPath = isAngular16 ? '@angular/core/rxjs-interop' : '@angular/core'
    import(importPath)
        .then(({ toSignal: angularToSignal }) => {
            toSignal = angularToSignal;
        }).catch(() => { });
}

export { toSignal, Signal }