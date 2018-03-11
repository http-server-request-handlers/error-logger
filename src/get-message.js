'use strict'

/**
 * @param {Error} err
 *
 * @param {ServerResponse} res
 * @param {Function} res.get
 *
 * @param {string} env
 *
 * @returns {Object|string}
 */
function getMessage( err, res, env ) {
  var content_type = res.get( 'content-type' ) || res.get( 'Content-Type' ) || ''

  if ( content_type.indexOf( 'application/json' ) !== -1 ) {
    return {
      error: err.toString()
    }
  }

  if ( env === 'development' ) {
    return '<pre>' + err.stack
  }

  return err.toString()
}

module.exports = getMessage
