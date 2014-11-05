"use strict";

module.exports = function (snippetData) {
    describe('Updating snippet tests.', function () {
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

        describe('With invalid id or update info.', function () {
            it('Update with undefined id should fail with message "You must provide id."', function (done) {
                snippetData.updateSnippet(undefined, {})
                    .fail(function (err) {
                        expect(err).to.be.ok;
                        expect(err).to.be.equal('You must provide id.');
                        done();
                    });
            });

            it('Update with undefined snippetInfo should fail with message "You must provide updateInfo to update snippet."', function (done) {
                snippetData.updateSnippet('test', undefined)
                    .fail(function (err) {
                        expect(err).to.be.ok;
                        expect(err).to.be.equal('You must provide updateInfo to update snippet.');
                        done();
                    });
            });

            it('Update with unexisting id should fail with message "There is no such snippet in the database."', function (done) {
                snippetData.updateSnippet('test', { codeLanguage: 'c++'})
                    .fail(function (err) {
                        expect(err).to.be.ok;
                        expect(err).to.be.equal('There is no such snippet in the database.');
                        done();
                    });
            });
        });

        describe('With valid id.', function () {
            it('Update with only fileName should return the updated snippet with changed only fileName', function (done) {
                snippetData.updateSnippet(addedSnippet.snippetId, {fileName: 'updated'})
                    .then(function (updatedSnippet) {
                        expect(updatedSnippet.codeLanguage).to.be.equal(addedSnippet.codeLanguage);
                        expect(updatedSnippet.createdBy).to.be.equal(addedSnippet.createdBy);
                        expect(updatedSnippet.code).to.be.equal(addedSnippet.code);
                        expect(updatedSnippet.fileName).to.be.equal('updated');
                        done();
                    });
            });

            it('Update with only codeLanguage should return the updated snippet with changed only codeLanguage', function (done) {
                snippetData.updateSnippet(addedSnippet.snippetId, {codeLanguage: 'updated'})
                    .then(function (updatedSnippet) {
                        expect(updatedSnippet.fileName).to.be.equal(addedSnippet.fileName);
                        expect(updatedSnippet.createdBy).to.be.equal(addedSnippet.createdBy);
                        expect(updatedSnippet.code).to.be.equal(addedSnippet.code);
                        expect(updatedSnippet.codeLanguage).to.be.equal('updated');
                        done();
                    });
            });

            it('Update with only createdBy should return the updated snippet with changed only createBy', function (done) {
                snippetData.updateSnippet(addedSnippet.snippetId, {createdBy: 'updated'})
                    .then(function (updatedSnippet) {
                        expect(updatedSnippet.codeLanguage).to.be.equal(addedSnippet.codeLanguage);
                        expect(updatedSnippet.fileName).to.be.equal(addedSnippet.fileName);
                        expect(updatedSnippet.code).to.be.equal(addedSnippet.code);
                        expect(updatedSnippet.createdBy).to.be.equal('updated');
                        done();
                    });
            });

            it('Update with only code should return the updated snippet with changed only code', function (done) {
                snippetData.updateSnippet(addedSnippet.snippetId, {code: 'updated'})
                    .then(function (updatedSnippet) {
                        expect(updatedSnippet.fileName).to.be.equal(addedSnippet.fileName);
                        expect(updatedSnippet.createdBy).to.be.equal(addedSnippet.createdBy);
                        expect(updatedSnippet.codeLanguage).to.be.equal(addedSnippet.codeLanguage);
                        expect(updatedSnippet.code).to.be.equal('updated');
                        done();
                    });
            });
        });
    });
};