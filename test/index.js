'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var sinon = require('sinon');

describe('least', function() {
  var least;
  var objectPath;
  var source;
  var target;
  var value;

  beforeEach(function() {
    objectPath = { get: sinon.stub(), set: sinon.stub() };
    source = {};
    target = {};
    value = {};

    least = proxyquire('../index', {'object-path': objectPath});
  });

  describe('assign', function() {
    it('should set the target property based on the given value', function() {
      least.assign(target, 'target-property')(value);

      objectPath.set.callCount.should.equal(1);
      should(objectPath.set.args[0][0]).equal(target);
      should(objectPath.set.args[0][1]).equal('target-property');
      should(objectPath.set.args[0][2]).equal(value);
    });

    it('should return the target object', function() {
      should(least.assign(target, 'target-property')(value)).equal(target);
    });
  });

  describe('pluckAndAssign', function() {
    it(
      'should set the target property based on the source property',
      function() {
        var getResult = { };

        objectPath.get.returns(getResult);

        least.pluckAndAssign(
          'source-property', target, 'target-property'
        )(source);

        objectPath.get.callCount.should.equal(1);
        should(objectPath.get.args[0][0]).equal(source);
        should(objectPath.get.args[0][1]).equal('source-property');

        objectPath.set.callCount.should.equal(1);
        should(objectPath.set.args[0][0]).equal(target);
        should(objectPath.set.args[0][1]).equal('target-property');
        should(objectPath.set.args[0][2]).equal(getResult);
      }
    );

    it('should return the target object', function() {
      should(
        least.pluckAndAssign(
          'source-property',
          target,
          'target-property'
        )(source)
      ).equal(target);
    });
  });

  describe('accumulate', function() {
    var getResult;

    beforeEach(function() {
      getResult = {};

      objectPath.get.returns(getResult);
    });

    it('should add the source property value to the accumulator', function() {
      var accumulator = [];

      least.accumulate('source-property')(accumulator, source);

      should(accumulator.length).equal(1);
      should(accumulator[0]).equal(getResult);
    });

    it('should create an array if no accumulator is provided', function() {
      var result;

      result = least.accumulate('source-property')(null, source);

      should(Array.isArray(result)).equal(true);
      should(result.length).equal(1);
      should(result[0]).equal(getResult);
    });

    it('should return the accumulator', function() {
      var accumulator = [];

      should(
        least.accumulate('source-property')(accumulator, source)
      ).equal(accumulator);
    });
  });
});
