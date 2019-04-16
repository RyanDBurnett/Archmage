// import * as C from '@shared/const';
// import * as D from '@shared/debug';

import { observable, action } from 'mobx';

export const BENEFITS_PER_LEVEL = 6;
const LEVELS_PER_ABILITY_SCORE_INCREASE = 4;

export interface ILevelBenefit {
    cost: number,
    bonusIncrease: number,
    skillRanks: number,
    talents: number,
    rankName: string | null
}

export interface ILevelChoice {
    combatIndex: number,
    magicIndex: number,
    skillIndex: number
}

export const levelBenefits: ILevelBenefit[] = [
    {
        cost: -1,
        bonusIncrease: 0,
        skillRanks: 2,
        talents: 0,
        rankName: 'E'
    },
    {
        cost: 1,
        bonusIncrease: .5,
        skillRanks: 2,
        talents: .5,
        rankName: 'D'
    },
    {
        cost: 2,
        bonusIncrease: .75,
        skillRanks: 4,
        talents: .75,
        rankName: 'C'
    },
    {
        cost: 3,
        bonusIncrease: 1,
        skillRanks: 6,
        talents: 1,
        rankName: 'B'
    },
    {
        cost: 4,
        bonusIncrease: 1,
        skillRanks: 8,
        talents: 1.5,
        rankName: 'A'
    }
]

export default class Levels {
    @observable currentLevel: number;
    @observable levels: ILevelChoice[];
    @observable bab: number;
    @observable bmb: number;
    @observable skillRanks: number;
    @observable combatTalents: number;
    @observable magicTalents: number;
    @observable skillTalents: number;
    @observable statIncreases: number;

    constructor() {
        this.currentLevel = 0;
        this.levels = [];
        this.bab = 0;
        this.bmb = 0;
        this.skillRanks = 0;
        this.combatTalents = 0;
        this.magicTalents = 0;
        this.skillTalents = 0;
        this.statIncreases = 0;
    }

    @action levelUp(combatIndex: number, magicIndex: number, skillIndex: number) {
        if (combatIndex > levelBenefits.length || magicIndex > levelBenefits.length || skillIndex > levelBenefits.length) {
            throw new Error(`Benefits Array out-of-bounds:  ${combatIndex}, ${magicIndex}, ${skillIndex}`);
        } else if (combatIndex === 0 || magicIndex === 0 || skillIndex === 0) {
            throw new Error(`Benefit Indices must be positive:  ${combatIndex}, ${magicIndex}, ${skillIndex}`);
        } else if (levelBenefits[combatIndex].cost + levelBenefits[magicIndex].cost + levelBenefits[skillIndex].cost !== BENEFITS_PER_LEVEL) {
            throw new Error(`Benefit cost must add to ${BENEFITS_PER_LEVEL}:  ${levelBenefits[combatIndex].cost}, ${levelBenefits[magicIndex].cost}, ${levelBenefits[skillIndex].cost}`);
        }

        this.levels.push({combatIndex, magicIndex, skillIndex});
        this.calculateScores();
    }

    @action calculateScores() {
        let totalScores = this.levels.reduce((aggregate, nextLevel) => {
            return {
                bab: aggregate.bab + levelBenefits[nextLevel.combatIndex].bonusIncrease,
                bmb: aggregate.bmb + levelBenefits[nextLevel.magicIndex].bonusIncrease,
                skillRanks: aggregate.skillRanks + levelBenefits[nextLevel.skillIndex].skillRanks,
                combatTalents: aggregate.combatTalents + levelBenefits[nextLevel.combatIndex].talents,
                magicTalents: aggregate.magicTalents + levelBenefits[nextLevel.magicIndex].talents,
                skillTalents: aggregate.skillTalents + levelBenefits[nextLevel.skillIndex].talents,
            }
        }, {bab: 0, bmb: 0, skillRanks: 0, combatTalents: 0, magicTalents: 0, skillTalents: 0})

        this.bab = Math.floor(totalScores.bab);
        this.bmb = Math.floor(totalScores.bmb);
        this.skillRanks = totalScores.skillRanks;
        this.combatTalents = Math.floor(totalScores.combatTalents);
        this.magicTalents = Math.floor(totalScores.magicTalents);
        this.skillTalents = Math.floor(totalScores.skillTalents);
        this.statIncreases = Math.floor(this.levels.length / LEVELS_PER_ABILITY_SCORE_INCREASE);
        this.currentLevel = this.levels.length;
    }

    // getValue(abilityScore: AbilityScoreNames) {
    //     return this[abilityScore].value;
    // }

    // getBonus(abilityScore: AbilityScoreNames) {
    //     return this[abilityScore].bonus;
    // }

    // getJsonParsableAbilityScores() {
    //     return {
    //         str: this.STR.value,
    //         dex: this.DEX.value,
    //         con: this.CON.value,
    //         int: this.INT.value,
    //         wis: this.WIS.value,
    //         cha: this.CHA.value
    //     }
    // }

    // loadSavedAbilityScores(scores: any) {
    //     this.setAbilityScore(AbilityScoreNames.STR, scores.str);
    //     this.setAbilityScore(AbilityScoreNames.DEX, scores.dex);
    //     this.setAbilityScore(AbilityScoreNames.CON, scores.con);
    //     this.setAbilityScore(AbilityScoreNames.INT, scores.int);
    //     this.setAbilityScore(AbilityScoreNames.WIS, scores.wis);
    //     this.setAbilityScore(AbilityScoreNames.CHA, scores.cha);
    // }
  }
