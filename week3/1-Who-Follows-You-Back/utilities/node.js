"use strict";

var Node = (function () {
    function Node(value) {
        if (!value) {
            throw new Error('Can not create node without value.');
        }

        this._value = value;
        this._children = [];
    }

    Node.prototype = {
        addChild: function (childNode) {
            if(!(childNode instanceof Node)) {
                throw TypeError('Can not add child different from Node.');
            }

            this._children.push(childNode);
        },
        getChildren: function () {
            return this._children;
        },
        getValue: function () {
            return this._value;
        },
        hasChild: function (childValue) {
            return !!this._children.filter(function (child) {
                return child.getValue() === childValue;
            })[0];
        }
    };

    return Node;
})();

module.exports = Node;