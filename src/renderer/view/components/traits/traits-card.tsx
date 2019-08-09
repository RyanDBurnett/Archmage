
import * as React from 'react';
import { AbilityScoreNames } from '@controllers/ability-scores/ability-scores';
import { observer } from 'mobx-react';

interface ITraitsProps {

}

const TraitsCard = observer((props: ITraitsProps) => {
    return (
        <React.Fragment>
            {renderTraitFilterControls()}
        </React.Fragment>
    );
});

const renderTraitFilterControls = () => {
    return (
        <React.Fragment>
            <select id='trait-filter__ability-score-selector' className='trait-filter__ability-score-selector'>
                {Object.keys(AbilityScoreNames).map((abilityScore: string) => 
                    <option 
                        key={abilityScore}
                        value={AbilityScoreNames[abilityScore as keyof typeof AbilityScoreNames]}>
                            {abilityScore}
                    </option>
                )}
            </select>

            <input type='number' defaultValue='0' id='trait-filter__ability-score-value' className='trait-filter__ability-score-value'></input>
        </React.Fragment>
    );
};

// 'Observer' wraps the purely functional rendering function in a React Component class
// which is very non-functional, but is also black-boxed from us and makes rendering way
// easier, so I'll look the other way for now.

// Re-consider Redux?
export default TraitsCard;