'use strict'

/**
 * @param {Error} err
 *
 * @param {IncomingMessage} req
 * @param {Function} req.get
 *
 * @param {string} env
 *
 * @returns {Object|string}
 */
function getResponseMessage( err, req, env ) {
  var content_type = req.get( 'content-type' ) || ''
  var message = err.toString()

  if ( content_type.indexOf( 'application/json' ) !== -1 ) {
    message = {
      error: {
        code: err.code || null,
        errorCode: err.errorCode || null,
        message: err.toString(),
        status: err.status || null,
        statusCode: err.statusCode || 500
      }
    }
  } else if ( env === 'development' ) {
    message = '<pre>' + err.stack
  }

  return message
}

module.exports = getResponseMessage
