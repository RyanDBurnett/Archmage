// import * as C from '@shared/const';
// import * as D from '@shared/debug';

import { observable, action } from 'mobx';

export enum AbilityScoreNames {
    // Enum needs to match to the 3 char strings so that we can use
    // them as object accessors below.
    STR = 'STR',
    DEX = 'DEX',
    AGI = 'AGI',
    CON = 'CON',
    INT = 'INT',
    WIS = 'WIS',
    PER = 'PER',
    CHA = 'CHA',
    LCK = 'LCK'
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
    @observable AGI: IAbilityScore
    @observable CON: IAbilityScore
    @observable INT: IAbilityScore
    @observable WIS: IAbilityScore
    @observable PER: IAbilityScore
    @observable CHA: IAbilityScore
    @observable LCK: IAbilityScore

    constructor() {
        this.STR = {
            value: 10,
            bonus: 0
        }

        this.DEX = {
            value: 10,
            bonus: 0
        }

        this.AGI = {
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

        this.PER = {
            value: 10,
            bonus: 0
        }

        this.CHA = {
            value: 10,
            bonus: 0
        }

        this.LCK = {
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

    getJsonParsableAbilityScores() {
        return {
            str: this.STR.value,
            dex: this.DEX.value,
            agi: this.AGI.value,
            con: this.CON.value,
            int: this.INT.value,
            wis: this.WIS.value,
            per: this.PER.value,
            cha: this.CHA.value,
            lck: this.LCK.value
        }
    }

    loadSavedAbilityScores(scores: any) {
        this.setAbilityScore(AbilityScoreNames.STR, scores.str);
        this.setAbilityScore(AbilityScoreNames.DEX, scores.dex);
        this.setAbilityScore(AbilityScoreNames.AGI, scores.agi);
        this.setAbilityScore(AbilityScoreNames.CON, scores.con);
        this.setAbilityScore(AbilityScoreNames.INT, scores.int);
        this.setAbilityScore(AbilityScoreNames.WIS, scores.wis);
        this.setAbilityScore(AbilityScoreNames.PER, scores.per);
        this.setAbilityScore(AbilityScoreNames.CHA, scores.cha);
        this.setAbilityScore(AbilityScoreNames.LCK, scores.lck);
    }
  }
