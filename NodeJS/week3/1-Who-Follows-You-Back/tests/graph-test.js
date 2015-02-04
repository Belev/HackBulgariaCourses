"use strict";

require('./config/chai');
var Node = require('../utilities/node');
var Graph = require('../utilities/graph');

describe('graph tests', function () {
    var graph;

    beforeEach(function () {
        graph = new Graph();
    });

    it('newly created graph should have empty nodes property', function () {
        expect(graph).to.have.property('_nodes').with.length(0);
    });

    it('if node does not exists findNode should return undefined', function () {
        expect(graph.findNode('test')).to.be.undefined;
    });

    describe('adding nodes and edges tests', function () {
        it('adding invalid type for node should throw TypeError', function () {
            function addInvalidChildType() {
                graph.addNode('invalid');
            }

            expect(addInvalidChildType).to.throw(TypeError);
        });

        it('adding valid node should add the node to graph nodes', function () {
            graph.addNode(new Node('node'));

            expect(graph.hasNode('node')).to.be.true;
            expect(graph.nodesCount()).to.be.equal(1);
        });

        it('adding connection between two unexisting nodes should create them and make the connection', function () {
            expect(graph.hasNode('node')).to.be.false;
            expect(graph.hasNode('child')).to.be.false;

            graph.addEdge('node', 'child');

            expect(graph.hasNode('node')).to.be.true;
            expect(graph.hasNode('child')).to.be.true;
            expect(graph.nodesCount()).to.be.equal(2);

            var nodeConnectionName = graph.findNode('node').getChildren()[0].getValue();
            expect(nodeConnectionName).to.be.equal('child');
        });

        it('adding connection between existing and unexisting nodes should create unexisting and make the connection', function () {
            graph.addNode(new Node('node'));

            expect(graph.hasNode('node')).to.be.true;
            expect(graph.hasNode('child')).to.be.false;
            expect(graph.nodesCount()).to.be.equal(1);

            graph.addEdge('node', 'child');

            expect(graph.hasNode('child')).to.be.true;
            expect(graph.nodesCount()).to.be.equal(2);

            var nodeConnectionName = graph.findNode('node').getChildren()[0].getValue();
            expect(nodeConnectionName).to.be.equal('child');
        });

        it('adding connection between existing nodes should create the connection', function () {
            graph.addNode(new Node('node'));
            graph.addNode(new Node('child'));

            graph.addEdge('node', 'child');

            var nodeConnectionName = graph.findNode('node').getChildren()[0].getValue();
            expect(nodeConnectionName).to.be.equal('child');
        });
    });

    describe('get neighbours tests', function () {
        it('if node exists getNeighborsFor should return all neighbours', function () {
            graph.addEdge('pesho', 'mariq');
            graph.addEdge('pesho', 'dimo');
            graph.addEdge('dimo', 'pesho');

            var peshoNeighbours = graph.getNeighboursFor('pesho');
            var dimoNeighbours = graph.getNeighboursFor('dimo');

            expect(peshoNeighbours.length).to.be.equal(2);
            expect(dimoNeighbours.length).to.be.equal(1);

            expect(peshoNeighbours[0].getValue()).to.be.equal('mariq');
            expect(peshoNeighbours[1].getValue()).to.be.equal('dimo');
            expect(dimoNeighbours[0].getValue()).to.be.equal('pesho');
        });

        it('if node exists but has got no neighbours getNeighboursFor should return empty array', function () {
            graph.addEdge('pesho', 'mariq');

            expect(graph.getNeighboursFor('mariq')).to.be.empty;
        });

        it('if node does not exist getNeighboursFor should return undefined', function () {
            expect(graph.getNeighboursFor('node')).to.be.undefined;
        });
    });

    describe('path between nodes tests', function () {
        it('if path between existing from node - to node exists should return true', function () {
            graph.addEdge('pesho', 'gosho');
            graph.addEdge('pesho', 'ani');
            graph.addEdge('pesho', 'mariq');
            graph.addEdge('mariq', 'dimo');
            graph.addEdge('dimo', 'joro');
            graph.addEdge('joro', 'georgi');

            expect(graph.pathBetween('pesho', 'joro')).to.be.true;
            expect(graph.pathBetween('mariq', 'dimo')).to.be.true;
            expect(graph.pathBetween('pesho', 'georgi')).to.be.true;
            expect(graph.pathBetween('joro', 'georgi')).to.be.true;
        });

        it('if path between existing from node - to node does not exist should return false', function () {
            graph.addEdge('pesho', 'gosho');
            graph.addEdge('pesho', 'ani');
            graph.addEdge('pesho', 'mariq');

            expect(graph.pathBetween('ani', 'pesho')).to.be.false;
            expect(graph.pathBetween('mariq', 'ani')).to.be.false;
            expect(graph.pathBetween('gosho', 'mariq')).to.be.false;
        });

        it('if from node or/and to node does not exists should return false', function () {
            graph.addEdge('pesho', 'mariq');
            graph.addEdge('mariq', 'dimo');
            graph.addEdge('dimo', 'joro');
            graph.addEdge('joro', 'georgi');

            expect(graph.pathBetween('dimitrinka', 'pesho')).to.be.false;
            expect(graph.pathBetween('mariq', 'dragoslav')).to.be.false;
            expect(graph.pathBetween('peshkata', 'goshkata')).to.be.false;
        })
    });
});