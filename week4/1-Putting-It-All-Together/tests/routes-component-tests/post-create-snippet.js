"use strict";

module.exports = function (request, mongoose) {
    describe('POST /create_snippet', function () {
        after(function () {
            mongoose.connection.db.dropDatabase();
        });

        it('After sending valid data should return content-type application/json and 200',
            function (done) {
                var snippeToCreate = {
                    codeLanguage: 'test',
                    createdBy: 'me',
                    fileName: 'test',
                    code: 'code'
                };
                request.post('/create_snippet')
                    .send(snippeToCreate)
                    .expect('Content-Type', /application\/json/)
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).not.to.be.empty;
                        expect(res.body).to.have.property('codeLanguage').equal(snippeToCreate.codeLanguage);
                        expect(res.body).to.have.property('createdBy').equal(snippeToCreate.createdBy);
                        expect(res.body).to.have.property('fileName').equal(snippeToCreate.fileName);
                        expect(res.body).to.have.property('code').equal(snippeToCreate.code);
                        done();
                    });
            });

        it('After sending object without some property should return content-type text/html, Validation failed and 400',
            function (done) {
                request.post('/create_snippet')
                    .send({
                        codeLanguage: 'test',
                        createdBy: 'me',
                        fileName: 'test'
                    })
                    .expect('Content-Type', /text\/html/)
                    .expect('Validation failed\n')
                    .expect(400, done);
            });

        it('After sending object without any two properties should return content-type text/html, Validation failed and 400',
            function (done) {
                request.post('/create_snippet')
                    .send({
                        createdBy: 'me',
                        fileName: 'test'
                    })
                    .expect('Content-Type', /text\/html/)
                    .expect('Validation failed\n')
                    .expect(400, done);
            });

        it('After sending object with one property should return content-type text/html, Validation failed and 400',
            function (done) {
                request.post('/create_snippet')
                    .send({
                        codeLanguage: 'test'
                    })
                    .expect('Content-Type', /text\/html/)
                    .expect('Validation failed\n')
                    .expect(400, done);
            });

        it('After sending empty object should return content-type text/html, Validation failed and 400',
            function (done) {
                request.post('/create_snippet')
                    .send({ })
                    .expect('Content-Type', /text\/html/)
                    .expect('Validation failed\n')
                    .expect(400, done);
            });

        it('After sending undefined should return content-type text/html, Validation failed and 400',
            function (done) {
                request.post('/create_snippet')
                    .send(undefined)
                    .expect('Content-Type', /text\/html/)
                    .expect('Validation failed\n')
                    .expect(400, done);
            });
    });
};