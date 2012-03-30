/**
 *
 * Copyright(c) 2012 Nick Crohn <nick.crohn@gmail.com>
 * MIT LICENSE
 *
 */

var utils = require('connect').utils,
    hash;

exports = module.exports = function(opts) {
  return function credentials(req, res, next) {
    if(req.headers['x-token']) {
      var token = req.headers['x-token'];
      if(!hash) {
        hash = token;
      }

      if(token === hash) {
        next();
      } else {
        res.writeHead(403, 'Content-Type: text/plain');
        res.end('Access denied');
      }

    } else {
      res.writeHead(403, 'Content-Type: text/plain');
      res.end('Access denied');
    }
  };
};