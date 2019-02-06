// import * as C from '@shared/const';
// import * as D from '@shared/debug';

import { observable } from 'mobx';

export class Store {
    @observable characterName: string;

    constructor() {
        this.characterName = '';
    }
  }
