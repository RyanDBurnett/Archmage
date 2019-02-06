// import * as C from '@shared/const';
// import * as D from '@shared/debug';

import { observable, action } from 'mobx';

export default class Store {
    @observable characterName: string;

    constructor() {
        this.characterName = '';
    }

    @action setCharacterName(newName: string) {
        this.characterName = newName;
    }
  }
