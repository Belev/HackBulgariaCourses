"use strict";

module.exports = function (request, snippetData, mongoose) {
    describe('PUT /update_snippet', function () {
        var addedSnippet;

        beforeEach(function (done) {
            snippetData.addSnipet({
                codeLanguage: 'test',
                createdBy: 'me',
                fileName: 'test',
                code: 'code'
            }).then(function (snippet) {
                addedSnippet = snippet;
                done();
            });
        });

        after(function () {
            mongoose.connection.db.dropDatabase();
        });

        it('Sending valid id and updateInfo should return content-type application/json and 200',
            function (done) {
                var updateInfo = {
                    fileName: 'updated'
                };

                request.put('/update_snippet')
                    .send({
                        id: addedSnippet.snippetId,
                        updateInfo: updateInfo
                    })
                    .expect('Content-Type', /application\/json/)
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).not.to.be.empty;
                        expect(res.body).to.have.property('fileName').equal(updateInfo.fileName);
                        done();
                    });
            });

        it('Sending valid id with empty updateInfo should return application/json, the same snippet and 200',
            function (done) {
                request.put('/update_snippet')
                    .send({
                        id: addedSnippet.snippetId,
                        updateInfo: {}
                    })
                    .expect('Content-Type', /application\/json/)
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body).not.to.be.empty;
                        expect(res.body).to.have.property('codeLanguage').equal(addedSnippet.codeLanguage);
                        expect(res.body).to.have.property('createdBy').equal(addedSnippet.createdBy);
                        expect(res.body).to.have.property('fileName').equal(addedSnippet.fileName);
                        expect(res.body).to.have.property('code').equal(addedSnippet.code);
                        done();
                    });
            });

        it('Sending invalid id should return content-type text/html, "There is no such snippet in the database.", 400',
            function (done) {
                request.put('/update_snippet')
                    .send({
                        id: 'invalid',
                        updateInfo: {}
                    })
                    .expect('Content-Type', /text\/html/)
                    .expect('There is no such snippet in the database.\n')
                    .expect(400, done);
            });

        it('Not sending id should return content-type text/html, "You must provide id.", 400',
            function (done) {
                request.put('/update_snippet')
                    .send({
                        updateInfo: {}
                    })
                    .expect('Content-Type', /text\/html/)
                    .expect('You must provide id.\n')
                    .expect(400, done);
            });

        it('Sending valid id without updateInfo should return text/html, "You must provide updateInfo to update snippet." and 400',
            function (done) {
                request.put('/update_snippet')
                    .send({
                        id: addedSnippet.snippetId
                    })
                    .expect('Content-Type', /text\/html/)
                    .expect('You must provide updateInfo to update snippet.\n')
                    .expect(400, done);
            });
    });
};