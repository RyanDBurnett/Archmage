import { observer } from 'mobx-react';
import * as React from 'react';
import '../generics/cards.scss';

import './talents.scss';

import TalentCollection, {ISpherePlaceholder} from '@controllers/talents/talent-collection';
import { SphereCategories, ISphere } from '@controllers/talents/talent-library';

interface ITalentsCardProps {
    playerTalents: TalentCollection
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

    private renderSphereCollection(spheres: ISpherePlaceholder[]) {
        if (spheres.length === 0) {
            return (<div>Cannot find spheres for this category.</div>);
        }
        const fullSpheres = spheres.map((sphere) => this.props.playerTalents.talentLibrary.getSphereById(sphere.id));

        return (
            <React.Fragment>
                <div className='talents__sphere-container'>
                    {fullSpheres.map((sphere) => this.renderSphere(sphere))}
                </div>
            </React.Fragment>
        );
    }

    private renderSphere(sphere: ISphere) {
        const isSphereExpanded = this.state.expandedSpheres.includes(sphere.id);
        return (
            <div className='talents__sphere' key={sphere.id}>
                <div className='talents__sphere-controls'>
                    <span className='talents__sphere-name'>{sphere.id}</span>
                    <span
                        className={'talents__sphere-expand talents__sphere-expand--' + (isSphereExpanded ? 'collapse' : 'expand')}
                        onClick={() => this.toggleSphereDisplay(sphere.id)}
                    >
                        ︾
                    </span>
                </div>
                <div className='talents__talent-container' hidden={!isSphereExpanded}>
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
                
                {this.renderSphereCollection(this.props.playerTalents.sphereCollection[this.state.currentCategory])}
                
                <div className='hr'></div>

                {this.renderSphereCollection(
                    this.props.playerTalents.talentLibrary.getSpheresInCategory(this.state.currentCategory)
                        .map(this.props.playerTalents.talentLibrary.convertSphereToSpherePlaceholder))}
            </React.Fragment>
        );
    }
};