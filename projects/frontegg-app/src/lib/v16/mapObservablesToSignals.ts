import { SIGNALS_ERROR_MESSAGE } from './consts';
import { isAngular16 } from './isAngular16';
import { Signal, toSignal } from './signals';

export const mapObservablesToSignals = <T>(obj: T) => {
    if (!isAngular16) {
        throw new Error(SIGNALS_ERROR_MESSAGE)
    }
    const observables = Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
        .filter(prop => prop.endsWith("$"));

    const fields: Record<string, Signal> = {};
    observables.forEach(observable => {
        const fieldName = observable.slice(0, -1); // Remove the trailing '$'

        fields[fieldName] = toSignal(obj[observable as keyof typeof obj]);
    })
    return fields;
}
