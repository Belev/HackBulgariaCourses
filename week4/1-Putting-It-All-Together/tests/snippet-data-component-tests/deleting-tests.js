"use strict";

module.exports = function (snippetData, mongoose) {
    describe('Deleting snippet tests.', function () {
        var addedSnippet;

        beforeEach(function (done) {
            var snippetToAdd = {
                codeLanguage: 'javascript',
                fileName: 'test',
                code: 'test',
                createdBy: 'me'
            };

            snippetData.addSnipet(snippetToAdd)
                .then(function (snippet) {
                    addedSnippet = snippet;
                    done();
                })
        });

        afterEach(function () {
            mongoose.connection.db.dropDatabase();
        });

        describe('With invalid id.', function () {
            it('Delete with undefined id should fail with message "You must provide id."', function (done) {
                snippetData.deleteSnippet(undefined)
                    .fail(function (err) {
                        expect(err).to.be.ok;
                        expect(err).to.be.equal('You must provide id.');
                        done();
                    });
            });

            it('Delete with unexisting id should fail with message "There is no such snippet in the database."', function (done) {
                snippetData.deleteSnippet('test')
                    .fail(function (err) {
                        expect(err).to.be.ok;
                        expect(err).to.be.equal('There is no such snippet in the database.');
                        done();
                    });
            });
        });

        describe('With valid id.', function () {
            it('Delete with valid id should delete the snippet from database and return the deleted snippet', function (done) {
                snippetData.deleteSnippet(addedSnippet.snippetId)
                    .then(function (deletedSnippet) {
                        expect(deletedSnippet).to.have.property('snippetId').equal(addedSnippet.snippetId);
                        expect(deletedSnippet).to.have.property('codeLanguage').equal(addedSnippet.codeLanguage);
                        expect(deletedSnippet).to.have.property('fileName').equal(addedSnippet.fileName);
                        expect(deletedSnippet).to.have.property('code').equal(addedSnippet.code);
                        expect(deletedSnippet).to.have.property('createdBy').equal(addedSnippet.createdBy);

                        snippetData.getSnippetsCount()
                            .then(function (count) {
                                expect(count).to.be.equal(0);
                                done();
                            });
                    });
            });
        });
    });
};