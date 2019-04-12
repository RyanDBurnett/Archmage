import { observer } from 'mobx-react';
import * as React from 'react';
import '../generics/cards.scss';
import AbilityScores, {AbilityScoreNames as AS} from '@controllers/ability-scores/ability-scores';

interface IAbilityScoresCardProps {
    abilityScores: AbilityScores
}

interface IAbilityScoresCardState {
    isEditingEnabled: boolean
}

@observer export class AbilityScoresCard extends React.Component<IAbilityScoresCardProps, IAbilityScoresCardState> {
    constructor(props: IAbilityScoresCardProps) {
        super(props);
        this.state = {
            isEditingEnabled: false
        };
    }

    public render() {
        const {abilityScores} = this.props;
        const {isEditingEnabled} = this.state;
        return (
            <div className='card ability-scores-card'>
                <h1 className='title card__title'>AbilityScores</h1>

                <div className='button edit-mode-button'
                        onClick={() => this.setState({isEditingEnabled: !isEditingEnabled})}>
                    Toggle Editing
                </div>

                {Object.keys(AS).map((ability) => {
                    return (
                        <div className='card__data' key={ability}>
                            {this.state.isEditingEnabled ? 
                                <React.Fragment>
                                    <span className='card__field'>{ability}</span>
                                    <span className='card__data'>{abilityScores.getValue(ability as AS)}</span>
                                    <span className='card__data'>{abilityScores.getBonus(ability as AS)}</span>
                                    <button
                                        className='card__button card__decrement'
                                        onClick={() => abilityScores.setAbilityScore(ability as AS, abilityScores.getValue(ability as AS) - 1)}>
                                        -
                                    </button>
                                    <button
                                        className='card__button card__decrement'
                                        onClick={() => abilityScores.setAbilityScore(ability as AS, abilityScores.getValue(ability as AS) + 1)}>
                                        +
                                    </button>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <span className='card__field'>{ability}</span>
                                    <span className='card__data'>{abilityScores.getValue(ability as AS)}</span>
                                    <span className='card__data'>{abilityScores.getBonus(ability as AS)}</span>
                                </React.Fragment>
                            }
                        </div>
                    )
                }) }
            </div>
            
        );
    }
};