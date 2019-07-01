var data = {
	name: '1',
	children: [
		{
			name: '1.1',
			children: [{ name: '1.1.1' }, { name: '1.1.2' }, { name: '1.1.3' }]
		},
		{ name: '1.2', children: [{ name: '1.2.1' }, { name: '1.2.2' }] }
	]
};

var dataStructure = d3.hierarchy(data);
var treeLayout = d3.tree().size([600, 250]);
var information = treeLayout(dataStructure);
console.log(information.links());

var circles = d3
	.select('svg g#circles')
	.selectAll('circles')
	.data(information.descendants());

circles
	.enter()
	.append('circle')
	.attr('cx', function(d) {
		return d.x;
	})
	.attr('cy', function(d) {
		return d.y;
	})
	.attr('r', 5);

var content = d3
	.select('svg g#info')
	.selectAll('text')
	.data(information.descendants());

content
	.enter()
	.append('text')
	.text(function(d) {
		return d.data.name;
	})
	.attr('x', function(d) {
		return d.x + 7;
	})
	.attr('y', function(d) {
		return d.y + 5;
	});

var connections = d3
	.select('svg g#lines')
	.selectAll('line')
	.data(information.links());

connections
	.enter()
	.append('line')
	.attr('x1', function(d) {
		return d.source.x;
	})
	.attr('y1', function(d) {
		return d.source.y;
	})
	.attr('x2', function(d) {
		return d.target.x;
	})
	.attr('y2', function(d) {
		return d.target.y;
	});
