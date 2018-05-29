#!/usr/bin/env node
/**
 * Process the data from NIST into a better format. You should never need to do this again, unless
 * the laws of physics change.
 */
const fs = require('fs');
const path = require('path');
const nist = require('./nist.json').data;

const average = nums => nums.reduce((x, acc) => x + acc, 0) / nums.length;

function parseWeight(weight) {
	if (!weight) {
		return null;
	} else if (weight.startsWith('[') && weight.endsWith(']')) {
		weight = weight.slice(1, -1);
		if (weight.includes(',')) {
			return average(weight.split(',').map(x => parseFloat(x, 10)));
		}
		// weight is parsed below
	} else if (weight.endsWith(')')) {
		weight = weight.split('(')[0];
	}
	return parseFloat(weight, 10) || null;
}

const weights = {};

nist.forEach(element => {
	weights[element['Atomic Symbol']] = parseWeight(element['Standard Atomic Weight']);
});

fs.writeFileSync(path.resolve(__dirname, 'weights.json'), JSON.stringify(weights, null, 2));
