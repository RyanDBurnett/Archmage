import * as _ from "lodash/fp";

// Normally we avoid 'Class' for Monads (and FP in general), but IO needs a class so that we can
// make 'func' private without closure shenanigans.  This way, you cannot call
// IO.func() directly, which would be undesireable, and you are forced to use 'run',
// thus preserving the intentional laziness of the evaluation.
export default class IO<T> {
    effect: () => T
    constructor(effect) {
        if (!_.isFunction(effect)) {
            throw 'IO Usage: function required';
        }
        this.effect = effect;
    }

    static of(a: any) {
        return new IO( () => a );
    }
    static from(fn: () => any) {
        return new IO(fn);
    }
    map(fn: (arg: T) => any) {
        let self = this;
        return new IO(() => fn(self.effect()));
    }
    chain(fn: (args: T) => any) {
        return fn(this.effect());
    }
    run() {
        return this.effect();
    }
}