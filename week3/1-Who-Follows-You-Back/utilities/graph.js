"use strict";

var Node = require('./node');

var Graph = (function () {
    function hasPathBetween(fromNode, toNode, wantSteps) {
        var toNodeValue = toNode.getValue();
        var hasPath = false;
        var steps = -1;
        var visited = {};

        var queue = [];
        fromNode.level = 0;
        queue.push(fromNode);
        visited[fromNode.getValue()] = true;

        while (queue.length !== 0) {
            var currentNode = queue.shift();

            if (currentNode.getValue() === toNodeValue) {
                hasPath = true;
                steps = currentNode.level;
                break;
            }

            var children = currentNode.getChildren();

            children.forEach(function (childNode) {
                childNode.level = currentNode.level + 1;
                var childNodeValue = childNode.getValue();

                if (!visited[childNodeValue]) {
                    queue.push(childNode);
                    visited[childNode.getValue()] = true;
                }
            });
        }

        return wantSteps ? steps : hasPath;
    }

    function createNodeString(node) {
        var nodeValue = node.getValue();
        var children = node.getChildren().map(function (child) {
            return child._value;
        });

        return nodeValue + ':[' + children + ']';
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
        pathBetween: function (fromNodeValue, toNodeValue, wantSteps) {
            var fromNode = this.findNode(fromNodeValue);
            var toNode = this.findNode(toNodeValue);

            if (!fromNode || !toNode) {
                return false;
            }

            return hasPathBetween(fromNode, toNode, wantSteps);
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
        },
        toString: function () {
            var result = [];
            for (var i in this._nodes) {
                result.push(createNodeString(this._nodes[i]));
            }

            return result;
        }
    };

    return Graph;
})();

module.exports = Graph;