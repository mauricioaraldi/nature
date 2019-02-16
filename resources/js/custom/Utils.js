Utils = {};

/**
 * Gets a random number
 * 
 * @author mauricio.araldi
 * @since 0.2.0
 * 
 * @param {Float} minimum Minimum limit of the number
 * @param {Float} maximum Maximum limit of the number
 * @return {Integer} The random number generated
 */
Utils.getRandomNumber = (minimum, maximum) => {
	return Math.floor((Math.random() * maximum) + minimum);
};

/**
 * Verifies if a chance is a success
 * 
 * @author mauricio.araldi
 * @since 0.2.0
 * 
 * @param {Integer} successChance Chances of the verification to be success
 * @return {Boolean} If the verification was a success
 */
Utils.verifyChance = successChance => {
	return Utils.getRandomNumber(1, 100) <= successChance;
};