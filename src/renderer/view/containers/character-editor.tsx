import { observer } from 'mobx-react';
import * as React from 'react';
import { CharacterProfileCard } from '../components/character-profile/character-profile-card';
import { AbilityScoresCard } from '../components/ability-scores/ability-scores-card';
import { OverviewCard } from '../components/Overview/Overview-card';
import Store from '@controllers/store';
import {EditorViews} from '../../shared/consts';

import * as FlipMove from 'react-flip-move';

import './character-editor.scss';
import { LevelsCard } from 'view/components/levels/levels';
import { TalentsCard } from 'view/components/talents/talents';

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
                    <FlipMove>
                        {Object.keys(EditorViews)
                            .sort((first, second) => {
                                if ((EditorViews[first as keyof typeof EditorViews]) !== this.props.store.currentEditorView) {
                                    return 1;
                                } else if ((EditorViews[second as keyof typeof EditorViews]) !== this.props.store.currentEditorView) {
                                    return -1;
                                } else {
                                    return 0;
                                }
                            })
                            .map((view) => {
                                const isCurrentView = ((EditorViews[view as keyof typeof EditorViews]) === this.props.store.currentEditorView)
                                return (
                                    <div
                                        key={view}
                                        className={'nav-bar__ribbon ' + view.toString()}
                                        id={view}
                                        onClick={isCurrentView 
                                            ? () => {} 
                                            : () => this.props.store.changeView(EditorViews[view as keyof typeof EditorViews])
                                        }>
                                            <span className='nav-bar__ribbon-label'>
                                                {EditorViews[view as keyof typeof EditorViews]}
                                            </span>

                                            <span className='nav-bar__ribbon-title'>
                                                {EditorViews[view as keyof typeof EditorViews]}
                                            </span>
                                            
                                    </div>
                                )
                            }
                        )}
                    </FlipMove>
                </div>

                <div className='nav-bar__controls'>
                    <div className='nav-bar__ribbon save-button'
                        onClick={() => this.props.store.saveCharacter()}
                    >
                        <span className='nav-bar__ribbon-label'>
                            Save Character
                        </span>
                    </div>

                    <div className='nav-bar__ribbon load-button'
                        onClick={() => this.props.store.loadCharacter()}
                    >
                        <span className='nav-bar__ribbon-label'>
                            Load Character
                        </span>
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
        let pageContent = null;
        switch (this.props.store.currentEditorView){
            case EditorViews.AbilityScores:
                pageContent = <AbilityScoresCard abilityScores={this.props.store.abilityScores} />
                break;
            case EditorViews.Profile:
                pageContent = <CharacterProfileCard profile={this.props.store.profile} />
                break;
            case EditorViews.Overview:
                pageContent = <OverviewCard profile={this.props.store.profile} abilityScores={this.props.store.abilityScores} />
                break;
            case EditorViews.Levels:
                pageContent = <LevelsCard levels={this.props.store.levels} />
                break;
            case EditorViews.Talents:
                pageContent = <TalentsCard talents={this.props.store.talents} />
                break;
        }

        return (
            <React.Fragment>
                {pageContent}
            </React.Fragment>
        );
    }
};