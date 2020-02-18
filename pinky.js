var pinky = function() {
	this.type = GHOSTS;

	this.dir = 'left';
	this.scale = 0.09;

	this.w = spriteSheet.map['redGhost'][this.dir].w;
	this.h = spriteSheet.map['redGhost'][this.dir].h;
	this.x = 390
	this.y = 275;

	this.step = 70;

	this.update = function(dt) {
		var targetPosition = move({x: pacman.x, y: pacman.y}, pacman,dir, (pacman.w + pacman.h) / 2 * 4);
		var collision = edgeDetection(this);
		var nocollision = difference(direction, collision);
		if (nocollision.length === 0) {
			return;
		}
		var length = this.step * dt;
		var minDistance(move(newPosition, nocollision[0], length), targetPosition);
		var newDir = nocollision[0];
		var newPosition = move({x: this.x, y: this.y}, nocollision[0], length);
		for (var i = 1; i < nocollision.length; i++) {
			var currentPosition = move({x: this.x, y: this.y}, nocollision[i], length);
			var currentDistance = distance(move({x: this.x, y: this.y}, nocollision[i], this.step * dt), targetPosition);
			if (currentDistance < minDistance) {
				minDistance = currentDistance;
				newDir = nocollision[i];
				newPosition = currentPosition;
			}
		}
		this.dir = newDir;
		this.x = newPosition.x;
		this.y = newPosition.y;
	}
}
