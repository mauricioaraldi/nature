initialMicrobioLoad = () => {
	let positionsX = [null, 10, 10, CANVAS.width - 10, CANVAS.width - 10, 10, 10,
			CANVAS.width - 10, CANVAS.width - 10, CANVAS.width/2, CANVAS.width/2],
		positionsY = [null, 10, 10, CANVAS.height - 10, CANVAS.height - 10,
			CANVAS.height - 10, CANVAS.height - 10, 10, 10, CANVAS.height/2,CANVAS.height/2];

	for (let i = ID; i <= 10; i = ++ID) {
		COLONY_ID = Math.ceil(i/2);

		SCENE_OBJECTS[i] = new Microbio(
			i, //Id
			COLONY_ID, //colonyId
			10, //size
			80, //movementFrequency
			positionsX[i], //posX
			positionsY[i], //posY
			10, //movementRange
			10, //agressiveness
			10, //attack
			10, //resistance
			10, //currentResistance
			3, //ownProcreationRate
			3, //coupleProcreationRate
			2, //procreationRandomnessRate
			1, //regeneration
			1000, //averageAge
			0, //birthTime
			i%2 ? 'M' : 'F' //sex
		);
	}
};