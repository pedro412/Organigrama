var svg = d3
	.select('.container')
	.append('svg')
	.attr('width', '100%')
	.attr('height', 500)
	.append('g')
	.attr('transform', 'translate(50, 50)');

var data = [
	{
		child: 'John',
		parent: '',
		spouse: 'Isabella'
	},
	{
		child: 'Kevin',
		parent: 'John',
		spouse: 'Emma'
	},
	{
		child: 'Ann',
		parent: 'John',
		spouse: 'George'
	},
	{
		child: 'Aaron',
		parent: 'Kevin'
	},
	{
		child: 'Sarah',
		parent: 'Kevin',
		spouse: 'James'
	},
	{
		child: 'Hannah',
		parent: 'Ann',
		spouse: 'Tom'
	},
	{
		child: 'Mark',
		parent: 'Ann'
	},
	{
		child: 'Rose',
		parent: 'Sarah'
	},
	{
		child: 'Angel',
		parent: 'Sarah'
	},
	{
		child: 'Tom',
		parent: 'Hannah'
	}
];

var dataStructure = d3
	.stratify()
	.id(function(d) {
		return d.child;
	})
	.parentId(function(d) {
		return d.parent;
	})(data);

var treeStructure = d3.tree().size([800, 300]);
var information = treeStructure(dataStructure);

var connections = svg
	.append('g')
	.selectAll('path')
	.data(information.links());

connections
	.enter()
	.append('path')
	.attr('d', function(d) {
		return (
			'M' +
			d.source.x +
			',' +
			d.source.y +
			' v 50 H' +
			d.target.x +
			'V' +
			d.target.y
		);
	});

var rectangles = svg
	.append('g')
	.selectAll('rect')
	.data(information.descendants());

rectangles
	.enter()
	.append('rect')
	.attr('x', function(d) {
		return d.x - 40;
	})
	.attr('y', function(d) {
		return d.y - 20;
	})
	.on('mouseenter', function(d) {
		return d3
			.select('#details')
			.style('visibility', 'visible')
			.html(function() {
				if (d.data.spouse != undefined) {
					return 'Spouse: ' + d.data.spouse;
				} else {
					return 'No spouse';
				}
			});
	})
	.on('mouseleave', function() {
		d3.select('#details').style('visibility', 'hidden');
	});

var names = svg
	.append('g')
	.selectAll('text')
	.data(information.descendants());

names
	.enter()
	.append('text')
	.text(function(d) {
		return d.data.child;
	})
	.attr('x', function(d) {
		return d.x;
	})
	.attr('y', function(d) {
		return d.y;
	})
	.classed('name', true);
