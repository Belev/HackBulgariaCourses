"use strict";

module.exports = function (request, snippetData) {
    function addDumpSnippetToDb(snippetData) {
        return snippetData.addSnipet({
            code: 'test',
            codeLanguage: 'test',
            fileName: 'test',
            createdBy: 'me'
        });
    }

    describe('GET /list_all_snippets', function () {
        it('Without snippets in db should return 200, application/json and empty array',
            function (done) {
                request.get('/list_all_snippets')
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
                    .end(function (err, res) {
                        expect(res.body).to.be.empty;
                        done();
                    });
            });

        it('With some snippets in db should return 200, application/json, and array with snippets',
            function (done) {
                addDumpSnippetToDb(snippetData)
                    .then(function (snippet) {
                        request.get('/list_all_snippets')
                            .expect(200)
                            .expect('Content-Type', /application\/json/)
                            .end(function (err, res) {
                                expect(res.body).not.to.be.empty;
                                expect(res.body.length).to.be.equal(1);
                                expect(res.body).to.be.a('array');
                                done();
                            });
                    });
            });
    });
};