import { observer } from 'mobx-react';
import * as React from 'react';
import '../generics/cards.scss';
import { CardRow } from '../generics/card-row';
import Profile from '@controllers/profile/profile';

interface ICharacterProfileCardProps {
    profile: Profile
}

@observer export class CharacterProfileCard extends React.Component<ICharacterProfileCardProps, any> {
    constructor(props: ICharacterProfileCardProps) {
        super(props);
    }

    public render() {
        const {profile} = this.props;
        return (
            <React.Fragment>
                <CardRow
                    label='Name'
                    value={profile.name}
                    changeHandler={(e) => profile.setName(e)}
                    isEditable={true} />

                <CardRow
                    label='Gender'
                    value={profile.gender}
                    changeHandler={(e) => profile.setGender(e)}
                    isEditable={true} />

                <CardRow
                    label='Height'
                    value={profile.height}
                    changeHandler={(e) => profile.setHeight(e)}
                    isEditable={true} />

                <CardRow
                    label='Weight'
                    value={profile.weight}
                    changeHandler={(e) => profile.setWeight(e)}
                    isEditable={true} />

                <CardRow
                    label='Age'
                    value={profile.age}
                    changeHandler={(e) => profile.setAge(e)}
                    isEditable={true} />
            </React.Fragment>
        );
    }
};