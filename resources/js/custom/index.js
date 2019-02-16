let CANVAS,
	CTX,
	MICROBIOS = {},
	COLORS = ['#FF0000', '#00FF00', '#0000FF', '#000000', '#CCCCCC'],
	ID = 1,
	COLONY_ID = 1,
	MAX_POPULATION = 100,
	CURRENT_TIME = 0,
	TICK_RATE = 25,
	TICKER,
	PROCREATION_VARIATORS = ['size', 'movementFrequency', 'movementRange',
		'agressiveness', 'attack', 'resistance', 'ownProcreationRate', 'coupleProcreationRate',
		'regeneration', 'averageAge', 'loveChance'];

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
	
	TICKER = setInterval(() => {
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
	let i,
		lastColonyAlive = null,
		areTwoColoniesAlive = false;

	CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

	i = microbios.length;

	if (!i) {
		return;
	}

	while (i--) {
		let microbio = microbios[i];

		if (!lastColonyAlive) {
			lastColonyAlive = microbio.colonyId;
		}

		if (lastColonyAlive !== microbio.colonyId) {
			areTwoColoniesAlive = true;
		}

		microbio.tick();
		drawMicrobio(microbio);
	}

	if (!areTwoColoniesAlive) {
		clearInterval(TICKER);
		alert('Simulation finished');
	}
	
	verifyCollisions(microbios);
}

/**
 * Verifies if any microbios are colliding
 * 
 * @author mauricio.araldi
 * @since 0.2.0
 * 
 * @param {Array<Microbio>} microbios List of Microbios to check for collision
 */
function verifyCollisions(microbios) {
	let i1 = microbios.length;

	while (i1--) {
		let microbio1 = microbios[i1],
			i2 = i1;

		while (i2--) {
			let microbio2 = microbios[i2];

			if (!isCollision(microbio1, microbio2)) {
				continue;
			}

			var attackChance = Utils.getRandomNumber(1, 100),
				loveChance = Utils.getRandomNumber(1, 100);
			
			if (microbio1.agressiveness > attackChance
				|| microbio2.agressiveness > attackChance) {
				if (microbio1.colonyId == microbio2.colonyId
					&& microbio1.sex != microbio2.sex) {
					continue;
				}

				calculateDamage(microbio1, microbio2);
			}

			if (
				(microbio1.loveChance > loveChance
				|| microbio2.loveChance > loveChance)
				&& microbio1.sex != microbio2.sex
			) {
				coupleReproduce(microbio1, microbio2);
			}
		}
	}
}

/**
 * Occurs when two microbios of opposite sex match, a new spawn
 * with better genes may be born
 * 
 * @author mauricio.araldi
 * @since 0.2.0
 * 
 * @param {Microbio} microbio1 One of the microbios of the couple
 * @param {Microbio} microbio2 One of the microbios of the couple
 */
function coupleReproduce(microbio1, microbio2) {
	let idDIff = Math.abs(microbio1.id - microbio2.id),
		coupleProcreationChance = Utils.getRandomNumber(1, 100),
		spawn;

	if (microbio1.coupleProcreationRate <= coupleProcreationChance
		|| microbio2.coupleProcreationRate <= coupleProcreationChance) {
		return;
	}

	spawn = new Microbio(
		++ID,
		microbio1.colonyId, 
		null, null,
		microbio1.posX + microbio1.size, 
		microbio1.posY + microbio1.size, 
		null, null, null, null, null, null, null,
		microbio1.procreationRandomnessRate - 0.4
	);

	spawn.sex = Utils.verifyChance(50) ? 'F' : 'M';

	MICROBIOS[spawn.id] = spawn;

	if (idDIff <= 10 && microbio1.colonyId === microbio2.colonyId) {
		PROCREATION_VARIATORS.forEach(variator => {
			spawn[variator] = microbio1[variator];

			spawn[variator] -= (Math.random() * microbio1.procreationRandomnessRate);

			if (spawn[variator] < 0) {
				spawn[variator] = 0;
			}
		});

		return;
	}

	spawn.procreationRandomnessRate = microbio1.procreationRandomnessRate + 0.2;

	if (microbio1.colonyId != microbio2.colonyId) {
		spawn.colonyId = ++COLONY_ID;
		COLORS.push(mergeColors(COLORS[microbio1.colonyId - 1], COLORS[microbio2.colonyId - 1]));
	}

	PROCREATION_VARIATORS.forEach(function(variator) {
		spawn[variator] = (microbio1[variator] + microbio1.procreationRandomnessRate) / 2;
		spawn[variator] += (microbio2[variator] + microbio2.procreationRandomnessRate) / 2;
	});
}

/**
 * Calculates the damage one microbio does to other when attacking
 * 
 * @author mauricio.araldi
 * @since 0.2.0
 * 
 * @param {Microbio} microbio1 On of the microbios taking part in fight
 * @param {Microbio} microbio2 On of the microbios taking part in fight
 */
function calculateDamage(microbio1, microbio2) {
	microbio1.currentResistance -= microbio2.attack;
	microbio2.currentResistance -= microbio1.attack;
	
	if (microbio1.currentResistance <= 0) {
		microbio1.die();
	}
	
	if (microbio2.currentResistance <= 0) {
		microbio2.die();
	}
};

/**
 * Checks for collision between two microbios
 * 
 * @author mauricio.araldi
 * @since 0.2.0
 * 
 * @param {Microbio} microbio1 One of the microbios to check for collision
 * @param {Microbio} microbio2 One of the microbios to check for collision
 * @return {Boolean} If a collision ocurred
 */
function isCollision(microbio1, microbio2) {
	if (microbio1.posX < microbio2.posX + microbio2.size &&
		microbio1.posX + microbio1.size > microbio2.posX &&
		microbio1.posY < microbio2.posY + microbio2.size &&
		microbio1.size + microbio1.posY > microbio2.posY) {

		return true;
	}

	return false;
}

/**
 * Draws a microbio in the stage
 * 
 * @author mauricio.araldi
 * @since 0.2.0
 * 
 * @param {Microbio} microbio The microbio to be drawn
 */
function drawMicrobio(microbio) {
	CTX.fillStyle = COLORS[microbio.colonyId - 1];
	CTX.fillRect(microbio.posX, microbio.posY, microbio.size, microbio.size);
}

/**
 * Merges two colors in one
 * 
 * @author mauricio.araldi
 * @since 0.2.0
 *
 * @param {String} color1 One of the colors to merge
 * @param {String} color2 One of the colors to merge
 * @return {String} Hex of the new color
 */
function mergeColors(color1, color2) {
	let c1Segments = color1.slice(1).match(/.{1,2}/g),
		c2Segments = color2.slice(1).match(/.{1,2}/g),
		finalColor = [],
		i = c1Segments.length;

	while (i--) {
		let c1SegmentsAsInt = parseInt(c1Segments[i], 16),
			c2SegmentsAsInt = parseInt(c2Segments[i], 16),
			result = ((c1SegmentsAsInt + c2SegmentsAsInt) >> 1).toString(16);

		finalColor[i] = `0${result}`.slice(-2); 
	}

	return `#${finalColor.join('')}`.toUpperCase();
}