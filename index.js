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
 * @param {string} targetPath The object path of the property to assign to
 * @returns {Function}
 */
least.assign = function(target, targetPath) {
  return function(value) {
    objectPath.set(target, targetPath, value);

    return target;
  };
};

/**
 * Returns a function which expects to receive a `source` object and assigns
 * the value located at the given sourcePath object path on the source
 * object to the targetPath object path on the target object.
 *
 * The function returns the target object.
 *
 * @param {string} sourcePath The object path of the value to extract
 * @param {object} target The target object for assignment
 * @param {string} targetPath The object path of the property to assign
 * @returns {Function}
 */
least.pluckAndAssign = function(sourcePath, target, targetPath) {
  return function(source) {
    objectPath.set(
      target,
      targetPath,
      objectPath.get(source, sourcePath)
    );

    return target;
  };
};

/**
 * Returns a function which expects to receive an accumulator and a source
 * object and pushes the value at the sourcePath object path on the source
 * object onto the accumulator.
 *
 * If the accumulator is null, an empty array will be created.
 *
 * The function returns the accumulator.
 *
 * @param sourcePath
 * @returns {Function}
 */
least.accumulate = function(sourcePath) {
  return function(accumulator, source) {
    if (!accumulator) {
      accumulator = [];
    }

    accumulator.push(objectPath.get(source, sourcePath));

    return accumulator;
  };
};

module.exports = least;
