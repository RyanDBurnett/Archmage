import { observer } from 'mobx-react';
import * as React from 'react';
import '../generics/cards.scss';
import AbilityScores, {AbilityScoreNames as AS} from '@controllers/ability-scores/ability-scores';

interface IAbilityScoresCardProps {
    abilityScores: AbilityScores
}

@observer export class AbilityScoresCard extends React.Component<IAbilityScoresCardProps, any> {
    constructor(props: IAbilityScoresCardProps) {
        super(props);
    }

    public render() {
        const {abilityScores} = this.props;
        return (
            <React.Fragment>
                {Object.keys(AS).map((ability) => {
                    return (
                        <div className='card__data' key={ability}>
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
                        </div>
                    )
                })}
            </React.Fragment>
        );
    }
};