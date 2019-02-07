import { observer } from 'mobx-react';
import * as React from 'react';
import { CharacterProfileCard } from './character-profile/character-profile-card';
import Store from '@controllers/store';

interface ICharacterEditorProps {
    store: Store
}

@observer export class CharacterEditor extends React.Component<ICharacterEditorProps> {
    public render() {
        return (
            <CharacterProfileCard profile={this.props.store.profile} />
        );
    }
};