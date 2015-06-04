var chai = require('chai'),
	validator = require('../lib/validator');
var expect = chai.expect;

describe('A Validator', function () {
	it('will return no errors for valid numbers', function () {
		expect(validator(3)).to.be.empty;
	});

	it('will return error.nonpositive for not strictly positive numbers, like 0', function () {
		expect(validator(0)).to.be.deep.equal(['error.nonpositive']);
	});

	it('will return error.nonpositive for not strictly positive numbers, like -2', function () {
		expect(validator(-2)).to.be.deep.equal(['error.nonpositive']);
	});
});

//The technique of adding several tests for the same logic but using different inputs in order to expose 
//some duplication that drives our refactor is called triangulation

//our validator.js
module.exports = function (n) {
	if (n <= 0) {
		return ['error.nonpositive'];
	}
	return [];
};
