"use strict";

var RegexTransform = require('./regexTransform');

var transform = new RegexTransform(new RegExp('test'));

transform.write('nothing should print');
transform.write('should print test');
transform.write(new RegExp('other'));
transform.write('nothing again');
transform.write('still nothing');
transform.write('should print other');
transform.write(/gosho/);
transform.write('come on gosho');


transform.pipe(process.stdout);