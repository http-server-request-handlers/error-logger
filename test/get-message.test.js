/* eslint global-require: off */

'use strict'

var getMessage = require( '../src/get-message' )
var tap = require( 'tap' )

tap.test( 'getMessage for minimum res when NODE_ENV is set to development',
  function ( t ) {
    var err = new Error( 'oops!' )
    var res = require( './fixtures/res-minimum' )
    var actual = getMessage( err, res, 'development' )

    t.match( actual, '<pre>Error: oops!', 'should contain the error message prefixed with the <pre> tag' )
    t.match( actual, 'test/get-message.test.js', 'should contain a reference to the test script in the err.stack' )
    t.end()
  }
)

tap.test( 'getMessage for minimum res when NODE_ENV is not set to development',
  function ( t ) {
    var err = new Error( 'oops!' )
    var res = require( './fixtures/res-minimum' )
    var actual

    actual = getMessage( err, res, 'test' )

    t.same( actual, 'Error: oops!', 'should be set to the error message' )
    t.end()
  }
)

tap.test( 'getMessage for res json/application',
  function ( t ) {
    var err = new Error( 'oops!' )
    var res = require( './fixtures/res-json-application' )
    var actual

    actual = getMessage( err, res )

    t.same( actual, { error: 'Error: oops!' }, 'should be set to the error message as an object' )
    t.end()
  }
)
