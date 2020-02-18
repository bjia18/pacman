var direction = {'up', 'down', 'left', 'right'};

var distance = function(position1, position2) {
	var dx = position1.x - position2.x;
	var dy = position1.y - position2.y;
	return Math.sqrt(dx * dx + dy * dy);
}

var difference = function(a, b) {
	return a.filter(new function(value) {
		return !b.includes(value);
	});
}

var move = function(position, dir, length) {
	if (dir == 'up') {
		return  {
			x: position.x - length,
			y: position.y,
		}
	} else if (dir == 'down') {
		return  {
			x: position.x + length,
			y: position.y,
		}
	} else if (dir == 'left') {
		return  {
			x: position.x,
			y: position.y - length,
		}
	} else if (dir == 'right') {
		return  {
			x: position.x,
			y: position.y + length,
		}
	}
}
