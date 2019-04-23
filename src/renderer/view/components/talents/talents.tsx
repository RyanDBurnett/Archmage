import { observer } from 'mobx-react';
import * as React from 'react';
import '../generics/cards.scss';

import './talents.scss';

import Talents from '@controllers/talents/talents';
import { SphereCategories } from '@controllers/talents/sphere-parser';

interface ITalentsCardProps {
    talents: Talents
}

interface ITalentsCardState {
    currentCategory: SphereCategories
}

@observer export class TalentsCard extends React.Component<ITalentsCardProps, ITalentsCardState> {
    constructor(props: ITalentsCardProps) {
        super(props);
        this.state = {
            // I tried to do 'first', but Enums don't have that.  Regardless, this choice is completely arbitary,
            // there just needs to be *something* here.
            currentCategory: SphereCategories.combat
        }
    }

    public render() {
        return (
            <React.Fragment>
                <div className='talents__category-container'>
                    {Object.keys(SphereCategories).map((key) => {
                        return (
                            <div
                                className={'talents__category talents__category--' + key}
                                key={key}
                                onClick={() => this.setState({currentCategory: SphereCategories[key as keyof typeof SphereCategories]})}
                            >
                                {key}
                            </div>
                        );
                    })}
                </div>
            </React.Fragment>
        );
    }
};