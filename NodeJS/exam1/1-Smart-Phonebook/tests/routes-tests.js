"use strict";

require('./config/chai');

var request = require('supertest'),
    mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    config = require('./config/config'),
    data = require('../data'),
    controllers = require('../controllers');

require('../config/mongoose')(config, mongoose);
require('../config/express')(app);
require('../config/routes')(app, controllers);

request = request(app);

describe('Server routes tests.', function () {
    describe('POST /contacts tests.', function () {
        after(function () {
            mongoose.connection.db.dropDatabase();
        });

        it('Send valid contactInfo should return 200, message - "Contact successfully created.".',
            function (done) {
                var contactInfo = {
                    phoneNumber: '123456',
                    personIdentifier: 'Pesho sofianeca'
                };

                request.post('/contacts')
                    .send(contactInfo)
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.have.property('message').equal('Contact successfully created.');
                        expect(res.body).to.have.property('contactId');
                        done();
                    });
            });

        it('Send contactInfo without phoneNumber should return 400 and "You must provide phoneNumber and personIdentifier to create new contact."',
            function (done) {
                request.post('/contacts')
                    .send({
                        personIdentifier: 'Pesho sofianeca'
                    })
                    .expect(400)
                    .expect('You must provide phoneNumber and personIdentifier to create new contact.\n', done);
            });

        it('Send contactInfo without personIdentifier should return 400 and "You must provide phoneNumber and personIdentifier to create new contact."',
            function (done) {
                request.post('/contacts')
                    .send({
                        phoneNumber: '123'
                    })
                    .expect(400)
                    .expect('You must provide phoneNumber and personIdentifier to create new contact.\n', done);
            });

        it('Send nothing should return 400 and "You must provide phoneNumber and personIdentifier to create new contact."',
            function (done) {
                request.post('/contacts')
                    .send()
                    .expect(400)
                    .expect('You must provide phoneNumber and personIdentifier to create new contact.\n', done);
            });
    });

    describe('GET /contacts tests.', function () {
        after(function () {
            mongoose.connection.db.dropDatabase();
        });

        it('Without contacts should return 200 and empty array.',
            function (done) {
                request.get('/contacts')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.be.an('array');
                        expect(res.body).to.be.empty;
                        done();
                    });
            });

        it('With any contacts should return 200 and all contacts.',
            function (done) {
                request.post('/contacts')
                    .send({
                        phoneNumber: '123',
                        personIdentifier: 'test'
                    })
                    .end(function (err, res) {
                        request.get('/contacts')
                            .expect(200)
                            .end(function (err, res) {
                                expect(res.body).to.be.an('array');
                                expect(res.body.length).to.be.equal(1);
                                done();
                            });
                    });
            });
    });

    describe('GET /contacts/:id tests.', function () {
        after(function () {
            mongoose.connection.db.dropDatabase();
        });

        it('With existing id should return 200 and the contact phoneNumber and personIdentifier',
            function (done) {
                request.post('/contacts')
                    .send({
                        phoneNumber: '123',
                        personIdentifier: 'test'
                    })
                    .end(function (err, res) {
                        request.get('/contacts/' + res.body.contactId)
                            .expect(200)
                            .end(function (err, res) {
                                expect(res.body).to.have.property('phoneNumber').equal('123');
                                expect(res.body).to.have.property('personIdentifier').equal('test');
                                done();
                            });
                    });
            });

        it('With invalid id should return 400 and "Cast to ObjectId failed".',
            function (done) {
                request.get('/contacts/invalid')
                    .expect(400)
                    .expect(/Cast to ObjectId failed/, done);
            });

        it('With unexisting id should return 400 and "There is no such contact.".',
            function (done) {
                request.get('/contacts/5462a56ee9244be3331ff439')
                    .expect(400)
                    .expect('There is no such contact.\n', done);
            });
    });

    describe('DELETE /contacts/:id tests.', function () {
        after(function () {
            mongoose.connection.db.dropDatabase();
        });

        it('With existing id should return 200 and message and removed contactId',
            function (done) {
                request.post('/contacts')
                    .send({
                        phoneNumber: '123',
                        personIdentifier: 'test'
                    })
                    .end(function (err, res) {
                        request.delete('/contacts/' + res.body.contactId)
                            .expect(200)
                            .end(function (err, res) {
                                expect(res.body).to.have.property('message').equal('Contact successfully deleted.');
                                expect(res.body).to.have.property('contactId').equal(res.body.contactId);
                                done();
                            });
                    });
            });

        it('With invalid id should return 400 and "Cast to ObjectId failed".',
            function (done) {
                request.delete('/contacts/invalid')
                    .expect(400)
                    .expect(/Cast to ObjectId failed/, done);
            });

        it('With unexisting id should return 400 and "There is no such contact.".',
            function (done) {
                request.delete('/contacts/5462a56ee9244be3331ff439')
                    .expect(400)
                    .expect('There is no such contact.\n', done);
            });
    });

    describe('GET /groups tests.', function () {
        it('Without groups should return 200 and empty array.',
            function (done) {
                request.get('/groups')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).to.be.an('array');
                        expect(res.body).to.be.empty;
                        done();
                    });
            });

        describe('With groups should return 200 and all groups.', function () {
            before(function (done) {
                request.post('/contacts')
                    .send({
                        phoneNumber: '123',
                        personIdentifier: 'test for groups'
                    })
                    .end(function (err, res) {
                        if (err) {
                            console.log(err);
                        }

                        done();
                    });
            });

            after(function () {
                mongoose.connection.db.dropDatabase();
            });

            it('With any groups should return 200 and all groups.',
                function (done) {
                    request.get('/groups')
                        .expect(200)
                        .end(function (err, res) {
                            expect(res.body).to.be.an('array');
                            expect(res.body.length).to.be.equal(3);
                            done();
                        });
                });

        });
    });
});