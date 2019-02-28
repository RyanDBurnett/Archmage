import { observer } from 'mobx-react';
import * as React from 'react';
import '../generics/cards.scss';
import Attributes, {AttributeNames} from '@controllers/attributes/attributes';

interface IAttributesCardProps {
    attributes: Attributes
}

interface IAttributesCardState {
    isEditingEnabled: boolean
}

@observer export class AttributesCard extends React.Component<IAttributesCardProps, IAttributesCardState> {
    constructor(props: IAttributesCardProps) {
        super(props);
        this.state = {
            isEditingEnabled: false
        };
    }

    public render() {
        const {attributes} = this.props;
        const {isEditingEnabled} = this.state;
        return (
            <div className='card attributes-card'>
                <h1 className='title card__title'>Attributes</h1>

                <div className='button edit-mode-button'
                        onClick={() => this.setState({isEditingEnabled: !isEditingEnabled})}>
                    Toggle Editing
                </div>

                {Object.keys(AttributeNames).map((attribute) => {
                    return (
                        <div>
                            <span>{attribute}</span>
                            <span>{attributes[AttributeNames[attribute as keyof typeof AttributeNames]].value}</span>
                            <span>{attributes[AttributeNames[attribute as keyof typeof AttributeNames]].bonus}</span>
                        </div>
                    );
                }) }
            </div>
            
        );
    }
};