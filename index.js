'use strict';

var objectPath = require('object-path');

var least = {};

/**
 * Returns a function which expects to receive a `value` and assigns that
 * value to the target property path on the given target object.
 *
 * The function returns the target object.
 *
 * @param {object} target The object to assign to
 * @param {string} targetProperty The object path of the property to assign to
 * @returns {Function}
 */
least.assign = function(target, targetProperty) {
  return function(value) {
    objectPath.set(target, targetProperty, value);

    return target;
  };
};

/**
 * Returns a function which expects to receive a `source` object and assigns
 * the value located at the given sourceProperty object path on the source
 * object to the targetProperty object path on the target object.
 *
 * The function returns the target object.
 *
 * @param {string} sourceProperty The object path of the value to extract
 * @param {object} target The target object for assignment
 * @param {string} targetProperty The object path of the property to assign
 * @returns {Function}
 */
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

/**
 * Returns a function which expects to receive an accumulator and a source
 * object and pushes the value at the sourceProperty object path on the source
 * object onto the accumulator.
 *
 * If the accumulator is null, an empty array will be created.
 *
 * The function returns the accumulator.
 *
 * @param sourceProperty
 * @returns {Function}
 */
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
