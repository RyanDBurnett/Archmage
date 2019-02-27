import anyTest, { beforeEach, TestInterface } from "ava";
import Attributes, {AttributeNames} from "./attributes";

const test = anyTest as TestInterface<{ attributes: Attributes }>;

beforeEach(t => {
  t.context = { attributes: new Attributes() };
});

test("Attributes: Get Defaults", async t => {
  const attributes = t.context.attributes;

  const DEFAULT_ATTRIBUTE_VALUE = 10;
  const DEFAULT_ATTRIBUTE_BONUS = 0;

  t.is(attributes[AttributeNames.STR].value, DEFAULT_ATTRIBUTE_VALUE);
  t.is(attributes[AttributeNames.STR].bonus, DEFAULT_ATTRIBUTE_BONUS);
});

test("Attributes: Set Attribute", async t => {
    const attributes = t.context.attributes;
  
    const NEW_ATTRIBUTE_VALUE = 18;
    const EXPECTED_ATTRIBUTE_BONUS = 4;

    attributes.setAttribute(AttributeNames.WIS, NEW_ATTRIBUTE_VALUE);
  
    t.is(attributes[AttributeNames.WIS].value, NEW_ATTRIBUTE_VALUE);
    t.is(attributes[AttributeNames.WIS].bonus, EXPECTED_ATTRIBUTE_BONUS);
  });

  test("Attributes: Set Attribute -- Negative, Odd", async t => {
    const attributes = t.context.attributes;
  
    const NEW_ATTRIBUTE_VALUE = 7;
    const EXPECTED_ATTRIBUTE_BONUS = -2;

    attributes.setAttribute(AttributeNames.INT, NEW_ATTRIBUTE_VALUE);
  
    t.is(attributes[AttributeNames.INT].value, NEW_ATTRIBUTE_VALUE);
    t.is(attributes[AttributeNames.INT].bonus, EXPECTED_ATTRIBUTE_BONUS);
  });