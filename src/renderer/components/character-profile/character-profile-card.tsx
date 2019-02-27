import { observer } from 'mobx-react';
import * as React from 'react';
import '../generics/cards.scss';
import { CardRow } from '../generics/card-row';
import Profile from '@controllers/profile/profile';

interface ICharacterProfileCardProps {
    profile: Profile
}

interface ICharacterProfileCardState {
    isEditingEnabled: boolean
}

@observer export class CharacterProfileCard extends React.Component<ICharacterProfileCardProps, ICharacterProfileCardState> {
    constructor(props: ICharacterProfileCardProps) {
        super(props);
        this.state = {
            isEditingEnabled: false
        };
    }

    public render() {
        const {profile} = this.props;
        const {isEditingEnabled} = this.state;
        return (
            <div className='card character-profile-card'>
                <h1 className='title card__title'>Profile</h1>

                <div className='button edit-mode-button'
                        onClick={() => this.setState({isEditingEnabled: !isEditingEnabled})}>
                    Toggle Editing
                </div>

                <CardRow
                    label='Name'
                    value={profile.name}
                    changeHandler={(e) => profile.setName(e)}
                    isEditable={isEditingEnabled} />

                <CardRow
                    label='Gender'
                    value={profile.gender}
                    changeHandler={(e) => profile.setGender(e)}
                    isEditable={isEditingEnabled} />

                <CardRow
                    label='Height'
                    value={profile.height}
                    changeHandler={(e) => profile.setHeight(e)}
                    isEditable={isEditingEnabled} />

                <CardRow
                    label='Weight'
                    value={profile.weight}
                    changeHandler={(e) => profile.setWeight(e)}
                    isEditable={isEditingEnabled} />

                <CardRow
                    label='Age'
                    value={profile.age}
                    changeHandler={(e) => profile.setAge(e)}
                    isEditable={isEditingEnabled} />
            </div>
            
        );
    }
};