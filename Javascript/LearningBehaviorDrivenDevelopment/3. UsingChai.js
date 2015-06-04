//so now we use Chai with Mocha, and we remove Assert
var chai = require('chai'),
	validator = require('../lib/validator');

var expect = chai.expect;

describe('A Validator', function () {
	it('will return error.nonpositive for not strictly positive numbers', function () {
		expect(validator(0)).to.be.deep.equal(['error.nonpositive']);
	});
});
