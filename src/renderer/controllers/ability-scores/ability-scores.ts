// import * as C from '@shared/const';
// import * as D from '@shared/debug';

import { observable, action } from 'mobx';

export enum AbilityScoreNames {
    // Enum needs to match to the 3 char strings so that we can use
    // them as object accessors below.
    STR = 'STR',
    DEX = 'DEX',
    CON = 'CON',
    INT = 'INT',
    WIS = 'WIS',
    CHA = 'CHA'
}

export interface IAbilityScore {
    value: number,
    // Bonus = value - 10 / 2, round down to integer (towards negative, not towards 0)
    // This is enforced via the 'set AbilityScore' function below.
    bonus: number
} 

export default class AbilityScores {
    [index: string] : any;
    @observable STR: IAbilityScore
    @observable DEX: IAbilityScore
    @observable CON: IAbilityScore
    @observable INT: IAbilityScore
    @observable WIS: IAbilityScore
    @observable CHA: IAbilityScore

    constructor() {
        this.STR = {
            value: 10,
            bonus: 0
        }

        this.DEX = {
            value: 10,
            bonus: 0
        }

        this.CON = {
            value: 10,
            bonus: 0
        }

        this.INT = {
            value: 10,
            bonus: 0
        }

        this.WIS = {
            value: 10,
            bonus: 0
        }

        this.CHA = {
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

    getValue(abilityScore: AbilityScoreNames) {
        return this[abilityScore].value;
    }

    getBonus(abilityScore: AbilityScoreNames) {
        return this[abilityScore].bonus;
    }
  }
