//so now we use Chai with Mocha, and we remove Assert
var chai = require('chai'),
	validator = require('../lib/validator');

var expect = chai.expect;

describe('A Validator', function () {
	it('will return error.nonpositive for not strictly positive numbers', function () {
		expect(validator(0)).to.be.deep.equal(['error.nonpositive']);
	});
});

/* EXPLAINING CHAI: 

In the test itself, we can see that we wrap the actual result of validator(0) using the expect function. 
This function will return a nice DSL that we can use to write nice and expressive assertions about the actual result.

This DSL is formed by particles that can be chained together. 
There are three kinds of particles: chains, assertions, and flags.

-Chains are particles that do not modify the behavior of the assertions but that provide expressivity. 
You can always add a "." to a chain to add another particle. In this example, we used the chains to and be, but we could have omitted them, and the test would have been exactly the same. Chains make our assertions easier to read. 
The to, be, been, is, that, and, has, have, with, at, of, and same particles are considered to be chains.

-Assertions are the particles that perform the actual check of the result. They are usually functions
that take one or more parameter with the expected result. In the example, we are using the equal assertion.

-Flags allow us to modify the behavior of the assertions. For example, the equal assertion just checks the value
using the === operator. However, if we use the deep flag, as we did in the example, the equal assertion will
instead check the contents of the actual result.Another useful flag is not; this will invert the assertion.

*/

//Other useful assertions are include or contain; both are the same
expect(['a', 5, 'cd']).to.contain(5);
expect('string').to.contain('tri');

//To perform a Boolean assertion, we can use the ok, true, or false particles. These assertions are not functions. 
expect(true).to.be.ok;
expect(1).to.be.ok;
expect(true).to.be.true;
expect(1).not.to.be.true;
expect('').not.to.be.ok;
expect(false).to.be.false;
expect(!true).to.be.false;
expect(!false).to.be.true;

//exist for undefined and null
expect(false).to.exist;
expect(null).not.to.exist;
expect(undefined).not.to.exist;

//If you wish to check for the type of the actual result, you could use the a or an assertion.
expect(null).to.be.a('null'); // Thanks Chai!
expect(null).to.be.null; // Of course
expect(undefined).to.be.an('undefined');
expect(undefined).to.be.undefined;
expect(Number).to.be.an('object');
expect(Number).to.be.a('function');
expect(true).to.be.a('boolean');
expect(3).to.be.a('number');
expect('John').to.be.a('string');

//For arrays, objects, and strings, we can use the empty assertion:
expect('').to.be.empty;
expect({}).to.be.empty;
expect([]).to.be.empty;

//To check numbers, we have several assertions, such as most, least, above, below, closeTo, and within.
expect(1).to.be.at.most(2);
expect(2).to.be.at.most(2);
expect(3).not.to.be.at.most(2);
expect(1).to.be.below(2);
expect(2).not.to.be.below(2);
expect(1).to.be.below(2);
expect(1).to.be.at.least(1);
expect(2).to.be.at.least(1);
expect(0).not.to.be.at.least(1);
expect(1).not.to.be.above(1);
expect(2).to.be.above(1);
expect(1).to.be.within(1, 3);
expect(2).to.be.within(1, 3);
expect(3).to.be.within(1, 3);
expect(4).not.to.be.within(1, 3);
expect(2.2).to.be.closeTo(2, 0.2);
expect(2.3).not.to.be.closeTo(2, 0.2);

// Sometimes, you would like to test whether a function throws an error
var fn = function() {
  validator(null);
};
expect(fn).to.throw('parameter');
expect(fn).to.throw(ValidatorError);
expect(fn).to.throw(new ValidatorError('Null is bad parameter'));
expect(fn).to.throw(/bad parameter/);

//Some particles, such as include and contain, can act as a flag or assertion
expect({ name: 'John', age: 32 }).to.include.keys('age');

//Another particle that can work as an assertion or a flag is length:
expect([1, 2, 3]).to.have.length(3);
expect([1, 2, 3]).to.have.length.of.at.least(2);
expect([1, 2, 3]).to.have.length.of.at.most(4);
expect([1, 2, 3]).to.have.length.within(2, 4);
expect([1, 2, 3]).to.have.length.greaterThan(2);

//We can merge several assertions in one as if we are using the and chain
expect(anArray).to.have.length(2);
expect(anArray).to.contain('element');
//would become
expect(anArray).to.have.length(2).and.to.contain('element');
