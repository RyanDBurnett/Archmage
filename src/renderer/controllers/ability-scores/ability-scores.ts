// import * as C from '@shared/const';
// import * as D from '@shared/debug';

import { observable, action } from 'mobx';

export enum AbilityScoreNames {
    STR = 'strength',
    DEX = 'dexterity',
    CON = 'constitution',
    INT = 'intelligence',
    WIS = 'wisdom',
    CHA = 'charisma'
}

export interface IAbilityScore {
    value: number,
    // Bonus = value - 10 / 2, round down to integer (towards negative, not towards 0)
    // This is enforced via the 'set AbilityScore' function below.
    bonus: number
} 

export default class AbilityScores {
    @observable strength: IAbilityScore
    @observable dexterity: IAbilityScore
    @observable constitution: IAbilityScore
    @observable intelligence: IAbilityScore
    @observable wisdom: IAbilityScore
    @observable charisma: IAbilityScore

    constructor() {
        this.strength = {
            value: 10,
            bonus: 0
        }

        this.dexterity = {
            value: 10,
            bonus: 0
        }

        this.constitution = {
            value: 10,
            bonus: 0
        }

        this.intelligence = {
            value: 10,
            bonus: 0
        }

        this.wisdom = {
            value: 10,
            bonus: 0
        }

        this.charisma = {
            value: 10,
            bonus: 0
        }
    }

    @action setAbilityScore(abilityScore: AbilityScoreNames, value: number) {
        this[abilityScore] = {
            value,
            bonus: Math.floor((value - 10) / 2)
        }
    }
  }
