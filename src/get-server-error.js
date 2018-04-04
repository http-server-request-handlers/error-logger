/* eslint max-len: off */

'use strict'

/**
 * @param {Error} err
 * @param {number|string} err.code
 * @param {number|string} err.errorCode
 * @param {number|string} err.status
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
function getServerError( err, req ) {
  var error = {}

  error.body = req.body || null
  error.code = err.code || null
  error.date = new Date()
  error.errorCode = err.errorCode || null
  error.headers = req.headers
  error.message = err.toString()
  error.method = req.method || null
  error.originalUrl = req.originalUrl || null
  error.remoteAddress = req.headers[ 'x-forwarded-for' ] || req.headers[ 'x-real-ip' ] || req.connection.remoteAddress || null
  error.session = req.session || null
  error.status = err.status || null
  error.statusCode = err.statusCode || 500

  return error
}

module.exports = getServerError
