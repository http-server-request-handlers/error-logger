'use strict'

var res = {
  get: function () {
    return 'application/json'
  },
  send: function ( msg ) {
    return msg
  }
}

module.exports = res
