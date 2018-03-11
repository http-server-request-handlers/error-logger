/* eslint global-require: off */

'use strict'

var errorLogger = require( '../src' )
var sinon = require( 'sinon' )
var spy_console_error = sinon.spy( console, 'error' )
var tap = require( 'tap' )

tap.test( 'errorLogger',
  function ( t ) {
    var err = new Error( 'oops!' )
    var req = require( './fixtures/req-minimum' )
    var res = require( './fixtures/res-minimum' )
    var expected = require( './fixtures/error-minimum' )
    var spy_res_send = sinon.spy( res, 'send' )

    spy_console_error.resetHistory()
    spy_res_send.resetHistory()

    errorLogger( err, req, res )

    t.equals( res.statusCode, 500, 'res.statusCode should be set to 500' )
    t.true( spy_console_error.called, 'console.error called' )

    t.same(
      spy_console_error.getCall( 0 ).args[ 0 ],
      { error: expected },
      'should console.error the expected error'
    )

    t.match(
      spy_console_error.getCall( 1 ).args[ 0 ],
      'test/index.test.js',
      'should contain in the err.stack `test/index.test.js`'
    )

    t.true( spy_res_send.called, 'res.send called' )
    t.end()
  }
)

tap.test( 'errorLogger with statusCode 404',
  function ( t ) {
    var err = new Error( 'Not Found' )
    var req = require( './fixtures/req-minimum' )
    var res = require( './fixtures/res-minimum' )

    err.statusCode = 404
    spy_console_error.resetHistory()

    errorLogger( err, req, res )

    t.true( spy_console_error.getCall( 1 ) === null, 'err.stack should not be logged' )
    t.end()
  }
)
