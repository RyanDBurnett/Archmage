import * as _ from "lodash/fp";
import { Maybe, createMaybe } from "../../shared/maybe";
import IO from "../../shared/io";
import { AbilityScoreNames } from '../ability-scores/ability-scores';

interface TraitRequirement{
    abilityScore: AbilityScoreNames,
    minimumAbilityScoreValue: number
}

function createTraitRequirement(abilityScore: AbilityScoreNames, minimumAbilityScoreValue: number) {
    // TODO: Integer restriction on value
    return {
        abilityScore,
        minimumAbilityScoreValue
    };
}

interface Trait {
    id: string,
    name: string,
    benefit: string,
    abilityScoreRequirements: TraitRequirement[]
}

function createTrait(id: string, name: string, benefit: string, abilityScoreRequirements: TraitRequirement[]) {
    return {
        id,
        name,
        benefit,
        abilityScoreRequirements
    }
}

const tough = createTrait(
    "toughness",
    "Toughness",
    "Get more HP",
    [
        createTraitRequirement(AbilityScoreNames.CON, 2),
        createTraitRequirement(AbilityScoreNames.STR, 4)
    ]
);

const hale = createTrait(
    "hale",
    "Hale",
    "Saves vs. Disease",
    [
        createTraitRequirement(AbilityScoreNames.CON, 2)
    ]
);

const stubborn = createTrait(
    "stubborn",
    "Stubborn",
    "Will Saves Up",
    [
        createTraitRequirement(AbilityScoreNames.WIS, 3),
        createTraitRequirement(AbilityScoreNames.LCK, 4)
    ]
)

function isTraitValidForStat(trait: Trait, abilityScore: AbilityScoreNames, abilityScoreValue: number) {
    const maybeMatchingTrait = getTraitRequirementForStat(trait, abilityScore);

    return maybeMatchingTrait.isValid
        && abilityScoreValue >= maybeMatchingTrait.value.minimumAbilityScoreValue;
}

function getTraitRequirementForStat(trait: Trait, stat: AbilityScoreNames): Maybe<TraitRequirement> {
    const requirementMatchesStat = (req: TraitRequirement, targetStat: AbilityScoreNames) => req.abilityScore === targetStat;
    const requirementMatchesTargetStat = _.partialRight(requirementMatchesStat, [stat]);
    const filter = _.filter(requirementMatchesTargetStat);
    const matchingRequirements = filter(trait.abilityScoreRequirements);
    // If there is no matchingRequirements[0] we should get an invalid maybe, as desired.
    return createMaybe(matchingRequirements[0]);
}

const traits = [tough, hale, stubborn];
const abilityScore = AbilityScoreNames.CON;
const abilityScoreValue = 4;

const getValidTraitsForScore = 
    _.filter(_.partialRight(isTraitValidForStat, [abilityScore, abilityScoreValue]));

const validTraits = getValidTraitsForScore(traits);
const logValidTraits = IO.from(() => console.log(validTraits));
logValidTraits.run();

// IO.from(log(getValidTraitsForScore(traits))).run()

