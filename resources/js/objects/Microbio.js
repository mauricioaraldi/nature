function Microbio(id, colonyId, size, movementFrequency, posX, posY, movementRange,
	agressiveness, attack, resistance, currentResistance, ownProcreationRate,
	coupleProcreationRate, procreationRandomnessRate, regeneration, averageAge,
	birthTime, sex, loveChance) {
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
	this.birthTime = birthTime;
	this.sex = sex;
	this.loveChance = loveChance;
}