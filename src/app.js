'use strict';

/** Define main module and:
 1. Load the module which handles the templates of all the components
 2. Load any additional dependencies
*/
require('../build/templates.js');
require('./test-component/test');

// @ifdef FAKE_BACKEND
require('./backend');
// @endif

/**
 * [dependencies List of dependent modules for this app]
 * @type {Array}
 */
var dependencies = [
  'templates',
  'test-component'
];

// @ifdef FAKE_BACKEND
dependencies.push('backend');
// @endif

angular.module('app', dependencies);
