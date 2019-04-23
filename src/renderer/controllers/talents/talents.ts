// import * as C from '@shared/const';
// import * as D from '@shared/debug';

import { observable, action } from 'mobx';
import { ISphereCollection, SphereCategories } from './sphere-parser';

export default class Talents {
    @observable spheres: ISphereCollection
    @observable playerTalents: {
        combat: string[],
        magic: string[],
        skills: string[]
    }

    constructor(sphereCollection: ISphereCollection) {
        this.spheres = sphereCollection;
        this.playerTalents = {
            combat: [],
            magic: [],
            skills: []
        };
    }

    @action addTalent(category: SphereCategories, talentId: string) {
        this.playerTalents[category].push(talentId);
    }
  }
