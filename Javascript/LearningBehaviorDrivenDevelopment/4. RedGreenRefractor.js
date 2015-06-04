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

//now lets refractor our test to avoid duplication
describe('A Validator', function() {
  it('will return no errors for valid numbers', function() {
    expect(validator(3)).to.be.empty;
  });

  describe('will return error.nonpositive for not strictly positive numbers:', function() {
    it('like 0', function() {
      expect(validator(0)).to.be.deep.equal(['error.nonpositive']);
    });

    it('like -2', function() {
      expect(validator(-2)).to.be.deep.equal(['error.nonpositive']);
    });
  });
});


//adding new rules and logic

//this code now only fails on number 15 because it has few of the rules
describe('A Validator', function () {
	it('will return no errors for valid numbers', function () {
		expect(validator(4)).to.be.empty;
	});

	describe('will return error.nonpositive for not strictly positive numbers:', function () {
		it('like 0', function () {
			expect(validator(0)).to.be.deep.equal(['error.nonpositive']);
		});

		it('like -2', function () {
			expect(validator(-2)).to.be.deep.equal(['error.nonpositive']);
		});
	});

	describe('will return error.three for numbers divisible with three', function () {
		it('like 3', function () {
			expect(validator(3)).to.be.deep.equal(['error.three']);
		});
		it('like 6', function () {
			expect(validator(6)).to.be.deep.equal(['error.three']);
		})
	})

	describe('will return error.five for divisible by 5 numbers:', function () {
		it('like 5', function () {
			expect(validator(5)).to.be.deep.equal(['error.five']);
		});

		it('like 10', function () {
			expect(validator(10)).to.be.deep.equal(['error.five']);
		});
	});
	it('will return one error for each rule the number violates', function () {
		expect(validator(15)).to.be.deep.equal(['error.three', 'error.five']);
	});
});

//so we should use include instead of equal
describe('A Validator', function () {
	it('will return no errors for valid numbers', function () {
		expect(validator(7)).to.be.empty;
	});

	describe('will include error.nonpositive for not strictly positive numbers:', function () {
		it('like 0', function () {
			expect(validator(0)).to.include('error.nonpositive');
		});

		it('like -2', function () {
			expect(validator(-2)).to.include('error.nonpositive');
		});
	});

	describe('will include error.three for divisible by 3 numbers:', function () {
		it('like 3', function () {
			expect(validator(3)).to.include('error.three');
		});

		it('like 15', function () {
			expect(validator(15)).to.include('error.three');
		});
	});

	describe('will include error.five for divisible by 5 numbers:', function () {
		it('like 5', function () {
			expect(validator(5)).to.include('error.five');
		});

		it('like 15', function () {
			expect(validator(15)).to.include('error.five');
		});
	});
});

//and our validator.js looks like this now
module.exports = function (n) {
	var result = [];
	if (n <= 0)
		result.push('error.nonpositive');
	if (n % 3 === 0)
		result.push('error.three');
	if (n % 5 === 0)
		result.push('error.five');
	return result;
};

//since a pattern emerged we extract each if statement like this
function nonPositiveValidationRule(n, result) {
  if (n <= 0)
    result.push('error.nonpositive');
}
function nonDivisibleBy3ValidationRule(n, result) {
  if (n % 3 === 0)
    result.push('error.three');
}
function nonDivisibleBy5ValidationRule(n, result) {
  if (n % 5 === 0)
    result.push('error.five');
}

module.exports = function (n) {
  var result = [];
  nonPositiveValidationRule(n, result);
  nonDivisibleBy3ValidationRule(n, result);
  nonDivisibleBy5ValidationRule(n, result);
  return result;
};

//and we can refractor it even more
function nonPositiveValidationRule(n, result) {
  if (n <= 0)
    result.push('error.nonpositive');
}
function makeNonDivisibleValidationRule(divisor, error) {
  return function(n, result) {
    if (n % divisor === 0)
      result.push(error);
  };
}
var nonDivisibleBy3ValidationRule = makeNonDivisibleValidationRule(3, 'error.three'),
    nonDivisibleBy5ValidationRule = makeNonDivisibleValidationRule(5, 'error.five');

module.exports = function (n) {
  var result = [];
  nonPositiveValidationRule(n, result);
  nonDivisibleBy3ValidationRule(n, result);
  nonDivisibleBy5ValidationRule(n, result);
  return result;
};
