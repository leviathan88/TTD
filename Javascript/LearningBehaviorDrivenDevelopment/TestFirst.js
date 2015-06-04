var assert = require('assert');

//The describe function creates a new test suite for Mocha. 
//A test suite is just a grouping of test cases with a nice description
describe('A Validator', function() {

});

//Like describe, the it function takes a description of the actual test case, which will be used in the test report, and
//a function with the code of the test. This is a common pattern in Mocha. Unlike describe, the it function cannot be nested.
describe('A Validator', function () {
	it('will return error.nonpositive for not strictly positive numbers', function () {
		assert.deepEqual(validator(0), ['error.nonpositive']);
	});
});

//runing the test above would tell us that there is validator function does not exist, we solve that like this
var assert = require('assert');
function validator() {
  
}
describe('A Validator', function () {
	it('will return error.nonpositive for not strictly positive numbers', function () {
		assert.deepEqual(validator(0), ['error.nonpositive']);
	});
});
//now it fails, and we should now make it pass so we insert the passing code
function validator(0 {
  return ['error.nonpositive'];
})

//now we will move our function to validator.js and edit it like this
module.exports = function () {
	return ['error.nonpositive'];
}
//and in our test file we will reference it like this
var validator = require('../lib/validator');
