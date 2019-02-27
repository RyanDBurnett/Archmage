import anyTest, { beforeEach, TestInterface } from "ava";
import Profile from "./profile";

const test = anyTest as TestInterface<{ profile: Profile }>;

beforeEach(t => {
  t.context = { profile: new Profile() };
});

test("Profile: Set Name", async t => {
  const profile = t.context.profile;
  const TEST_CHAR_NAME = "foo";

  t.is(profile.name, "");

  profile.setName(TEST_CHAR_NAME);
  t.is(profile.name, TEST_CHAR_NAME);
});

test("Profile: Set Gender", async t => {
  const profile = t.context.profile;
  const TEST_CHAR_GENDER = "foo";

  t.is(profile.gender, "");

  profile.setGender(TEST_CHAR_GENDER);
  t.is(profile.gender, TEST_CHAR_GENDER);
});

test("Profile: Set Age", async t => {
  const profile = t.context.profile;
  const TEST_CHAR_AGE = "foo";

  t.is(profile.age, "");

  profile.setAge(TEST_CHAR_AGE);
  t.is(profile.age, TEST_CHAR_AGE);
});

test("Profile: Set Height", async t => {
  const profile = t.context.profile;
  const TEST_CHAR_HEIGHT = "foo";

  t.is(profile.height, "");

  profile.setHeight(TEST_CHAR_HEIGHT);
  t.is(profile.height, TEST_CHAR_HEIGHT);
});

test("Profile: Set Weight", async t => {
  const profile = t.context.profile;
  const TEST_CHAR_WEIGHT = "foo";

  t.is(profile.weight, "");

  profile.setWeight(TEST_CHAR_WEIGHT);
  t.is(profile.weight, TEST_CHAR_WEIGHT);
});
