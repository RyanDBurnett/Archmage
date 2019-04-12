import { observer } from 'mobx-react';
import * as React from 'react';
import '../generics/cards.scss';
import { CardRow } from '../generics/card-row';
import Profile from '@controllers/profile/profile';
import AbilityScores, {AbilityScoreNames as AS} from '@controllers/ability-scores/ability-scores';

import './overview.scss';

interface IOverviewCardProps {
    profile: Profile,
    abilityScores: AbilityScores
}

@observer export class OverviewCard extends React.Component<IOverviewCardProps, any> {
    constructor(props: IOverviewCardProps) {
        super(props);
    }

    public render() {
        const {profile, abilityScores} = this.props;
        return (
            <React.Fragment>
                <h1>Profile</h1>

                <CardRow
                    label='Name'
                    value={profile.name}
                    changeHandler={(e) => profile.setName(e)}
                    isEditable={false} />

                <CardRow
                    label='Gender'
                    value={profile.gender}
                    changeHandler={(e) => profile.setGender(e)}
                    isEditable={false} />

                <CardRow
                    label='Height'
                    value={profile.height}
                    changeHandler={(e) => profile.setHeight(e)}
                    isEditable={false} />

                <CardRow
                    label='Weight'
                    value={profile.weight}
                    changeHandler={(e) => profile.setWeight(e)}
                    isEditable={false} />

                <CardRow
                    label='Age'
                    value={profile.age}
                    changeHandler={(e) => profile.setAge(e)}
                    isEditable={false} />

                <h1>Ability Scores</h1>

                {Object.keys(AS).map((ability) => {
                    return (
                        <React.Fragment key={ability}>
                            <div className='ability-score'>
                                <span className='card__field'>{ability}</span>
                                <span className='card__data'>{abilityScores.getValue(ability as AS)}</span>
                                <span className='card__data'>{abilityScores.getBonus(ability as AS)}</span>
                            </div>

                        </React.Fragment>
                    )
                })}
            </React.Fragment>
        );
    }
};