import anyTest, { beforeEach, TestInterface } from "ava";
import AbilityScores, {AbilityScoreNames} from "./ability-scores";

const test = anyTest as TestInterface<{ AbilityScores: AbilityScores }>;

beforeEach(t => {
  t.context = { AbilityScores: new AbilityScores() };
});

test("AbilityScores: Get Defaults", async t => {
  const abilityScores = t.context.AbilityScores;

  const DEFAULT_AbilityScore_VALUE = 10;
  const DEFAULT_AbilityScore_BONUS = 0;

  t.is(abilityScores[AbilityScoreNames.STR].value, DEFAULT_AbilityScore_VALUE);
  t.is(abilityScores[AbilityScoreNames.STR].bonus, DEFAULT_AbilityScore_BONUS);
});

test("AbilityScores: Set AbilityScore", async t => {
    const abilityScores = t.context.AbilityScores;
  
    const NEW_AbilityScore_VALUE = 18;
    const EXPECTED_AbilityScore_BONUS = 4;

    abilityScores.setAbilityScore(AbilityScoreNames.WIS, NEW_AbilityScore_VALUE);
  
    t.is(abilityScores[AbilityScoreNames.WIS].value, NEW_AbilityScore_VALUE);
    t.is(abilityScores[AbilityScoreNames.WIS].bonus, EXPECTED_AbilityScore_BONUS);
  });

  test("AbilityScores: Set AbilityScore -- Negative, Odd", async t => {
    const abilityScores = t.context.AbilityScores;
  
    const NEW_AbilityScore_VALUE = 7;
    const EXPECTED_AbilityScore_BONUS = -2;

    abilityScores.setAbilityScore(AbilityScoreNames.INT, NEW_AbilityScore_VALUE);
  
    t.is(abilityScores[AbilityScoreNames.INT].value, NEW_AbilityScore_VALUE);
    t.is(abilityScores[AbilityScoreNames.INT].bonus, EXPECTED_AbilityScore_BONUS);
  });