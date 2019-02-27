// import * as C from '@shared/const';
// import * as D from '@shared/debug';
import * as fs from 'fs';

import { observable } from 'mobx';
import Profile from './profile/profile';
import Attributes from './attributes/attributes';

export default class Store {
    @observable profile: Profile;
    @observable attributes: Attributes;

    constructor() {
        this.profile = new Profile();
        this.attributes = new Attributes();
    }

    saveCharacter() {
        const characterData = {
            profile: this.profile,
            attributes: this.attributes
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
        this.attributes = parsedData.attributes;
    }
}
