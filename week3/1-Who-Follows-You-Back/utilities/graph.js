"use strict";

var Node = require('./node');

var Graph = (function () {
    function hasPathBetween(fromNode, toNode) {
        var toNodeValue = toNode.getValue();
        var hasPath = false;
        var visited = {};

        var queue = [];
        queue.push(fromNode);
        visited[fromNode.getValue()] = true;

        while (queue.length !== 0) {
            var currentNode = queue.shift();

            if (currentNode.getValue() === toNodeValue) {
                hasPath = true;
                break;
            }

            var children = currentNode.getChildren();

            children.forEach(function (childNode) {
                var childNodeValue = childNode.getValue();

                if (!visited[childNodeValue]) {
                    queue.push(childNode);
                    visited[childNode.getValue()] = true;
                }
            });
        }

        return hasPath;
    }

    function Graph() {
        this._nodes = [];
    }

    Graph.prototype = {
        addEdge: function (fromNodeValue, toNodeValue) {
            var fromNode = this.findNode(fromNodeValue);
            var toNode = this.findNode(toNodeValue);

            if (!fromNode) {
                fromNode = new Node(fromNodeValue);
                this.addNode(fromNode);
            }

            if (!toNode) {
                toNode = new Node(toNodeValue);
                this.addNode(toNode);
            }

            fromNode.addChild(toNode);
        },
        getNeighboursFor: function (nodeValue) {
            var node = this.findNode(nodeValue);

            return node ? node.getChildren() : undefined;
        },
        pathBetween: function (fromNodeValue, toNodeValue) {
            var fromNode = this.findNode(fromNodeValue);
            var toNode = this.findNode(toNodeValue);

            if (!fromNode || !toNode) {
                return false;
            }

            return hasPathBetween(fromNode, toNode);
        },
        findNode: function (nodeValue) {
            return this._nodes
                .filter(function (currentNode) {
                    return currentNode.getValue() === nodeValue;
                })[0];
        },
        hasNode: function (nodeValue) {
            return !!this.findNode(nodeValue);
        },
        addNode: function (node) {
            if (!(node instanceof Node)) {
                throw TypeError('Can not add node different from Node.');
            }

            this._nodes.push(node);
        },
        nodesCount: function () {
            return this._nodes.length;
        }
    };

    return Graph;
})();

module.exports = Graph;