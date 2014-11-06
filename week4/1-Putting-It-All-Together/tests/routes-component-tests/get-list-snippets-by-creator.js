"use strict";

module.exports = function (request, snippetData, mongoose) {
    describe('GET /list_snippets_by_creator/:creator', function () {
        after(function () {
            mongoose.connection.db.dropDatabase();
        });

        it('Without creator should return 404, text/html and "Cannot GET /list_snippets_by_creator"',
            function (done) {
                request.get('/list_snippets_by_creator')
                    .expect(404)
                    .expect('Content-Type', /text\/html/)
                    .expect('Cannot GET /list_snippets_by_creator\n', done);
            });

        it('With unexisting creator should return 200, application/json and empty array',
            function (done) {
                request.get('/list_snippets_by_creator/unexisting')
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
                    .end(function (err, res) {
                        expect(res.body).to.be.empty;
                        expect(res.body).to.be.a('array');
                        done();
                    });
            });

        it('With existing creator name should return 200, appliaction/json and array with creators snippets',
            function (done) {
                var snippetToAdd = {
                    codeLanguage: 'test-language',
                    fileName: 'test-file',
                    createdBy: 'me',
                    code: 'test-code'
                };
                snippetData.addSnipet(snippetToAdd)
                    .then(function (snippet) {
                        request.get('/list_snippets_by_creator/me')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
                            .end(function (err, res) {
                                expect(res.body).not.to.be.empty;
                                expect(res.body).to.be.a('array');
                                expect(res.body.length).to.be.equal(1);

                                expect(res.body[0]).to.have.property('createdBy').equal(snippet.createdBy);

                                done();
                            });
                    });
            });
    });
};