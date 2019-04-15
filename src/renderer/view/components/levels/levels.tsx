import { observer } from 'mobx-react';
import * as React from 'react';
import '../generics/cards.scss';
import Levels, {levelBenefits, ILevelBenefit} from '@controllers/levels/levels';

interface ILevelsCardProps {
    levels: Levels
}

interface ILevelsCardState {
    pendingLevel: {
        combatBenefits: ILevelBenefit,
        magicBenefits: ILevelBenefit,
        skillBenefits: ILevelBenefit,
        totalCost: number
    }
}

@observer export class LevelsCard extends React.Component<ILevelsCardProps, ILevelsCardState> {
    constructor(props: ILevelsCardProps) {
        super(props);
        this.state = {
            pendingLevel: {
                combatBenefits: levelBenefits[0],
                magicBenefits: levelBenefits[0],
                skillBenefits: levelBenefits[0],
                totalCost: -3
            }
        }
    }

    updatePendingLevel() {
        // @ts-ignore
        const currentCombatLevelIndex = document.getElementById('level-benefits-combat').value;
        // @ts-ignore
        const currentMagicLevelIndex = document.getElementById('level-benefits-magic').value;
        // @ts-ignore
        const currentSkillLevelIndex = document.getElementById('level-benefits-skills').value;

        this.setState({ pendingLevel: {
            combatBenefits: levelBenefits[currentCombatLevelIndex],
            magicBenefits: levelBenefits[currentMagicLevelIndex],
            skillBenefits: levelBenefits[currentSkillLevelIndex],
            totalCost: levelBenefits[currentCombatLevelIndex].cost
                + levelBenefits[currentMagicLevelIndex].cost
                + levelBenefits[currentSkillLevelIndex].cost
        }})
    }

    public render() {
        return (
            <React.Fragment>
                Combat
                <select 
                    className='level-benefit-selector'
                    id='level-benefits-combat'
                    onChange={() => this.updatePendingLevel()}
                    defaultValue={'0'}
                >
                    {levelBenefits.map((benefit, index) => {
                        return <option value={index} key={index}>{benefit.rankName}</option>
                    })}
                </select>

                Magic
                <select 
                    className='level-benefit-selector'
                    id='level-benefits-magic'
                    onChange={() => this.updatePendingLevel()}
                    defaultValue={'0'}
                >
                    {levelBenefits.map((benefit, index) => {
                        return <option value={index} key={index}>{benefit.rankName}</option>
                    })}
                </select>

                Skills
                <select 
                    className='level-benefit-selector'
                    id='level-benefits-skills'
                    onChange={() => this.updatePendingLevel()}
                    defaultValue={'0'}
                >
                    {levelBenefits.map((benefit, index) => {
                        return <option value={index} key={index}>{benefit.rankName}</option>
                    })}
                </select>

                <div>
                    Current Benefits:
                    <div>
                        BAB: {this.state.pendingLevel.combatBenefits.bonusIncrease}
                    </div>
                    <div>
                        Combat Talents: {this.state.pendingLevel.combatBenefits.talents}
                    </div>
                    <div>
                        BMB: {this.state.pendingLevel.magicBenefits.bonusIncrease}
                    </div>
                    <div>
                        Magic Talents: {this.state.pendingLevel.magicBenefits.bonusIncrease}
                    </div>
                    <div>
                        Skill Ranks: {this.state.pendingLevel.skillBenefits.skillRanks}
                    </div>
                    <div>
                        Skill Talents: {this.state.pendingLevel.skillBenefits.talents}
                    </div>
                    <div>
                        Points Spent: {this.state.pendingLevel.totalCost}
                    </div>

                    <button className={'level__add-button ' + ((this.state.pendingLevel.totalCost === 6) ? '' : 'level__add-button--error')}>
                        Add Level
                    </button>
                </div>
            </React.Fragment>
        );
    }
};