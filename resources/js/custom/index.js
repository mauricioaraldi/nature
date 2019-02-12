$(function() {
	CANVAS = $('canvas')[0];
	CTX = CANVAS.getContext('2d');
	MICROBIOS = {};
	COLORS = ['#FF0000', '#00FF00', '#0000FF', '#000000', '#CCCCCC'];
	ID = 0;
	MAX_POPULATION = 500;
	CURRENT_TIME = 0;
	TICK_RATE = 50;
	PROCREATION_VARIATORS = ['size', 'movementFrequency', 'movementRange', 'agressiveness', 'attack', 'resistance', 'procreationRate', 'regeneration', 'averageAge'];
	MICROBIOS_ARRAY = [];
	
	CANVAS.height = $(document).height();
	CANVAS.width = $(document).width();
	
	MICROBIOS[++ID] = new Microbio(ID,
									1, //colonyId
									10, //size
									5, //movementFrequency
									10, //posX
									10, //posY
									10, //movementRange
									10, //agressiveness
									10, //attack
									10, //resistance
									10, //currentResistance
									3, //procreationRate
									1.5, //procreationRandomnessRate
									1, //regeneration
									100, //averageAge
									CURRENT_TIME //birthTime
								);
								
	MICROBIOS[++ID] = new Microbio(ID, 
									2, //colonyId
									10, //size
									5, //movementFrequency
									CANVAS.width - 10, //posX
									CANVAS.height - 10, //posY
									10, //movementRange
									10, //agressiveness
									10, //attack
									10, //resistance
									10, //currentResistance
									3, //procreationRate
									1.5, //procreationRandomnessRate
									1, //regeneration
									100, //averageAge
									CURRENT_TIME //birthTime
								);

	MICROBIOS[++ID] = new Microbio(ID, 
									3, //colonyId
									10, //size
									5, //movementFrequency
									10, //posX
									CANVAS.height - 10, //posY
									10, //movementRange
									10, //agressiveness
									10, //attack
									10, //resistance
									10, //currentResistance
									3, //procreationRate
									1.5, //procreationRandomnessRate
									1, //regeneration
									100, //averageAge
									CURRENT_TIME //birthTime
								);
								
	MICROBIOS[++ID] = new Microbio(ID, 
									4, //colonyId
									10, //size
									5, //movementFrequency
									CANVAS.width - 10, //posX
									10, //posY
									10, //movementRange
									10, //agressiveness
									10, //attack
									10, //resistance
									10, //currentResistance
									3, //procreationRate
									1.5, //procreationRandomnessRate
									1, //regeneration
									100, //averageAge
									CURRENT_TIME //birthTime
								);

	MICROBIOS[++ID] = new Microbio(ID, 
									5, //colonyId
									10, //size
									5, //movementFrequency
									CANVAS.width / 2, //posX
									CANVAS.height / 2, //posY
									10, //movementRange
									10, //agressiveness
									10, //attack
									10, //resistance
									10, //currentResistance
									3, //procreationRate
									1.5, //procreationRandomnessRate
									1, //regeneration
									100, //averageAge
									CURRENT_TIME //birthTime
								);
	
	setInterval(function() {
		tick();
	}, TICK_RATE);
});

function tick() {
	MICROBIOS_ARRAY = getValues(MICROBIOS);

	CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

	var i = MICROBIOS_ARRAY.length;
	while (i--) {
		var microbio = MICROBIOS_ARRAY[i];

		verifyMicrobioAge(microbio);
		procreateMicrobio(microbio);
		regenerateMicrobio(microbio);
		moveMicrobio(microbio);
		drawMicrobio(microbio);
	}
	
	verifyCollisions();
	
	CURRENT_TIME += 1;
}

function verifyMicrobioAge(microbio) {
	if ((CURRENT_TIME - microbio.birthTime) > microbio.averageAge) {
		delete MICROBIOS[microbio.id];
	}
}

function verifyCollisions() {
	var i1 = MICROBIOS_ARRAY.length;

	while (i1--) {
		var microbio1 = MICROBIOS_ARRAY[i1],
			i2 = i1;

		while (i2--) {
			var microbio2 = MICROBIOS_ARRAY[i2];

			if (microbio1.colonyId != microbio2.colonyId) {
				if (isCollision(microbio1, microbio2)) {
					var attackChance = Math.floor((Math.random() * 100));
					
					if (microbio1.agressiveness > attackChance
						|| microbio2.agressiveness > attackChance) {
						
						calculateDamage(microbio1, microbio2);
					}
				}
			}
		}
	}
}

