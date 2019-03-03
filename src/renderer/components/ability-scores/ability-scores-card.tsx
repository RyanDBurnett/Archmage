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
                        <div key={ability}>
                            <span>{ability}</span>
                            <span>{abilityScores.getValue(AS[ability as AS])}</span>
                            <span>{abilityScores.getBonus(ability as AS)}</span>
                        </div>
                    );
                }) }
            </div>
            
        );
    }
};