// import * as C from '@shared/const';
// import * as D from '@shared/debug';
import * as fs from 'fs';

import { observable } from 'mobx';
import Profile from './profile/profile';
import AbilityScores from './ability-scores/ability-scores';

export default class Store {
    @observable profile: Profile;
    @observable AbilityScores: AbilityScores;

    constructor() {
        this.profile = new Profile();
        this.AbilityScores = new AbilityScores();
    }

    saveCharacter() {
        const characterData = {
            profile: this.profile,
            AbilityScores: this.AbilityScores
        };

        fs.writeFile(
            './saves/character.json',
            JSON.stringify(characterData),
            (err) => {
                if (err) {
                    console.error(err);
                }
            });
    }

    loadCharacter() {
        const loadedData = fs.readFileSync('./saves/character.json');
        const parsedData = JSON.parse(loadedData.toString());
        this.profile = parsedData.profile;
        this.AbilityScores = parsedData.AbilityScores;
    }
}
