(function () {
    var ITEM_TYPES = Object.freeze({
        BEER: 'beer',
        FRIES: 'fries'
    });

    var beerAndFries = function (items) {
        var beers = [],
            fries = [],
            i,
            maximumScore;

        items.sort(function (a, b) {
            return b.score - a.score;
        });

        getBeersAndFries();
        maximumScore = calculateMaximumScore();

        return maximumScore;

        function getBeersAndFries() {
            for (i = 0; i < items.length; i += 1) {
                var currentItem = items[i];

                if (currentItem.type == ITEM_TYPES.BEER) {
                    beers.push(currentItem);
                } else if (currentItem.type == ITEM_TYPES.FRIES) {
                    fries.push(currentItem);
                }
            }
        }

        function calculateMaximumScore() {
            var length = items.length / 2,
                maxScore = 0,
                i;

            for (i = 0; i < length; i += 1) {
                maxScore += (beers[i].score * fries[i].score);
            }

            return maxScore;
        }
    };

    var tests = [
        [
            {
                type: "beer",
                score: 10
            },
            {
                type: "beer",
                score: 11
            },
            {
                type: "fries",
                score: 1
            },
            {
                type: "fries",
                score: 5
            }
        ],
        [
            {
                type: "beer",
                score: 1
            },
            {
                type: "beer",
                score: 11
            },
            {
                type: "fries",
                score: 0
            },
            {
                type: "fries",
                score: 50
            }
        ],
        [
            {
                type: "beer",
                score: 5
            },
            {
                type: "fries",
                score: 5
            }
        ],
        [],
        [
            {
                type: "beer",
                score: 1000
            },
            {
                type: "beer",
                score: 1010
            },
            {
                type: "beer",
                score: 1020
            },
            {
                type: "beer",
                score: 1030
            },
            {
                type: "beer",
                score: 1040
            },
            {
                type: "fries",
                score: 834
            },
            {
                type: "fries",
                score: 500
            },
            {
                type: "fries",
                score: -1
            },
            {
                type: "fries",
                score: 0
            },
            {
                type: "fries",
                score: 60
            }
        ]
    ];

    tests.forEach(function (items) {
        console.log(beerAndFries(items));
    });
})();
