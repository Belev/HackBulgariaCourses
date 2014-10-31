"use strict";

require('./config/chai');
var Node = require('../utilities/node');

describe('node tests', function () {
    describe('creating node tests', function () {
        it('expect to throw Error when create Node without given value', function () {
            function createNodeWithoutValue() {
                var node = new Node();
            }

            expect(createNodeWithoutValue).to.throw(Error);
        });

        it('newly created node should have properties value and empty children.', function () {
            var node = new Node('node');

            expect(node).to.have.property('_value');
            expect(node).to.have.property('_children').with.length(0);
        });
    });

    describe('getters tests', function () {
        it('getValue for created node should return the node value.', function () {
            var node = new Node('node');

            expect(node.getValue()).to.be.equal('node');
        });

        it('getChildren for node without children should return empty array.', function () {
            var node = new Node('node');

            expect(node.getChildren()).to.be.empty;
        });
    });

    describe('add child tests', function () {
        it('addChild with valid child node should add the child to the current node.', function () {
            var node = new Node('node');
            var child = new Node('child');

            node.addChild(child);

            expect(node.getChildren()).to.have.length(1);
            expect(node.hasChild('child')).to.be.true;
        });

        it('addChild with invalid type should throw Error.', function () {
            function addInvalidChildType() {
                var node = new Node('node');
                node.addChild('invalid');
            }

            assert.throw(addInvalidChildType, TypeError);
        });
    });
});