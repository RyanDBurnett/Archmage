import test from 'ava';

const fn = async () => Promise.resolve('foo');

test('does store work', async t => {
	t.is(await fn(), 'foo');
});