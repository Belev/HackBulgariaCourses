"use strict";

module.exports = function (snippetData, mongoose) {
    describe('Getting and finding snippet/s tests.', function () {
        var snippets = {};
        var ELEMENTS_COUNT = 10;
        var CREATED_BY_ME_CHANCE = 3;
        var helpers = (function () {
            function seedSnippets(elementsCount, done) {
                if (elementsCount === 0) {
                    return done();
                }

                var createdBy = elementsCount % CREATED_BY_ME_CHANCE === 0 ? 'me' : 'other';

                var snippet = {
                    codeLanguage: 'test-language-' + elementsCount,
                    fileName: 'test-file-name-' + elementsCount,
                    createdBy: createdBy,
                    code: 'test-code-' + +elementsCount
                };

                snippetData.addSnipet(snippet)
                    .then(function (addedSnippet) {
                        snippets[addedSnippet.snippetId] = addedSnippet;
                        seedSnippets(elementsCount - 1, done);
                    });
            }

            function getFirstSnippetId(snippets) {
                for (var snippetId in snippets) {
                    return snippetId;
                }
            }

            function getSnippetsBy(snippets, createdBy) {
                return Object.keys(snippets)
                    .filter(function (snippet) {
                        return snippet.createdBy === createdBy;
                    });
            }

            return {
                seedSnippets: seedSnippets,
                getFirstSnippetId: getFirstSnippetId,
                getSnippetsBy: getSnippetsBy
            }
        })();

        before(function (done) {
            helpers.seedSnippets(ELEMENTS_COUNT, done);
        });

        after(function () {
            mongoose.connection.db.dropDatabase();
        });

        describe('Getting all snippets tests.', function () {
            it('getAllSnippets should return all snippets', function (done) {
                snippetData.getAllSnippets()
                    .then(function (allSnippets) {
                        expect(allSnippets.length).to.be.equal(ELEMENTS_COUNT);

                        allSnippets.forEach(function (currentSnippet, index) {
                            var snippet = snippets[currentSnippet.snippetId];

                            expect(currentSnippet).to.have.property('snippetId').equal(snippet.snippetId);
                            expect(currentSnippet).to.have.property('codeLanguage').equal(snippet.codeLanguage);
                            expect(currentSnippet).to.have.property('fileName').equal(snippet.fileName);
                            expect(currentSnippet).to.have.property('code').equal(snippet.code);
                            expect(currentSnippet).to.have.property('createdBy').equal(snippet.createdBy);

                            if (index === ELEMENTS_COUNT - 1) {
                                done();
                            }
                        });
                    });
            });
        });

        describe('Finding snippet by id tests.', function () {
            it('findSnippetById with undefined id should fail with message "You must provide id."', function (done) {
                snippetData.findSnippetById(undefined)
                    .fail(function (err) {
                        expect(err).to.be.ok;
                        expect(err).to.be.equal('You must provide id.');
                        done();
                    });
            });

            it('findSnippetById with unexisting id should fail with message "There is no such snippet in the database."', function (done) {
                snippetData.findSnippetById('test')
                    .fail(function (err) {
                        expect(err).to.be.ok;
                        expect(err).to.be.equal('There is no such snippet in the database.');
                        done();
                    });
            });

            it('findSnippetById with valid id should return the snippet.', function (done) {
                var id = helpers.getFirstSnippetId(snippets);
                snippetData.findSnippetById(id)
                    .then(function (foundSnippet) {
                        var snippet = snippets[id];
                        expect(foundSnippet).to.have.property('snippetId').equal(snippet.snippetId);
                        expect(foundSnippet).to.have.property('codeLanguage').equal(snippet.codeLanguage);
                        expect(foundSnippet).to.have.property('fileName').equal(snippet.fileName);
                        expect(foundSnippet).to.have.property('code').equal(snippet.code);
                        expect(foundSnippet).to.have.property('createdBy').equal(snippet.createdBy);
                        done();
                    });
            });
        });

        describe('Finding snippets by creator name tests.', function () {
            it('With undefined creatorName should fail with message "You must provide creatorName to search snippets."', function (done) {
                snippetData.findSnippetsByCreator(undefined)
                    .fail(function (err) {
                        expect(err).to.be.ok;
                        expect(err).to.be.equal('You must provide creatorName to search snippets.');
                        done();
                    });
            });

            it('With unexisting creatorName should return empty array."', function (done) {
                snippetData.findSnippetsByCreator('invalid-name')
                    .then(function (emptySnippets) {
                        expect(emptySnippets).to.be.empty;
                        done();
                    });
            });

            it('With existing creatorName "me" should return all snippets by creator "me".', function (done) {
                var createdBy = 'me';
                snippetData.findSnippetsByCreator(createdBy)
                    .then(function (snippets) {
                        expect(snippets.length).to.be.equal(Math.floor(ELEMENTS_COUNT / CREATED_BY_ME_CHANCE));

                        snippets.forEach(function (snippet, index) {
                            expect(snippet).to.have.property('createdBy').equal(createdBy);

                            if (index === snippets.length - 1) {
                                done();
                            }
                        });
                    });
            });

            it('With existing creatorName "other" should return all snippets by creator "other".', function (done) {
                var createdBy = 'other';
                snippetData.findSnippetsByCreator(createdBy)
                    .then(function (snippets) {
                        expect(snippets.length).to.be.equal(ELEMENTS_COUNT - Math.floor(ELEMENTS_COUNT / CREATED_BY_ME_CHANCE));

                        snippets.forEach(function (snippet, index) {
                            expect(snippet).to.have.property('createdBy').equal(createdBy);

                            if (index === snippets.length - 1) {
                                done();
                            }
                        });
                    });
            });
        });
    });
};