initialMicrobioLoad = () => {
	MICROBIOS[ID] = new Microbio(
		ID,
		COLONY_ID, //colonyId
		10, //size
		80, //movementFrequency
		10, //posX
		10, //posY
		10, //movementRange
		10, //agressiveness
		10, //attack
		10, //resistance
		10, //currentResistance
		30, //ownProcreationRate
		3, //coupleProcreationRate
		1.5, //procreationRandomnessRate
		1, //regeneration
		100, //averageAge
		CURRENT_TIME, //birthTime
		'F', //sex
		10 //loveChance
	);

	MICROBIOS[++ID] = new Microbio(
		ID,
		COLONY_ID, //colonyId
		10, //size
		80, //movementFrequency
		10, //posX
		10, //posY
		10, //movementRange
		10, //agressiveness
		10, //attack
		10, //resistance
		10, //currentResistance
		30, //ownProcreationRate
		3, //coupleProcreationRate
		1.5, //procreationRandomnessRate
		1, //regeneration
		100, //averageAge
		CURRENT_TIME, //birthTime
		'M', //sex
		10 //loveChance
	);

	MICROBIOS[++ID] = new Microbio(
		ID, 
		++COLONY_ID, //colonyId
		10, //size
		80, //movementFrequency
		CANVAS.width - 10, //posX
		CANVAS.height - 10, //posY
		10, //movementRange
		10, //agressiveness
		10, //attack
		10, //resistance
		10, //currentResistance
		30, //ownProcreationRate
		3, //coupleProcreationRate
		1.5, //procreationRandomnessRate
		1, //regeneration
		100, //averageAge
		CURRENT_TIME, //birthTime
		'F', //sex
		10 //loveChance
	);

	MICROBIOS[++ID] = new Microbio(
		ID, 
		COLONY_ID, //colonyId
		10, //size
		80, //movementFrequency
		CANVAS.width - 10, //posX
		CANVAS.height - 10, //posY
		10, //movementRange
		10, //agressiveness
		10, //attack
		10, //resistance
		10, //currentResistance
		30, //ownProcreationRate
		3, //coupleProcreationRate
		1.5, //procreationRandomnessRate
		1, //regeneration
		100, //averageAge
		CURRENT_TIME, //birthTime
		'M', //sex
		10 //loveChance
	);

	MICROBIOS[++ID] = new Microbio(
		ID, 
		++COLONY_ID, //colonyId
		10, //size
		80, //movementFrequency
		10, //posX
		CANVAS.height - 10, //posY
		10, //movementRange
		10, //agressiveness
		10, //attack
		10, //resistance
		10, //currentResistance
		30, //ownProcreationRate
		3, //coupleProcreationRate
		1.5, //procreationRandomnessRate
		1, //regeneration
		100, //averageAge
		CURRENT_TIME, //birthTime
		'F', //sex
		10 //loveChance
	);

	MICROBIOS[++ID] = new Microbio(
		ID, 
		COLONY_ID, //colonyId
		10, //size
		80, //movementFrequency
		10, //posX
		CANVAS.height - 10, //posY
		10, //movementRange
		10, //agressiveness
		10, //attack
		10, //resistance
		10, //currentResistance
		30, //ownProcreationRate
		3, //coupleProcreationRate
		1.5, //procreationRandomnessRate
		1, //regeneration
		100, //averageAge
		CURRENT_TIME, //birthTime
		'M', //sex
		10 //loveChance
	);

	MICROBIOS[++ID] = new Microbio(
		ID, 
		++COLONY_ID, //colonyId
		10, //size
		80, //movementFrequency
		CANVAS.width - 10, //posX
		10, //posY
		10, //movementRange
		10, //agressiveness
		10, //attack
		10, //resistance
		10, //currentResistance
		30, //ownProcreationRate
		3, //coupleProcreationRate
		1.5, //procreationRandomnessRate
		1, //regeneration
		100, //averageAge
		CURRENT_TIME, //birthTime
		'F', //sex
		10 //loveChance
	);

	MICROBIOS[++ID] = new Microbio(
		ID, 
		COLONY_ID, //colonyId
		10, //size
		80, //movementFrequency
		CANVAS.width - 10, //posX
		10, //posY
		10, //movementRange
		10, //agressiveness
		10, //attack
		10, //resistance
		10, //currentResistance
		30, //ownProcreationRate
		3, //coupleProcreationRate
		1.5, //procreationRandomnessRate
		1, //regeneration
		100, //averageAge
		CURRENT_TIME, //birthTime
		'M', //sex
		10 //loveChance
	);

	MICROBIOS[++ID] = new Microbio(
		ID, 
		++COLONY_ID, //colonyId
		10, //size
		80, //movementFrequency
		CANVAS.width / 2, //posX
		CANVAS.height / 2, //posY
		10, //movementRange
		10, //agressiveness
		10, //attack
		10, //resistance
		10, //currentResistance
		30, //ownProcreationRate
		3, //coupleProcreationRate
		1.5, //procreationRandomnessRate
		1, //regeneration
		100, //averageAge
		CURRENT_TIME, //birthTime
		'F', //sex
		10 //loveChance
	);

	MICROBIOS[++ID] = new Microbio(
		ID, 
		COLONY_ID, //colonyId
		10, //size
		80, //movementFrequency
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
};