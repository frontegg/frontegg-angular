/** @ts-ignore Signal is not exported from angular/core before version 16 **/
import type { Signal } from '@angular/core';
import { SIGNALS_ERROR_MESSAGE } from './consts';
import { isAngular16 } from './isAngular16';

let toSignal = (observable: any) => {
    if (!isAngular16) {
        throw new Error(SIGNALS_ERROR_MESSAGE)
    }
}

if (isAngular16) {
    const toSignalImportPath = '@angular/core/rxjs-interop'
    import(toSignalImportPath)
        .then(({ toSignal: angularToSignal }) => {
            toSignal = angularToSignal;
        }).catch(() => { });
}


export { toSignal, Signal }
