import { observer } from 'mobx-react';
import * as React from 'react';
import '../generics/cards.scss';
import Levels, {levelBenefits, ILevelBenefit, BENEFITS_PER_LEVEL} from '@controllers/levels/levels';

import './levels.scss';

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

    levelUp() {
        // @ts-ignore
        const currentCombatLevelIndex = document.getElementById('level-benefits-combat').value;
        // @ts-ignore
        const currentMagicLevelIndex = document.getElementById('level-benefits-magic').value;
        // @ts-ignore
        const currentSkillLevelIndex = document.getElementById('level-benefits-skills').value;

        this.props.levels.levelUp(currentCombatLevelIndex, currentMagicLevelIndex, currentSkillLevelIndex);
    }

    public render() {
        return (
            <React.Fragment>
                <div className='levels__benefits'>
                    <span
                        id='level-benefits-combat-label'
                        className='levels__benefits-label'
                    >
                        Combat
                    </span>
                    <input
                        type='range'
                        id='level-benefits-combat'
                        className='levels__benefit-selector'
                        min={0}
                        max={levelBenefits.length - 1}
                        onChange={() => this.updatePendingLevel()}
                        list='level-benefits-combat-labels'
                        defaultValue='0'
                    />
                    <datalist id='level-benefits-combat-labels'>
                        {levelBenefits.map((benefit, index) => {
                            return <option key={index} value={index}>{index}</option>
                        })}
                    </datalist>

                    <span
                        id='level-benefits-magic-label'
                        className='levels__benefits-label'
                    >
                        Magic
                    </span>
                    <input
                        type='range'
                        id='level-benefits-magic'
                        className='levels__benefit-selector'
                        min={0}
                        max={levelBenefits.length - 1}
                        onChange={() => this.updatePendingLevel()}
                        list='level-benefits-magic-labels'
                        defaultValue='0'
                    />
                    <datalist id='level-benefits-magic-labels'>
                        {levelBenefits.map((benefit, index) => {
                            return <option key={index} value={index}>{index}</option>
                        })}
                    </datalist>

                    <span
                        id='level-benefits-skills-label'
                        className='levels__benefits-label'
                    >
                        Skills
                    </span>
                    <input
                        type='range'
                        id='level-benefits-skills'
                        className='levels__benefit-selector'
                        min={0}
                        max={levelBenefits.length - 1}
                        onChange={() => this.updatePendingLevel()}
                        list='level-benefits-skills-labels'
                        defaultValue='0'
                    />
                    <datalist id='level-benefits-skills-labels'>
                        {levelBenefits.map((benefit, index) => {
                            return <option key={index} value={index}>{index}</option>
                        })}
                    </datalist>

                    <div 
                        className={'levels__benefits-cost '
                            + (this.state.pendingLevel.totalCost > BENEFITS_PER_LEVEL ? 'levels__benefits-cost--error' : '')}
                    >
                        Points Spent: {this.state.pendingLevel.totalCost} / {BENEFITS_PER_LEVEL}
                    </div>
                </div>

                <div className='levels__results'>
                    <span className='levels__results-label'>BAB:</span>
                    <span className='levels__results-current'>{this.props.levels.bab}</span>
                    <span className='levels__results-plus'>+</span>
                    <span className='levels__results-new'>{this.state.pendingLevel.combatBenefits.bonusIncrease}</span>
                    <span className='levels__results-arrow'>=></span>
                    <span className='levels__results-total'>{this.props.levels.bab + this.state.pendingLevel.combatBenefits.bonusIncrease}</span>
                    
                    <span className='levels__results-label'>Combat Talents:</span>
                    <span className='levels__results-current'>{this.props.levels.combatTalents}</span>
                    <span className='levels__results-plus'>+</span>
                    <span className='levels__results-new'>{this.state.pendingLevel.combatBenefits.talents}</span>
                    <span className='levels__results-arrow'>=></span>
                    <span className='levels__results-total'>{this.props.levels.combatTalents + this.state.pendingLevel.combatBenefits.talents}</span>
                    
                    <span className='levels__results-label'>BMB:</span>
                    <span className='levels__results-current'>{this.props.levels.bmb}</span>
                    <span className='levels__results-plus'>+</span>
                    <span className='levels__results-new'>{this.state.pendingLevel.magicBenefits.bonusIncrease}</span>
                    <span className='levels__results-arrow'>=></span>
                    <span className='levels__results-total'>{this.props.levels.bab + this.state.pendingLevel.magicBenefits.bonusIncrease}</span>
                    
                    <span className='levels__results-label'>Magic Talents:</span>
                    <span className='levels__results-current'>{this.props.levels.magicTalents}</span>
                    <span className='levels__results-plus'>+</span>
                    <span className='levels__results-new'>{this.state.pendingLevel.magicBenefits.talents}</span>
                    <span className='levels__results-arrow'>=></span>
                    <span className='levels__results-total'>{this.props.levels.magicTalents + this.state.pendingLevel.magicBenefits.talents}</span>

                    <span className='levels__results-label'>Skill Ranks:</span>
                    <span className='levels__results-current'>{this.props.levels.skillRanks}</span>
                    <span className='levels__results-plus'>+</span>
                    <span className='levels__results-new'>{this.state.pendingLevel.skillBenefits.skillRanks}</span>
                    <span className='levels__results-arrow'>=></span>
                    <span className='levels__results-total'>{this.props.levels.skillRanks + this.state.pendingLevel.skillBenefits.skillRanks}</span>

                    <span className='levels__results-label'>Skill Talents:</span>
                    <span className='levels__results-current'>{this.props.levels.skillTalents}</span>
                    <span className='levels__results-plus'>+</span>
                    <span className='levels__results-new'>{this.state.pendingLevel.skillBenefits.talents}</span>
                    <span className='levels__results-arrow'>=></span>
                    <span className='levels__results-total'>{this.props.levels.combatTalents + this.state.pendingLevel.skillBenefits.talents}</span>                    
                </div>

                <button
                    className={'levels__add-button ' + ((this.state.pendingLevel.totalCost === BENEFITS_PER_LEVEL) ? '' : 'level__add-button--error')}
                    onClick={() => {this.state.pendingLevel.totalCost === BENEFITS_PER_LEVEL && this.levelUp()}}
                >
                    Add Level
                </button>

                <div className='levels__history'>
                    {this.props.levels.levels.map((level, index) => {
                        return (
                            <div className='levels__past-level' key={index}>
                            Level {index + 1}: {level.combatIndex}, {level.magicIndex}, {level.skillIndex}
                            </div>
                        )
                    })}
                </div>
            </React.Fragment>
        );
    }
};