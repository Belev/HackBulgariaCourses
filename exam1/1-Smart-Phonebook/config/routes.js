"use strict";

module.exports = function (app, controllers) {
    app.post('/contacts', controllers.contacts.create, controllers.groups.addToGroup);
    app.get('/contacts', controllers.contacts.getAll);
    app.get('/contacts/:id', controllers.contacts.getById);
    app.delete('/contacts/:id', controllers.contacts.deleteById, controllers.groups.removeContactFromGroups);

    app.get('/groups', controllers.groups.getAll);
};