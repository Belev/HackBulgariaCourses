"use strict";

module.exports = function (request, snippetData) {
    describe('DELETE /delete_snippet', function () {
        var addedSnippet;

        before(function (done) {
            snippetData.addSnipet({
                code: 'test',
                codeLanguage: 'test-language',
                createdBy: 'me',
                fileName: 'test'
            }).then(function (snippet) {
                addedSnippet = snippet;
                done();
            });
        });

        it('Without provided id should return 400, text/html and "You must provide id."',
            function (done) {
                request.delete('/delete_snippet')
                    .expect(400)
                    .expect('Content-Type', /text\/html/)
                    .expect('You must provide id.\n', done);
            });

        it('With invalid id should return 400, text/html and "There is no such snippet in the database."',
            function (done) {
                request.delete('/delete_snippet')
                    .send({ id: 'invalid' })
                    .expect(400)
                    .expect('Content-Type', /text\/html/)
                    .expect('There is no such snippet in the database.\n', done);
            });

        it('With valid id should return 200, application/json and the deleted snippet.',
            function (done) {
                request.delete('/delete_snippet')
                    .send({id: addedSnippet.snippetId })
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
                    .end(function (err, res) {
                        expect(res.body).not.to.be.empty;
                        expect(res.body).to.have.property('codeLanguage').equal(addedSnippet.codeLanguage);
                        expect(res.body).to.have.property('createdBy').equal(addedSnippet.createdBy);
                        expect(res.body).to.have.property('fileName').equal(addedSnippet.fileName);
                        expect(res.body).to.have.property('code').equal(addedSnippet.code);
                        done();
                    });
            });
    });
};