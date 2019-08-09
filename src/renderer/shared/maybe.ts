import { isNullOrUndefined } from "util";

interface Maybe<T> {
    value: T;
    isValid: boolean;
}

function createMaybe<T>(value?: T | null, isValid?: boolean): Maybe<T> {
    return <Maybe<T>> {
        value,
        isValid: ((isValid !== undefined) && (!isNullOrUndefined(value))) ? isValid : !!value
    }
}

function mapMaybe<T, U>(maybe: Maybe<T>, map: (a: T) => Maybe<U>) {
    if (maybe.isValid) {
        const unwrappedValue = maybe.value;
        return map(unwrappedValue);
    } else {
        return createMaybe<U>();
    }
}

export {
    Maybe,
    createMaybe,
    mapMaybe
}