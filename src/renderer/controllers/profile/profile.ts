// import * as C from '@shared/const';
// import * as D from '@shared/debug';

import { observable, action } from 'mobx';

export default class Profile {
    @observable name: string;
    @observable gender: string;
    @observable age: string;
    @observable height: string;
    @observable weight: string;

    // A minor note: These are all strings so that the user can input
    // a unit of their choice, aren't constrained by a strict set of options,
    // etc.  Any property in the 'profile' for a character should have little or
    // no mechanical effect.
    constructor() {
        this.name   = '';
        this.gender = '';
        this.age    = '';
        this.height = '';
        this.weight = '';
    }

    @action setName(newName: string) {
        this.name = newName;
    }

    @action setGender(newGender: string) {
        this.gender = newGender;
    }

    @action setAge(newAge: string) {
        this.age = newAge;
    }

    @action setHeight(newHeight: string) {
        this.height = newHeight;
    }

    @action setWeight(newWeight: string) {
        this.weight = newWeight;
    }
  }
