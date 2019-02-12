function Microbio(id, colonyId, size, movementFrequency, posX, posY, movementRange, agressiveness, attack, resistance, currentResistance, procreationRate, procreationRandomnessRate, regeneration, averageAge, birthTime) {
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
	this.procreationRate = procreationRate;
	this.procreationRandomnessRate = procreationRandomnessRate;
	this.regeneration = regeneration;
	this.averageAge = averageAge;
	this.birthTime = birthTime;
}