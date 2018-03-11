/* eslint max-params: off */
/* eslint no-process-env: off */
/* eslint no-unused-vars: off */

'use strict'

/**
 * module dependencies
 */
var getError = require( './get-error' )
var getMessage = require( './get-message' )

/**
 * this middleware needs to be added after all “non-error” middleware in the application.
 * it assumes that if the application got here, an error was sent via next( err ).
 *
 * @link http://expressjs.com/en/guide/error-handling.html
 *
 * @param {Error} err
 * @param {number} err.status
 * @param {number} err.statusCode
 *
 * @param {IncomingMessage} req
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @param {Function} next
 *
 * @returns {undefined}
 */
function errorLogger( err, req, res, next ) {
  var error = getError( err, req )

  res.statusCode = error.statusCode
  console.error( { error: error } )

  if ( error.statusCode !== 404 ) {
    console.error( err.stack )
  }

  res.send( getMessage( err, res, process.env.NODE_ENV ) )
}

module.exports = errorLogger
