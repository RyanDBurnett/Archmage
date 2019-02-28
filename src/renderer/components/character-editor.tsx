import { observer } from 'mobx-react';
import * as React from 'react';
import { CharacterProfileCard } from './character-profile/character-profile-card';
import { AttributesCard } from './attributes/attributes-card';
import Store from '@controllers/store';

interface ICharacterEditorProps {
    store: Store
}

@observer export class CharacterEditor extends React.Component<ICharacterEditorProps> {
    public render() {
        return (
            <React.Fragment>
                <div className='button save-button'
                        onClick={() => this.props.store.saveCharacter()}>
                    Save Character
                </div>

                <div className='button load-button'
                        onClick={() => this.props.store.loadCharacter()}>
                    Load Character
                </div>
                <CharacterProfileCard profile={this.props.store.profile} />
                <AttributesCard attributes={this.props.store.attributes} />
            </React.Fragment>
        );
    }
};