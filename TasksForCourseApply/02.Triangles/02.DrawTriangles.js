(function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var clearButton = $('#clear-canvas-btn'),
        lineWidthElement = $('#line-width-input'),
        fillColorElement = $('#fill-color-input'),
        strokeColorElement = $('#stroke-color-input'),
        pointCount = 0,
        points = [];

    var areaTextColor = "#FFAF0F";

    addEventListeners();

    function draw(centerPoint, area) {
        var firstPoint = points[0],
            secondPoint = points[1],
            thirdPoint = points[2];

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        ctx.lineTo(secondPoint.x, secondPoint.y);
        ctx.stroke();
        ctx.lineTo(thirdPoint.x, thirdPoint.y);
        ctx.stroke();
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        area = Math.floor(area);
        var oldFillColor = ctx.fillStyle;
        ctx.fillStyle = areaTextColor;
        ctx.fillText(area.toString(), centerPoint.x, centerPoint.y);


        ctx.fillStyle = oldFillColor;
    }

    function addEventListeners() {
        clearButton.on('click', function () {
            ctx.clearRect(0, 0, 800, 800);
        });

        lineWidthElement.on('change', function () {
            ctx.lineWidth = lineWidthElement.val() || 1;
        });

        fillColorElement.on('change', function () {
            ctx.fillStyle = fillColorElement.val();
        });

        strokeColorElement.on('change', function () {
            ctx.strokeStyle = strokeColorElement.val();
        });

        $(canvas).on('click', function (ev) {
            pointCount++;
            var canvasRectangle = canvas.getBoundingClientRect();

            var x = ev.clientX - canvasRectangle.left,
                y = ev.clientY - canvasRectangle.top;

            points.push({ x: x, y: y});

            if (points.length == 3) {
                var centerPoint = getTriangleCenter(points[0], points[1], points[2]);
                var area = calculateTriangleArea(points);
                draw(centerPoint, area);
                points = [];
            }
        });
    }

    function getTriangleCenter(firstPoint, secondPoint, thirdPoint) {
        var centerX = (firstPoint.x + secondPoint.x + thirdPoint.x) / 3,
            centerY = (firstPoint.y + secondPoint.y + thirdPoint.y) / 3;

        return {
            x: centerX,
            y: centerY
        }
    }

    function calculateTriangleArea(points) {
        var sides = calculateTriangleSides();

        var halfPerimeter = (sides[0] + sides[1] + sides[2]) / 2;
        var area = Math.sqrt(halfPerimeter * (halfPerimeter - sides[0]) * (halfPerimeter - sides[1]) * (halfPerimeter - sides[2]) );

        return area;

        function calculateTriangleSides() {
            var sides = [];

            for(var i = 0; i < 3; i += 1) {
                var a = points[i],
                    b = points[(i + 1) % 3];

                var xSquared = (a.x - b.x) * (a.x - b.x),
                    ySquared = (a.y - b.y) * (a.y - b.y);

                var aBDistance = Math.sqrt(xSquared + ySquared);
                sides.push(aBDistance);
            }

            return sides;
        }
    }
})();