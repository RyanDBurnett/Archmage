import { observer } from 'mobx-react';
import * as React from 'react';

interface ICharacterEditorProps {
    store: any
}

@observer export class CharacterEditor extends React.Component<ICharacterEditorProps> {
    public render() {
        return (
            <input type='text' value={this.props.store.characterName} onChange={(event) => this.props.store.characterName = event.target.value} />
        );
    }
};