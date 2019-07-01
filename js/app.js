var svg = d3.select('svg'),
	width = +svg.attr('width'),
	height = +svg.attr('height');

var canvas = svg.append('g');

svg
	.append('rect')
	.attr('width', width)
	.attr('height', height)
	.style('fill', 'none')
	.style('pointer-events', 'all')
	.call(
		d3
			.zoom()
			.scaleExtent([1 / 2, 4])
			.on('zoom', zoomed)
	);

function zoomed() {
	canvas.attr('transform', d3.event.transform);
}

var nodes = [
	{ x: 432, y: 50 },
	{ x: 332, y: 150 },
	{ x: 532, y: 150 }
	// { x: 702, y: 150 },
	// { x: 902, y: 150 }
];

canvas
	.selectAll('circle .nodes')
	.data(nodes)
	.enter()
	.append('svg:rect')
	.attr('class', 'nodes')
	.attr('x', function(d) {
		return d.x;
	})
	.attr('y', function(d) {
		return d.y;
	})
	.attr('width', '150px')
	.attr('height', '50px')
	.attr('fill', 'black');

var links = [
	{ source: nodes[1], target: nodes[0] },
	{ source: nodes[2], target: nodes[0] }
	// { source: nodes[3], target: nodes[0] },
	// { source: nodes[4], target: nodes[0] }
];

canvas
	.selectAll('.line')
	.data(links)
	.enter()
	.append('line')
	.attr('x1', function(d) {
		return d.source.x + 75;
	})
	.attr('y1', function(d) {
		return d.source.y;
	})
	.attr('x2', function(d) {
		return d.target.x + 75;
	})
	.attr('y2', function(d) {
		return d.target.y + 50;
	})
	.style('stroke', '#fff');
