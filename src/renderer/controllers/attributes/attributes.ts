// import * as C from '@shared/const';
// import * as D from '@shared/debug';

import { observable, action } from 'mobx';

export enum AttributeNames {
    STR = 'strength',
    DEX = 'dexterity',
    CON = 'constitution',
    INT = 'intelligence',
    WIS = 'wisdom',
    CHA = 'charisma'
}

export interface IAttribute {
    value: number,
    // Bonus = value - 10 / 2, round down to integer (towards negative, not towards 0)
    // This is enforced via the 'set attribute' function below.
    bonus: number
} 

export default class Attributes {
    @observable strength: IAttribute
    @observable dexterity: IAttribute
    @observable constitution: IAttribute
    @observable intelligence: IAttribute
    @observable wisdom: IAttribute
    @observable charisma: IAttribute

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

    @action setAttribute(attributeName: AttributeNames, value: number) {
        this[attributeName] = {
            value,
            bonus: Math.floor((value - 10) / 2)
        }
    }
  }
