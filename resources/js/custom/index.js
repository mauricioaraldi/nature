$(function() {
	CANVAS = $('canvas')[0];
	CTX = CANVAS.getContext('2d');
	MICROBIOS = {};
	COLORS = ['#FF0000', '#00FF00', '#0000FF', '#000000', '#CCCCCC'];
	ID = 0;
	COLONY_ID = 1;
	MAX_POPULATION = 500;
	CURRENT_TIME = 0;
	TICK_RATE = 30;
	PROCREATION_VARIATORS = ['size', 'movementFrequency', 'movementRange', 'agressiveness', 'attack', 'resistance', 'ownProcreationRate', 'coupleProcreationRate', 'regeneration', 'averageAge', 'sex', 'loveChance'];
	MICROBIOS_ARRAY = [];
	
	CANVAS.height = $(document).height();
	CANVAS.width = $(document).width();
	
	MICROBIOS[++ID] = new Microbio(ID,
									COLONY_ID, //colonyId
									10, //size
									5, //movementFrequency
									10, //posX
									10, //posY
									10, //movementRange
									10, //agressiveness
									10, //attack
									10, //resistance
									10, //currentResistance
									3, //ownProcreationRate
									3, //coupleProcreationRate
									1.5, //procreationRandomnessRate
									1, //regeneration
									100, //averageAge
									CURRENT_TIME, //birthTime
									'F', //sex
									10 //loveChance
								);

	MICROBIOS[++ID] = new Microbio(ID,
									COLONY_ID, //colonyId
									10, //size
									5, //movementFrequency
									10, //posX
									10, //posY
									10, //movementRange
									10, //agressiveness
									10, //attack
									10, //resistance
									10, //currentResistance
									3, //ownProcreationRate
									3, //coupleProcreationRate
									1.5, //procreationRandomnessRate
									1, //regeneration
									100, //averageAge
									CURRENT_TIME, //birthTime
									'M', //sex
									10 //loveChance
								);
								
	MICROBIOS[++ID] = new Microbio(ID, 
									++COLONY_ID, //colonyId
									10, //size
									5, //movementFrequency
									CANVAS.width - 10, //posX
									CANVAS.height - 10, //posY
									10, //movementRange
									10, //agressiveness
									10, //attack
									10, //resistance
									10, //currentResistance
									3, //ownProcreationRate
									3, //coupleProcreationRate
									1.5, //procreationRandomnessRate
									1, //regeneration
									100, //averageAge
									CURRENT_TIME, //birthTime
									'F', //sex
									10 //loveChance
								);

	MICROBIOS[++ID] = new Microbio(ID, 
									COLONY_ID, //colonyId
									10, //size
									5, //movementFrequency
									CANVAS.width - 10, //posX
									CANVAS.height - 10, //posY
									10, //movementRange
									10, //agressiveness
									10, //attack
									10, //resistance
									10, //currentResistance
									3, //ownProcreationRate
									3, //coupleProcreationRate
									1.5, //procreationRandomnessRate
									1, //regeneration
									100, //averageAge
									CURRENT_TIME, //birthTime
									'M', //sex
									10 //loveChance
								);

	MICROBIOS[++ID] = new Microbio(ID, 
									++COLONY_ID, //colonyId
									10, //size
									5, //movementFrequency
									10, //posX
									CANVAS.height - 10, //posY
									10, //movementRange
									10, //agressiveness
									10, //attack
									10, //resistance
									10, //currentResistance
									3, //ownProcreationRate
									3, //coupleProcreationRate
									1.5, //procreationRandomnessRate
									1, //regeneration
									100, //averageAge
									CURRENT_TIME, //birthTime
									'F', //sex
									10 //loveChance
								);

	MICROBIOS[++ID] = new Microbio(ID, 
									COLONY_ID, //colonyId
									10, //size
									5, //movementFrequency
									10, //posX
									CANVAS.height - 10, //posY
									10, //movementRange
									10, //agressiveness
									10, //attack
									10, //resistance
									10, //currentResistance
									3, //ownProcreationRate
									3, //coupleProcreationRate
									1.5, //procreationRandomnessRate
									1, //regeneration
									100, //averageAge
									CURRENT_TIME, //birthTime
									'M', //sex
									10 //loveChance
								);
								
	MICROBIOS[++ID] = new Microbio(ID, 
									++COLONY_ID, //colonyId
									10, //size
									5, //movementFrequency
									CANVAS.width - 10, //posX
									10, //posY
									10, //movementRange
									10, //agressiveness
									10, //attack
									10, //resistance
									10, //currentResistance
									3, //ownProcreationRate
									3, //coupleProcreationRate
									1.5, //procreationRandomnessRate
									1, //regeneration
									100, //averageAge
									CURRENT_TIME, //birthTime
									'F', //sex
									10 //loveChance
								);

	MICROBIOS[++ID] = new Microbio(ID, 
									COLONY_ID, //colonyId
									10, //size
									5, //movementFrequency
									CANVAS.width - 10, //posX
									10, //posY
									10, //movementRange
									10, //agressiveness
									10, //attack
									10, //resistance
									10, //currentResistance
									3, //ownProcreationRate
									3, //coupleProcreationRate
									1.5, //procreationRandomnessRate
									1, //regeneration
									100, //averageAge
									CURRENT_TIME, //birthTime
									'M', //sex
									10 //loveChance
								);

	MICROBIOS[++ID] = new Microbio(ID, 
									++COLONY_ID, //colonyId
									10, //size
									5, //movementFrequency
									CANVAS.width / 2, //posX
									CANVAS.height / 2, //posY
									10, //movementRange
									10, //agressiveness
									10, //attack
									10, //resistance
									10, //currentResistance
									3, //ownProcreationRate
									3, //coupleProcreationRate
									1.5, //procreationRandomnessRate
									1, //regeneration
									100, //averageAge
									CURRENT_TIME, //birthTime
									'F', //sex
									10 //loveChance
								);

	MICROBIOS[++ID] = new Microbio(ID, 
									COLONY_ID, //colonyId
									10, //size
									5, //movementFrequency
									CANVAS.width / 2, //posX
									CANVAS.height / 2, //posY
									10, //movementRange
									10, //agressiveness
									10, //attack
									10, //resistance
									10, //currentResistance
									2, //ownProcreationRate
									3, //coupleProcreationRate
									1.5, //procreationRandomnessRate
									1, //regeneration
									100, //averageAge
									CURRENT_TIME, //birthTime
									'M', //sex
									10 //loveChance
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
					var attackChance = Math.floor((Math.random() * 100)),
						loveChance = Math.floor((Math.random() * 100));
					
					if (microbio1.agressiveness > attackChance
						|| microbio2.agressiveness > attackChance) {
						
						calculateDamage(microbio1, microbio2);
					}

					if (
						(microbio1.loveChance > loveChance
						|| microbio2.loveChance > loveChance)
						&& microbio1.sex != microbio2.sex
					) {
						
						coupleProcreate(microbio1, microbio2);
					}
				}
			}
		}
	}
}

