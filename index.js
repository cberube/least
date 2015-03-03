'use strict';

var objectPath = require('object-path');

var least = {};

least.assign = function(target, targetProperty) {
  return function(value) {
    objectPath.set(target, targetProperty, value);

    return target;
  };
};

least.pluckAndAssign = function(sourceProperty, target, targetProperty) {
  return function(source) {
    objectPath.set(
      target,
      targetProperty,
      objectPath.get(source, sourceProperty)
    );

    return target;
  };
};

least.accumulate = function(sourceProperty) {
  return function(accumulator, source) {
    if (!accumulator) {
      accumulator = [];
    }

    accumulator.push(objectPath.get(source, sourceProperty));

    return accumulator;
  };
};

module.exports = least;
