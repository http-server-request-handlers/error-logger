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
function getMessage( err, req, env ) {
  var content_type = req.get( 'content-type' ) || ''
  var message = err.toString()

  if ( content_type.indexOf( 'application/json' ) !== -1 ) {
    message = { error: { message: err.toString() } }
  } else if ( env === 'development' ) {
    message = '<pre>' + err.stack
  }

  return message
}

module.exports = getMessage
