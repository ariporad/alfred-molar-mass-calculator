import test from 'ava';
import alfyTest from 'alfy-test';

const tests = ['NaOH', 'H2O', 'H2O2', 'CO2', 'CO', 'NaCl'];

async function macro(t, input) {
	const alfy = alfyTest();
	const result = await alfy(input);

	t.snapshot(result);
}
macro.title = (providedTitle, input) => input;

tests.forEach(input => test(macro, input));
