import anyTest, { beforeEach, TestInterface } from "ava";
import AbilityScores, {AbilityScoreNames as AS} from "./ability-scores";

const test = anyTest as TestInterface<{ AbilityScores: AbilityScores }>;

beforeEach(t => {
  t.context = { AbilityScores: new AbilityScores() };
});

test("AbilityScores: Get Defaults", async t => {
  const abilityScores = t.context.AbilityScores;

  const DEFAULT_ABILITY_SCORE_VALUE = 10;
  const DEFAULT_ABILITY_SCORE_BONUS = 0;

  t.is(abilityScores.getValue(AS.STR), DEFAULT_ABILITY_SCORE_VALUE);
  t.is(abilityScores.getBonus(AS.STR), DEFAULT_ABILITY_SCORE_BONUS);
});

test("AbilityScores: Set AbilityScore", async t => {
    const abilityScores = t.context.AbilityScores;
  
    const NEW_ABILITY_SCORE_VALUE = 18;
    const EXPECTED_ABILITY_SCORE_BONUS = 4;

    abilityScores.setAbilityScore(AS.WIS, NEW_ABILITY_SCORE_VALUE);
  
    t.is(abilityScores.getValue(AS.WIS), NEW_ABILITY_SCORE_VALUE);
    t.is(abilityScores.getBonus(AS.WIS), EXPECTED_ABILITY_SCORE_BONUS);
  });

  test("AbilityScores: Set AbilityScore -- Negative, Odd", async t => {
    const abilityScores = t.context.AbilityScores;
  
    const NEW_ABILITY_SCORE_VALUE = 7;
    const EXPECTED_ABILITY_SCORE_BONUS = -2;

    abilityScores.setAbilityScore(AS.INT, NEW_ABILITY_SCORE_VALUE);
  
    t.is(abilityScores.getValue(AS.INT), NEW_ABILITY_SCORE_VALUE);
    t.is(abilityScores.getBonus(AS.INT), EXPECTED_ABILITY_SCORE_BONUS);
  });