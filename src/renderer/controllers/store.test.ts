import test from 'ava';
import Store from './store';

test('can set character name', async (t) => {
    const store = new Store();
    const TEST_CHAR_NAME = 'foo';

    t.is(store.characterName, '');

    store.setCharacterName(TEST_CHAR_NAME);
    t.is(store.characterName, TEST_CHAR_NAME);
});