function coupleProcreate(microbio1, microbio2) {
	var idDIff = Math.abs(microbio1.id - microbio2.id),
		coupleProcreationChance = Math.floor((Math.random() * 100) + 1);

	if (microbio.coupleProcreationRate <= coupleProcreationChance) {
		return;
	}

	if (idDIff <= 5 && microbio1.colonyId === microbio2.colonyId) {
		var spawn = new Microbio(
			++ID,
			microbio1.colonyId, 
			null, null,
			microbio1.posX + microbio1.size, 
			microbio1.posY + microbio1.size, 
			null, null, null, null, null, null, null,
			microbio1.procreationRandomnessRate - 0.4,
			null, null, CURRENT_TIME, null
		);

		PROCREATION_VARIATORS.forEach(function(variator) {
			spawn[variator] = microbio1[variator];

			spawn[variator] -= (Math.random() * microbio.procreationRandomnessRate);

			if (spawn[variator] < 0) {
				spawn[variator] = 0;
			}

			if (Math.floor((Math.random() * 2) + 1) == 2) {
				if (variator == 'sex') {
					spawn[variator] = 'F';
				}
			} else {
				if (variator == 'sex') {
					spawn[variator] = 'M';
				}
			}
		});

		MICROBIOS[spawn.id] = spawn;
	} else {
		var spawn = new Microbio(
			++ID,
			++COLONY_ID, 
			null, null,
			microbio1.posX + microbio1.size, 
			microbio1.posY + microbio1.size, 
			null, null, null, null, null, null, null,
			microbio1.procreationRandomnessRate + 0.2,
			null, null, CURRENT_TIME, null
		);

		COLORS.push('#'+averageRGB(COLORS[microbio1.colonyId - 1].replace('#', ''), COLORS[microbio2.colonyId - 1].replace('#', '')));

		PROCREATION_VARIATORS.forEach(function(variator) {
			spawn[variator] = (microbio1[variator] + microbio1.procreationRandomnessRate) / 2;
			spawn[variator] += (microbio2[variator] + microbio2.procreationRandomnessRate) / 2;

			if (Math.floor((Math.random() * 2) + 1) == 2) {
				if (variator == 'sex') {
					spawn[variator] = 'F';
				}
			} else {
				if (variator == 'sex') {
					spawn[variator] = 'M';
				}
			}
		});

		MICROBIOS[spawn.id] = spawn;
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

	var ownProcreationChance = Math.floor((Math.random() * 100) + 1);

	if (microbio.ownProcreationRate >= ownProcreationChance) {
		var spawn = new Microbio(
			++ID,
			microbio.colonyId, 
			null, null,
			microbio.posX + microbio.size, 
			microbio.posY + microbio.size, 
			null, null, null, null, null, null, null,
			microbio.procreationRandomnessRate,
			null, null, CURRENT_TIME, null
		);

		PROCREATION_VARIATORS.forEach(function(variator) {
			spawn[variator] = microbio[variator];

			if (Math.floor((Math.random() * 2) + 1) == 2) {
				if (Math.floor((Math.random() * 2) + 1) == 2) {
					if (variator == 'sex') {
						spawn[variator] = 'F';
					}

					spawn[variator] -= (Math.random() * microbio.procreationRandomnessRate);

					if (spawn[variator] < 0) {
						spawn[variator] = 0;
					}
				} else {
					if (variator == 'sex') {
						spawn[variator] = 'M';
					}

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

var averageRGB = (function () {

  // Keep helper stuff in closures
  var reSegment = /[\da-z]{2}/gi;

  // If speed matters, put these in for loop below
  function dec2hex(v) {return v.toString(16);}
  function hex2dec(v) {return parseInt(v,16);}

  return function (c1, c2) {

    // Split into parts
    var b1 = c1.match(reSegment);
    var b2 = c2.match(reSegment);
    var t, c = [];

    // Average each set of hex numbers going via dec
    // always rounds down
    for (var i=b1.length; i;) {
      t = dec2hex( (hex2dec(b1[--i]) + hex2dec(b2[i])) >> 1 );

      // Add leading zero if only one character
      c[i] = t.length == 2? '' + t : '0' + t; 
    }
    return  c.join('');
  }
}());