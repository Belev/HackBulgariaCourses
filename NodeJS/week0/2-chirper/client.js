"use strict";

(function () {
    var args = require('./client/argumentParser').args(),
        httpRequester = require('./client/httpRequester'),
        configOperationsHandler = require('./client/configHandler');

    configOperationsHandler.init('./config.json');

    configOperationsHandler.loadConfigContent(function (data) {
        Object.keys(data).forEach(function (key) {
            args[key] = args[key] || data[key];
        });

        httpRequester.request(args.action, args, function (err, data) {
            if (err) {
                console.log('Error: ' + err);
                return;
            }

            // if new user register, change config file for the new user
            if (data.user) {
                data['api_url'] = args['api_url'];
                configOperationsHandler.writeConfigContent(data, function (err, result) {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log(result);
                    }
                });

            } else {
                console.log(data);
            }
        });
    });
})();