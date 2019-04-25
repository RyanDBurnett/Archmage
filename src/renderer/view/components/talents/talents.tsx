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
    currentCategory: SphereCategories,
    expandedSpheres: string[],
    expandedTalents: string[]
}

@observer export class TalentsCard extends React.Component<ITalentsCardProps, ITalentsCardState> {
    constructor(props: ITalentsCardProps) {
        super(props);
        this.state = {
            // I tried to do 'first', but Enums don't have that.  Regardless, this choice is completely arbitary,
            // there just needs to be *something* here.
            currentCategory: SphereCategories.combat,
            expandedSpheres: [],
            expandedTalents: []
        }
    }

    toggleSphereDisplay(sphereName: string) {
        let newSpheres = this.state.expandedSpheres;
        if (this.state.expandedSpheres.includes(sphereName)) {
            newSpheres = newSpheres.filter((el) => el !== sphereName);
        } else {
            newSpheres.push(sphereName);
        }

        this.setState({expandedSpheres: newSpheres});
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
                
                {this.props.talents.spheres[this.state.currentCategory] ?
                    <div className='talents__sphere-container'>
                        {this.props.talents.spheres[this.state.currentCategory].map((sphere) => {
                            return (
                                <div className='talents__sphere' key={sphere.name}>
                                    <div className='talents__sphere-name' onClick={() => this.toggleSphereDisplay(sphere.name)}>{sphere.name}</div>
                                    <div className='talents__talent-container' hidden={!this.state.expandedSpheres.includes(sphere.name)}>
                                        {sphere.talents.map((talent) => {
                                            return (
                                                <div className='talents__talent' key={talent.id}>
                                                    {talent.name}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                : <div>Cannot find spheres for this category.</div>
                }
            </React.Fragment>
        );
    }
};