/*global db*/
'use strict';

function setupRoutes(app) {

    /* Get single item from the database. Response should be in the following format
     {
     Result: (Object: Item with the specified id)
     }

     If the item doest not exist then an Error must be returned to the user.
     {
     Error: 'Item not found'
     }
     with a status code of 404.*/
    app.get('/db/:id', function (req, res, next) {
        var id = req.params.id;

        db.getById(id, function (err, item) {
            if (err) {
                if (err === 'Item not found') {
                    res.status(404).send({
                        Error: err
                    });
                } else {
                    next(err);
                }
            } else {
                res.status(200).send({
                    Result: item
                });
            }
        });
    });

    /* Get all items in the database. Response should be in the following format
     {
     Result: (Array of objects: all items in the database)
     } */
    app.get('/db', function (req, res, next) {
        db.getAll(function (err, items) {
            if (err) {
                next(err); //HINT: calling next with an error automatically handles the error and sends a response to the user.
            } else {
                res.status(200).send({
                    Result: items
                });
            }
        });
    });

    /*Creates the item. Response should be in the following format:
     {
     Result: (Object: item that was created)
     }
     with a status code of 201.

     If another item exists with the same id we want to return:
     {
     Error: <errorMessage>
     }
     with a status code of 400.*/
    app.post('/db', function (req, res, next) {
        var item = req.body;
        db.addItem(item, function (err, createdItem) {
            if (err) {
                if (err !== 'Item with the same id already exists') {
                    next(err);
                } else {
                    res.status(400).send({
                        Error: err
                    });
                }
            } else {
                res.status(201).send({
                    Result: createdItem
                });
            }
        });
    });

    /*
     Updates the item with the specified id. Response should be in the following format:
     {
     Result: (Object: New state of the item with the specified id)
     }
     If the item doest not exist then an error must be returned to the user.
     {
     Error: 'Item not found'
     }
     with a status code of 404.
     */
    app.post('/db/:id', function (req, res, next) {
        var id = req.params.id;
        var item = req.body;

        db.updateById(id, item, function (error, updatedItem) {
            if (error) {
                if (error !== 'Item not found') {
                    next(error)
                } else {
                    res.status(404).send({
                        Error: error
                    });
                }
            } else {
                res.status(200).send({
                    Result: updatedItem
                });
            }
        });
    });

    /*
     Delete all items in the database. Response should contain the count of the delete items like so:
     {
     Result: (Number: count of the items)
     }
     */
    app.delete('/db', function (req, res, next) {
        db.deleteAll(function (error, deletedItemsCount) {
            if (error) {
                next(error);
            } else {
                res.status(200).send({
                    Result: deletedItemsCount
                });
            }
        });
    });

    /*
     Delete single item from the database by id. Response should contain the item that was deleted like so:
     {
     Result: (Object: item that was deleted)
     }
     If the item doest not exist then an error must be returned to the user.
     {
     Error: 'Item not found'
     }
     with a status code of 404.
     */
    app.delete('/db/:id', function (req, res, next) {
        var id = req.params.id;

        db.deleteById(id, function (error, deleteItem) {
            if (error) {
                if (error !== 'Item not found') {
                    next(error)
                } else {
                    res.status(404).send({
                        Error: error
                    });
                }
            } else {
                res.status(200).send({
                    Result: deleteItem
                });
            }
        });
    });
}

module.exports = {
    setup: setupRoutes
};