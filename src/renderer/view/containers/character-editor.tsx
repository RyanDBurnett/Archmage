import { observer } from 'mobx-react';
import * as React from 'react';
import { CharacterProfileCard } from '../components/character-profile/character-profile-card';
import { AbilityScoresCard } from '../components/ability-scores/ability-scores-card';
import Store from '@controllers/store';
import {EditorViews} from '../../shared/consts';

import './character-editor.scss';

interface ICharacterEditorProps {
    store: Store
}

interface ICharacterEditorState {
    isNavRibbonExpanded: boolean
}

@observer export class CharacterEditor extends React.Component<ICharacterEditorProps, ICharacterEditorState> {
    constructor(props: ICharacterEditorProps) {
        super(props);
        this.state = {
            isNavRibbonExpanded: false
        }
    }

    public render() {
        return (
            <div className='app'>
                <div className='nav-bar'>
                    {this.renderNavBarRibbons()}
                </div>

                <div className='editor'>
                    {this.renderCurrentCard()}
                </div>
            </div>
        );
    }

    private renderNavBarRibbons() {
        return (
            <React.Fragment>
                <div className='nav-bar__pages'>
                    {Object.keys(EditorViews).map((view) => {
                        return (
                            <div
                                    key={view}
                                    className='nav-bar__ribbon'
                                    id={view}
                                    onClick={() => this.props.store.changeView(EditorViews[view as keyof typeof EditorViews])}>
                                {EditorViews[view as keyof typeof EditorViews]}
                            </div>
                        )
                    })}
                </div>

                <div className='nav-bar__controls'>
                    <div className='nav-bar__ribbon save-button'
                            onClick={() => this.props.store.saveCharacter()}>
                        Save Character
                    </div>

                    <div className='nav-bar__ribbon load-button'
                            onClick={() => this.props.store.loadCharacter()}>
                        Load Character
                    </div>

                    {/* <div className={'nav-bar__ribbon ' + (this.state.isNavRibbonExpanded ? 'retract-button' : 'expand-button')}
                            onClick={() => this.setState({isNavRibbonExpanded: !this.state.isNavRibbonExpanded})}>
                        {this.state.isNavRibbonExpanded ? '<' : '>'}
                    </div> */}
                </div>
            </React.Fragment>
        );
    }

    private renderCurrentCard() {
        switch (this.props.store.currentEditorView){
            case EditorViews.AbilityScores:
                return <AbilityScoresCard abilityScores={this.props.store.abilityScores} />
            case EditorViews.Profile:
                return <CharacterProfileCard profile={this.props.store.profile} />
            default:
                return null;
        }
    }
};