/* eslint global-require: off */

'use strict'

var getError = require( '../src/get-error' )

var tap = require( 'tap' )

tap.test( 'getError for minimum req',
  function ( t ) {
    var err = new Error( 'oops!' )
    var req = require( './fixtures/req-minimum' )
    var expected = require( './fixtures/error-minimum' )
    var actual = getError( err, req )

    t.same( actual, expected, 'should return the expected error object' )
    t.end()
  }
)
