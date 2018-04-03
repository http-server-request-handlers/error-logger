'use strict'

var res = {
  get: function () {
    return ''
  },
  send: function ( msg ) {
    return msg
  },
  status: function ( code ) {
    this.statusCode = code

    return this
  }
}

module.exports = res
