var direction = ['up', 'down', 'left', 'right'];

difference = function(a, b) {
	return a.filter(function(value) {
		return !b.includes(value);
	});
}

/*opposite = function(dir) {
	if (dir == 'up') {
		return 'down';
	} else if (dir == 'down') {
		return 'up';
	} else if (dir == 'left') {
		return 'right';
	} else if (dir == 'right') {
		return 'left';
	}
}*/

move = function(position, dir) {
	if (dir == 'up') {
		return {x: position.x, y: position.y - 1};
	} else if (dir == 'down') {
		return {x: position.x, y: position.y + 1};
	} else if (dir == 'left') {
		return {x: position.x - 1, y: position.y};
	} else if (dir == 'right') {
		return {x: position.x + 1, y: position.y};
	}
}

getConnectDir = function(map, position) {
	var connectDir = [];
	for (var dir in direction) {
		var newPosition = move(position, dir);
		if (newPosition.x < 0 || newPosition.x >= map.width || newPosition.y < 0 || newPosition.y >= map.height) {
			continue;
		}
		if (map[newPosition.x][newPosition.y] == 1) {
			connectDir.push(dir);
		}
	}
	return connectDir;
}

this.trace = function(map, target) {
	var validDir = getConnectDir(map, this.position);
	if (validDir.length == 0) {
		return;
	}
	var board = new Array(map.height);
	for (var i = 0; i < map.height; i++) {
		board[i] = new Array(map.width);
		for (var j = 0; j < map.width; j++) {
			board[i][j] = {level: 100000};
		}
	}
	board[this.position.x][this.position.y] = {level: 0, last: null, dir: undefined};
	var queue = [this.position];
	while ((queue[0].x == target.x && queue[0].y == target.y)) {
		var position = queue[0].position;
		var level = board[position.x][position.y].level;
		var validDir = getConnectDir(map, queue[0].position);
		for (var dir in validDir) {
			var newPosition = move(position, dir);
			if (newPosition.x < 0 || newPosition.x >= map.width || newPosition.y < 0 || newPosition.y >= map.height) {
				continue;
			}
			if (level + 1 < board[newPosition.x][newPosition.y].level) {
				board[newPosition.x][newPosition.y] = {level: level + 1, last: position, dir: dir};
			}
		}
	}
	var currentPosition = target;
	while (board[currentPosition.x][currentPosition.y].last != null) {
		currentPosition = board[currentPosition.x][currentPosition.y].last;
	}
	return board[currentPosition.x][currentPosition.y].dir;
}
