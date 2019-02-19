function Microbio(id, colonyId, size, movementFrequency, posX, posY, movementRange,
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
	this.tick = (tryToReproduce = true) => {
		if (++this.age >= this.averageAge) {
			return this.die();
		}

		this.regenerate();
		this.randomMove();

		if (tryToReproduce) {
			return this.reproduce();
		}
	};

	/**
	 * Removes this microbio from current simulation
	 * 
	 * @author mauricio.araldi
	 * @since 0.2.0
	 */
	this.die = () => {
		delete SCENE_OBJECTS[this.id];
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
	 * @param {Microbio} partner Another microbio who is reproducing together with this one
	 * @return {Microbio} The new born microbio
	 * 
	 * @author mauricio.araldi
	 * @since 0.2.0
	 */
	this.reproduce = (partner) => {
		let willReproduce = Utils.verifyChance(this.coupleProcreationRate),
			parentsTooClose = false,
			newBorn;

		// Try again if there is a partner
		if (partner && !willReproduce) {
			willReproduce = Utils.verifyChance(partner.coupleProcreationRate);
		}

		if (!willReproduce) {
			return;
		}

		newBorn = new Microbio();

		newBorn.colonyId = this.colonyId;
		newBorn.posX = this.posX + this.size;
		newBorn.posY = this.posY + this.size;
		newBorn.sex = Utils.verifyChance(50) ? 'M' : 'F';

		if (partner) {
			let idDiff = Math.abs(this.id - partner.id);

			parentsTooClose = idDiff < 10 && this.colonyId === partner.colonyId;

			newBorn.procreationRandomnessRate = (this.procreationRandomnessRate / 2) + (partner.procreationRandomnessRate / 2);

			if (parentsTooClose) {
				 newBorn.procreationRandomnessRate -= 0.3;
			} else {
				newBorn.procreationRandomnessRate += 0.3;
			}
		} else {
			newBorn.procreationRandomnessRate = this.procreationRandomnessRate;
		}

		PROCREATION_VARIATORS.forEach(variator => {
			let willVariate = partner ? true : Utils.verifyChance(50),
				willBePositiveVariation = partner ? parentsTooClose : Utils.verifyChance(50);

			newBorn[variator] = this[variator];

			if (!willVariate) {
				return;
			}

			if (willBePositiveVariation) {
				if (partner) {
					newBorn[variator] = (this[variator] + this.procreationRandomnessRate) / 2;
					newBorn[variator] += (partner[variator] + partner.procreationRandomnessRate) / 2;
				} else {
					newBorn[variator] += Math.random() * this.procreationRandomnessRate;
				}
			} else {
				if (partner) {
					newBorn[variator] = (this[variator] - this.procreationRandomnessRate) / 2;
					newBorn[variator] += (partner[variator] - partner.procreationRandomnessRate) / 2;
				} else {
					newBorn[variator] -= Math.random() * this.procreationRandomnessRate;
				}

				if (newBorn[variator] < 0) {
					newBorn[variator] = 0;
				}
			}
		});

		if (partner && this.colonyId != partner.colonyId) {
			newBorn.colonyId = ++COLONY_ID;
			COLORS.push(mergeColors(COLORS[this.colonyId - 1], COLORS[partner.colonyId - 1]));
		}

		return newBorn;
	};
}