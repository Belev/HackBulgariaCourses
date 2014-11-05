"use strict";

module.exports = function (snippetData) {
    describe('Adding snippets tests.', function () {
        describe('With some invalid snippet information fields.', function () {
            it('Adding snippet without codeLanguage should fail with error message Validation failed', function (done) {
                snippetData.addSnipet({
                    fileName: 'test',
                    code: 'test',
                    createdBy: 'me'
                }).fail(function (err) {
                    expect(err).to.be.ok;
                    expect(err.message).to.be.equal('Validation failed');
                    done();
                });
            });

            it('Adding snippet without fileName should fail with error message Validation failed', function (done) {
                snippetData.addSnipet({
                    codeLanguage: 'JavaScript',
                    code: 'test',
                    createdBy: 'me'
                }).fail(function (err) {
                    expect(err).to.be.ok;
                    expect(err.message).to.be.equal('Validation failed');
                    done();
                });
            });

            it('Adding snippet without code should fail with error message Validation failed', function (done) {
                snippetData.addSnipet({
                    codeLanguage: 'JavaScript',
                    fileName: 'test',
                    createdBy: 'me'
                }).fail(function (err) {
                    expect(err).to.be.ok;
                    expect(err.message).to.be.equal('Validation failed');
                    done();
                });
            });

            it('Adding snippet without createdBy should fail with error message Validation failed', function (done) {
                snippetData.addSnipet({
                    codeLanguage: 'JavaScript',
                    code: 'test',
                    fileName: 'test'
                }).fail(function (err) {
                    expect(err).to.be.ok;
                    expect(err.message).to.be.equal('Validation failed');
                    done();
                });
            });

            it('Adding snippet without two fields should fail with error message Validation failed', function (done) {
                snippetData.addSnipet({
                    code: 'test',
                    fileName: 'test'
                }).fail(function (err) {
                    expect(err).to.be.ok;
                    expect(err.message).to.be.equal('Validation failed');
                    done();
                });
            });

            it('Adding snippet without three fields should fail with error message Validation failed', function (done) {
                snippetData.addSnipet({
                    code: 'test'
                }).fail(function (err) {
                    expect(err).to.be.ok;
                    expect(err.message).to.be.equal('Validation failed');
                    done();
                });
            });

            it('Adding snippet without all fields should fail with error message Validation failed', function (done) {
                snippetData.addSnipet({ }).fail(function (err) {
                    expect(err).to.be.ok;
                    expect(err.message).to.be.equal('Validation failed');
                    done();
                });
            });

            it('Adding undefined should fail with error snippetInfo is required.', function (done) {
                snippetData.addSnipet(undefined).fail(function (err) {
                    expect(err).to.be.ok;
                    expect(err).to.be.equal('snippetInfo is required.');
                    done();
                });
            });
        });

        describe('With valid snippet information.', function () {
            it('Adding valid snippet should add the snippet to database and return the added snippet', function (done) {
                var snippetToAdd = {
                    codeLanguage: 'javascript',
                    fileName: 'test',
                    code: 'test',
                    createdBy: 'me'
                };

                snippetData.addSnipet(snippetToAdd)
                    .then(function (addedSnippet) {
                        expect(addedSnippet).to.have.property('snippetId');
                        expect(addedSnippet).to.have.property('codeLanguage').equal(snippetToAdd.codeLanguage);
                        expect(addedSnippet).to.have.property('fileName').equal(snippetToAdd.fileName);
                        expect(addedSnippet).to.have.property('code').equal(snippetToAdd.code);
                        expect(addedSnippet).to.have.property('createdBy').equal(snippetToAdd.createdBy);

                        snippetData.getSnippetsCount()
                            .then(function (count) {
                                expect(count).to.be.equal(1);
                                done();
                            });
                    });
            });
        });
    });
};