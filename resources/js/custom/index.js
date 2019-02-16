let CANVAS,
	CTX,
	MICROBIOS = {},
	COLORS = ['#FF0000', '#00FF00', '#0000FF', '#000000', '#CCCCCC'],
	ID = 1,
	COLONY_ID = 1,
	MAX_POPULATION = 500,
	CURRENT_TIME = 0,
	TICK_RATE = 30,
	PROCREATION_VARIATORS = ['size', 'movementFrequency', 'movementRange', 'agressiveness', 'attack', 'resistance', 'ownProcreationRate', 'coupleProcreationRate', 'regeneration', 'averageAge', 'sex', 'loveChance'];

/**
 * App initialization
 * 
 * @author mauricio.araldi
 * @since 0.2.0
 */
window.onload = () => {
	let body = document.body,
		html = document.documentElement;

	CANVAS = document.querySelector('canvas');
	CTX = CANVAS.getContext('2d');

	CANVAS.height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	CANVAS.width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
	
	setInterval(() => {
		tick(Object.values(MICROBIOS));
		CURRENT_TIME++;
	}, TICK_RATE);

	initialMicrobioLoad();
};

/**
 * Ticks the animation
 * 
 * @author mauricio.araldi
 * @since 0.2.0
 */
function tick(microbios) {
	let i;

	CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

	i = microbios.length;

	if (!i) {
		return;
	}

	while (i--) {
		let microbio = microbios[i];

		microbio.tick();

		drawMicrobio(microbio);
	}
	
	// verifyCollisions(microbios);
}

function verifyCollisions() {
	var i1 = Object.values(MICROBIOS).length;

	while (i1--) {
		var microbio1 = Object.values(MICROBIOS)[i1],
			i2 = i1;

		while (i2--) {
			var microbio2 = Object.values(MICROBIOS)[i2];

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

function drawMicrobio(microbio) {
	CTX.fillStyle = COLORS[microbio.colonyId-1];
	CTX.fillRect( microbio.posX, microbio.posY, microbio.size, microbio.size );
}

function averageRGB() {
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
}