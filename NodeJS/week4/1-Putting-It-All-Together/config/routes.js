"use strict";

module.exports = function (app, controller) {
    app.post('/create_snippet', controller.createSnippet);
    app.put('/update_snippet', controller.updateSnippet);
    app.delete('/delete_snippet', controller.deleteSnippet);
    app.get('/list_all_snippets', controller.listAllSnippets);
    app.get('/list_snippets_by_creator/:creator', controller.listSnippetsByCreator);
    app.get('/list_snippet_by_id/:id', controller.listSnippetById);
};