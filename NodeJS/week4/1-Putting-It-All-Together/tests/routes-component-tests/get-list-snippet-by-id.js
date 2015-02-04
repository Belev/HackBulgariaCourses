"use strict";

module.exports = function (request, snippetData, mongoose) {
    describe('GET /list_snippet_by_id/:id', function () {
        after(function () {
            mongoose.connection.db.dropDatabase();
        });

        it('Without given id should return 404, text/html, "Cannot GET /list_snippet_by_id"',
            function (done) {
                request.get('/list_snippet_by_id')
                    .expect(404)
                    .expect('Content-Type', /text\/html/)
                    .expect('Cannot GET /list_snippet_by_id\n', done);
            });

        it('With invalid id should return 400, text/html, "There is no such snippet in the database."',
            function (done) {
                request.get('/list_snippet_by_id/invalid')
                    .expect(400)
                    .expect('Content-Type', /text\/html/)
                    .expect('There is no such snippet in the database.\n', done);
            });

        it('With valid id should return 200, application/json and the snippet',
            function (done) {
                var snippetToAdd = {
                    codeLanguage: 'test',
                    createdBy: 'me',
                    fileName: 'test',
                    code: 'code'
                };

                snippetData.addSnipet(snippetToAdd)
                    .then(function (snippet) {
                        request.get('/list_snippet_by_id/' + snippet.snippetId)
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
                            .end(function (err, res) {
                                expect(res.body).to.have.property('snippetId').equal(snippet.snippetId);
                                expect(res.body).to.have.property('codeLanguage').equal(snippet.codeLanguage);
                                expect(res.body).to.have.property('fileName').equal(snippet.fileName);
                                expect(res.body).to.have.property('code').equal(snippet.code);
                                expect(res.body).to.have.property('createdBy').equal(snippet.createdBy);
                                done();
                            });
                    });
            });
    });
};