function calculateDamage(microbio1, microbio2) {
	microbio1.currentResistance -= microbio2.attack;
	microbio2.currentResistance -= microbio1.attack;
	
	if (microbio1.currentResistance <= 0) {
		delete MICROBIOS[microbio1.id];
	} else {
		MICROBIOS[microbio1.id] = microbio1;
	}
	
	if (microbio2.currentResistance <= 0) {
		delete MICROBIOS[microbio2.id];
	} else {
		MICROBIOS[microbio2.id] = microbio2;
	}
};

function isCollision(microbio1, microbio2) {
	if (microbio1.posX < microbio2.posX + microbio2.size &&
		microbio1.posX + microbio1.size > microbio2.posX &&
		microbio1.posY < microbio2.posY + microbio2.size &&
		microbio1.size + microbio1.posY > microbio2.posY) {

		return true;
	}

	return false;
}

function regenerateMicrobio(microbio) {
	microbio.currentResistance += microbio.regeneration;

	if (microbio.currentResistance > microbio.resistance) {
		microbio.currentResistance = microbio.resistance;
	}
}

function procreateMicrobio(microbio) {
	if (MICROBIOS_ARRAY.length >= MAX_POPULATION) {
		return;
	}

	var procreationChance = Math.floor((Math.random() * 100) + 1);

	if (microbio.procreationRate >= procreationChance) {
		var spawn = new Microbio(
			++ID,
			microbio.colonyId, 
			null, null,
			microbio.posX + microbio.size, 
			microbio.posY + microbio.size, 
			null, null, null, null, null, null,
			microbio.procreationRandomnessRate,
			null, null, CURRENT_TIME
		);

		PROCREATION_VARIATORS.forEach(function(variator) {
			spawn[variator] = microbio[variator];

			if (Math.floor((Math.random() * 2) + 1) == 2) {
				if (Math.floor((Math.random() * 2) + 1) == 2) {
					spawn[variator] -= (Math.random() * microbio.procreationRandomnessRate);

					if (spawn[variator] < 0) {
						spawn[variator] = 0;
					}
				} else {
					spawn[variator] += (Math.random() * microbio.procreationRandomnessRate);
				}
			}
		});

		MICROBIOS[spawn.id] = spawn;
	}
}

function drawMicrobio(microbio) {
	CTX.fillStyle = COLORS[microbio.colonyId-1];
	CTX.fillRect( microbio.posX, microbio.posY, microbio.size, microbio.size );
}

function moveMicrobio(microbio) {
	var movementChanceX = Math.floor((Math.random() * microbio.movementFrequency)),
		movementChanceY = Math.floor((Math.random() * microbio.movementFrequency)),
		rearFrontX = Math.floor((Math.random() * 2) + 1),
		rearFrontY = Math.floor((Math.random() * 2) + 1),
		movementQuantityX = Math.floor((Math.random() * microbio.movementRange) + 1),
		movementQuantityY = Math.floor((Math.random() * microbio.movementRange) + 1);
	
	if (movementChanceX) {
		if (rearFrontX == 1) {
			microbio.posX -= movementQuantityX;
		} else {
			microbio.posX += movementQuantityX;
		}
		
		if (microbio.posX <= 0) {
			microbio.posX = 0;
		} else if ((microbio.posX + microbio.size) >= CANVAS.width) {
			microbio.posX = CANVAS.width - microbio.size;
		}
	}
	
	if (movementChanceY) {
		if (rearFrontY == 1) {
			microbio.posY -= movementQuantityY;
		} else {
			microbio.posY += movementQuantityY;
		}
		
		if (microbio.posY <= 0) {
			microbio.posY = 0;
		} else if ((microbio.posY + microbio.size) >= CANVAS.height) {
			microbio.posY = CANVAS.height - microbio.size;
		}
	}
}

function getValues(object) {
	var values = [];
	
	for (var k in object) {
		values.push(object[k]);
	}
	
	return values;
}