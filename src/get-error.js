/* eslint max-len: off */

'use strict'

/**
 * @param {Error} err
 * @param {number} err.status
 * @param {number} err.statusCode
 *
 * @param {IncomingMessage} req
 * @param {Object} req.body
 * @param {Object} req.connection
 * @param {string} req.connection.remoteAddress
 * @param {Object} req.headers
 * @param {string} req.method
 * @param {string} req.originalUrl
 * @param {Object} req.session
 *
 * @returns {Object}
 */
function getError( err, req ) {
  var error = {}

  error.body = req.body || null
  error.date = new Date()
  error.headers = req.headers
  error.message = err.toString()
  error.method = req.method || null
  error.originalUrl = req.originalUrl || null
  error.remoteAddress = req.headers[ 'x-forwarded-for' ] || req.headers[ 'x-real-ip' ] || req.connection.remoteAddress || null
  error.session = req.session || null
  error.statusCode = err.status || err.statusCode || 500

  return error
}

module.exports = getError
