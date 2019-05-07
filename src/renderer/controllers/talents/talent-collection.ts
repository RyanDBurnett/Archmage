// import * as C from '@shared/const';
// import * as D from '@shared/debug';

import { observable, action } from 'mobx';
import TalentLibrary from './talent-library';

export interface ISphereCollectionPlaceholder {
    combat: ISpherePlaceholder[],
    magic: ISpherePlaceholder[],
    skills: ISpherePlaceholder[]
}

export interface ISpherePlaceholder {
    id: string,
    coreTalent: string
    talents: string[]
}

export default class TalentCollection {
    @observable sphereCollection: ISphereCollectionPlaceholder
    talentLibrary: TalentLibrary
    
    constructor(talentLibrary: TalentLibrary) {
        this.talentLibrary = talentLibrary;
        this.sphereCollection = {
            combat: [],
            magic: [],
            skills: []
        };
    }

    @action addTalent(talentId: string) {
        const talent = this.talentLibrary.getTalentById(talentId);
        let sphere = this.sphereCollection[talent.category].find((sphere) => sphere.id === talent.sphereId);
        if (sphere) {
            sphere.talents.push(talent.id)
        } else {
            this.sphereCollection[talent.category].push({id: talent.sphereId, coreTalent: talent.id, talents: [talent.id]});
        }        
    }

    @action removeTalent(talentId: string) {
        const talent = this.talentLibrary.getTalentById(talentId);
        const sphere = this.sphereCollection[talent.category].find((sphere) => sphere.id === talent.sphereId);
        if (sphere) {
            const talentIndex = sphere.talents.findIndex((targetTalent) => talent.id === targetTalent);
            if (talentIndex >= 0) {
                sphere.talents.splice(talentIndex, 1);
                if (sphere.talents.length === 0) {
                    // Remove sphere?
                }
            }
        } 
    }
}
