function Microbio(id = ++ID, colonyId, size, movementFrequency, posX, posY, movementRange,
	agressiveness, attack, resistance, currentResistance, ownProcreationRate,
	coupleProcreationRate, procreationRandomnessRate, regeneration, averageAge,
	age = 0, sex, loveChance) {
	this.id = id;
	this.colonyId = colonyId;
	this.size = size;
	this.movementFrequency = movementFrequency;
	this.posX = posX;
	this.posY = posY;
	this.movementRange = movementRange;
	this.agressiveness = agressiveness;
	this.attack = attack;
	this.resistance = resistance;
	this.currentResistance = currentResistance;
	this.ownProcreationRate = ownProcreationRate;
	this.coupleProcreationRate = coupleProcreationRate;
	this.procreationRandomnessRate = procreationRandomnessRate;
	this.regeneration = regeneration;
	this.averageAge = averageAge;
	this.age = age;
	this.sex = sex;
	this.loveChance = loveChance;

	/**
	 * Function that happens to this model every tick
	 * 
	 * @author mauricio.araldi
	 * @since 0.2.0
	 */
	this.tick = () => {
		if (++this.age >= this.averageAge) {
			return this.die();
		}

		this.regenerate();
		this.randomMove();
		this.selfReproduce();
	};

	/**
	 * Removes this microbio from current simulation
	 * 
	 * @author mauricio.araldi
	 * @since 0.2.0
	 */
	this.die = () => {
		delete MICROBIOS[this.id];
	};

	/**
	 * Regenerats some resistance according to regenarion
	 * 
	 * @author mauricio.araldi
	 * @since 0.2.0
	 */
	this.regenerate = () => {
		if (this.currentResistance < this.resistance) {
			this.currentResistance += this.regeneration;
		}
	};

	/**
	 * Executes a random movement
	 * 
	 * @author mauricio.araldi
	 * @since 0.2.0
	 */
	this.randomMove = () => {
		var willMoveX = Utils.verifyChance(this.movementFrequency),
			willMoveY = Utils.verifyChance(this.movementFrequency),
			willGoForwardX = Utils.verifyChance(50),
			willGoForwardY = Utils.verifyChance(50),
			movementQuantityX = Utils.getRandomNumber(1, this.movementRange),
			movementQuantityY = Utils.getRandomNumber(1, this.movementRange);
		
		if (willMoveX) {
			if (willGoForwardX) {
				this.posX += movementQuantityX;
			} else {
				this.posX -= movementQuantityX;
			}
			
			if (this.posX <= 0) {
				this.posX = 0;
			} else if ((this.posX + this.size) >= CANVAS.width) {
				this.posX = CANVAS.width - this.size;
			}
		}
		
		if (willMoveY) {
			if (willGoForwardY) {
				this.posY += movementQuantityY;
			} else {
				this.posY -= movementQuantityY;
			}
			
			if (this.posY <= 0) {
				this.posY = 0;
			} else if ((this.posY + this.size) >= CANVAS.height) {
				this.posY = CANVAS.height - this.size;
			}
		}
	};

	/**
	 * Verifies the chance and executes the self reproduction
	 * of a Microbio
	 * 
	 * @author mauricio.araldi
	 * @since 0.2.0
	 */
	this.selfReproduce = () => {
		if (Object.values(MICROBIOS).length >= MAX_POPULATION) {
			return;
		}

		let willReproduce = Utils.verifyChance(this.ownProcreationRate),
			newBorn;

		if (!willReproduce) {
			return;
		}

		newBorn = new Microbio(
			++ID,
			this.colonyId, 
			null, null,
			this.posX + this.size, 
			this.posY + this.size, 
			null, null, null, null, null, null, null,
			this.procreationRandomnessRate
		);

		newBorn.sex = Utils.verifyChance(50) ? 'M' : 'F';

		PROCREATION_VARIATORS.forEach(variator => {
			let willVariate = Utils.verifyChance(50),
				willBePositiveVariation = Utils.getRandomNumber(1, 2);

			newBorn[variator] = this[variator];

			if (!willVariate) {
				return;
			}

			if (willBePositiveVariation) {
				newBorn[variator] += Math.random() * this.procreationRandomnessRate;
			} else {
				newBorn[variator] -= Math.random() * this.procreationRandomnessRate;

				if (newBorn[variator] < 0) {
					newBorn[variator] = 0;
				}
			}
		});

		MICROBIOS[newBorn.id] = newBorn;
	};
}