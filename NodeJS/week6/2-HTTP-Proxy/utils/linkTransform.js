"use strict";

var Transform = require('stream').Transform,
    util = require('util');

function LinkTransform(serverUrl) {
    Transform.call(this);
    this.serverUrl = serverUrl;
}
util.inherits(LinkTransform, Transform);

LinkTransform.prototype.replaceAllUrlsWithLocalhost3000 = function(text) {
    var exp = /(([a-z]+:\/\/|www\.|[^\s:=]+@www\.)([^/].*?[a-z0-9].*?)([a-z_\/0-9\-\#=&]|))(?=[\.,;\?\!]?(["'«»\[\s\r\n]|$))/ig;
    return text.replace(exp, this.serverUrl + "$1");
};

LinkTransform.prototype._transform = function(data, encoding, done) {
    var dataWithReplacedUrls = this.replaceAllUrlsWithLocalhost3000(data.toString());
    this.push(dataWithReplacedUrls);
    done();
};

module.exports = LinkTransform;