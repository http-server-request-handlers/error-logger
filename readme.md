## http-server-request-handlers-error-logger
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![NSP Status][nsp-image]][nsp-url]

an http.Server request handler for express that handles IncomingMessage errors

## table of contents
* [notes](#notes)
* [installation](#installation)
* [api](#api)
* [usage](#usage)
    * [basic](#basic)
* [license](#license)

## notes
this middleware should be added after all “non-error” middleware in the application.

it expects the following:

* `req` is an object
* `req.headers` exists
* `req.connection` exists
* `res` is an object
* `res.get` is a function
* `res.send` is a function

it implements the following:

* creates an error object containing the following properties
```javascript
{
  error: {
    body: req.body || null,
    date: new Date(),
    headers: req.headers || null,
    message: err.toString() || null,
    method: req.method || null,
    originalUrl: req.originalUrl || null,
    remoteAddress: req.headers[ 'x-forwarded-for' ] || req.headers[ 'x-real-ip' ] || req.connection.remoteAddress || null,
    session: req.session || null,
    statusCode: err.status || err.statusCode || 500
  }
}
````
* adds the error `statusCode` to `res` as `res.statusCode`
* logs the error object to `console.error`
* logs the `err.stack` to `console.error` if the `error.statusCode` is not equal to `404`
* creates a message format based on the current response and environment
    * when the response `content-type` is `application/json`
        * a json with a property `error` set to the `err.message`
    * when `NODE_ENV` is set to `development`
        * the `err.stack`
    * otherwise the `err.message`

## installation
```bash
npm install http-server-request-handlers-error-logger
```

## api
```javascript
/*
 * @param {Error} err
 * @param {number} err.status
 * @param {number} err.statusCode
 *
 * @param {IncomingMessage} req
 *
 * @param {ServerResponse} res
 * @param {Function} res.send
 *
 * @returns {undefined}
 */
function errorLogger( err, req, res )
```

## use
```javascript
var express = require( 'express' );
var app = express();
var errorLogger = require( 'http-server-request-handlers-error-logger' );

// ... middleware declarations
// ... route declarations

app.use( errorLogger );
```

## license
[MIT License][mit-license]

[coveralls-image]: https://coveralls.io/repos/github/http-server-request-handlers/error-logger/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/http-server-request-handlers/error-logger?branch=master
[mit-license]: https://raw.githubusercontent.com/http-server-request-handlers/error-logger/master/license.txt
[npm-image]: https://img.shields.io/npm/v/http-server-request-handlers-error-logger.svg
[npm-url]: https://www.npmjs.com/package/http-server-request-handlers-error-logger
[nsp-image]: https://nodesecurity.io/orgs/http-server-request-handlers/projects/8ae93619-529e-4b44-8709-9e545c4bf9eb/badge
[nsp-url]: https://nodesecurity.io/orgs/http-server-request-handlers/projects/8ae93619-529e-4b44-8709-9e545c4bf9eb
[travis-image]: https://travis-ci.org/http-server-request-handlers/error-logger.svg?branch=master
[travis-url]: https://travis-ci.org/http-server-request-handlers/error-logger