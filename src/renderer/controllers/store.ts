// import * as C from '@shared/const';
// import * as D from '@shared/debug';
import * as fs from 'fs';
import {EditorViews} from '../shared/consts';

import { observable, action } from 'mobx';
import Profile from './profile/profile';
import AbilityScores from './ability-scores/ability-scores';
import Levels from './levels/levels';

export default class Store {
    @observable profile: Profile;
    @observable abilityScores: AbilityScores;
    @observable levels: Levels;
    @observable currentEditorView: EditorViews;

    constructor() {
        this.profile = new Profile();
        this.abilityScores = new AbilityScores();
        this.levels = new Levels();
        this.currentEditorView = EditorViews.Profile; 
    }

    @action changeView(newView: EditorViews) {
        this.currentEditorView = newView;
    }

    saveCharacter() {
        const characterData = {
            profile: this.profile,
            abilityScores: this.abilityScores.getJsonParsableAbilityScores(),
            levels: this.levels.levels

        };

        console.error(characterData);

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
        this.abilityScores.loadSavedAbilityScores(parsedData.abilityScores);
        this.levels.loadSavedLevels(parsedData.levels);
    }
}
