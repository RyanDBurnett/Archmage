// import * as C from '@shared/const';
// import * as D from '@shared/debug';

import { observable } from 'mobx';
import Profile from './profile/profile';

export default class Store {
    @observable profile: Profile;

    constructor() {
        this.profile = new Profile();
    }
  }
