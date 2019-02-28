let CANVAS,
	CTX,
	TICKER,
	SCENE_OBJECTS = {},
	COLORS = ['#FF0000', '#00FF00', '#0000FF', '#000000', '#AAAAAA'],
	ID = 1,
	COLONY_ID = 1,
	MAX_SCENE_OBJECTS = 100,
	TICK_RATE = 25,
	PROCREATION_VARIATORS = ['size', 'movementFrequency', 'movementRange',
		'agressiveness', 'attack', 'resistance', 'ownProcreationRate', 'coupleProcreationRate',
		'regeneration', 'averageAge'];

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

	initialMicrobioLoad();
	
	TICKER = setInterval(() => {
		tick(Object.values(SCENE_OBJECTS));
	}, TICK_RATE);
};

/**
 * Ticks the animation
 * 
 * @author mauricio.araldi
 * @since 0.2.0
 */
function tick(microbios) {
	let lastColonyAlive = null,
		areTwoColoniesAlive = false,
		isStageFull = false,
		i;

	if (microbios.length >= MAX_SCENE_OBJECTS) {
		isStageFull = true;
	}

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

		let newBorn = microbio.tick(!isStageFull);

		if (newBorn) {
			newBorn.id = ++ID;
			SCENE_OBJECTS[ID] = newBorn;
		}

		drawMicrobio(microbio);
	}

	if (!areTwoColoniesAlive) {
		clearInterval(TICKER);
		alert(`Simulation finished\nLast colony alive: ${lastColonyAlive}\nTotal colonies reached: ${COLONY_ID}`);
	}
	
	verifyCollisions(microbios);
}

/**
 * Verifies if any microbios are colliding
 *
 * RN 2
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

			if (!hasCollided(microbio1, microbio2)) {
				continue;
			}

			tryToReproduce(microbio1, microbio2);
			tryToAttack(microbio1, microbio2);
		}
	}
}

/**
 * Try to make two microbios reproduce with each other
 * 
 * @author mauricio.araldi
 * @since 0.3.0
 *
 * @param {Microbio} microbio1 One of the microbios trying to reproduce
 * @param {Microbio} microbio2 One of the microbios trying to reproduce
 */
function tryToReproduce(microbio1, microbio2) {
	/* Rule 2.3 */
	if (microbio1.sex == microbio2.sex) {
		return;
	}

	let newBorn = microbio1.reproduce(microbio2);

	if (newBorn) {
		newBorn.id = ++ID;
		SCENE_OBJECTS[ID] = newBorn;
	}
}

/**
 * Try to make two microbios attack each other
 * 
 * @author mauricio.araldi
 * @since 0.3.0
 *
 * @param {Microbio} microbio1 One of the microbios trying to attack
 * @param {Microbio} microbio2 One of the microbios trying to attack
 */
function tryToAttack(microbio1, microbio2) {
	/* Rule 2.1 */
	if (microbio1.colonyId == microbio2.colonyId
		&& microbio1.sex != microbio2.sex) {
		return;
	}

	let attackChance = Utils.getRandomNumber(1, 100)
	
	if (microbio1.agressiveness > attackChance
		|| microbio2.agressiveness > attackChance) {
		calculateDamage(microbio1, microbio2);
	}
}

/**
 * Calculates the damage one microbio does to other when attacking
 * 
 * @author mauricio.araldi
 * @since 0.2.0
 * 
 * @param {Microbio} microbio1 One of the microbios taking part in fight
 * @param {Microbio} microbio2 One of the microbios taking part in fight
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
function hasCollided(microbio1, microbio2) {
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