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

/**
 * Merges two colors in one
 * 
 * @author mauricio.araldi
 * @since 0.3.0
 *
 * @param {String} color1 One of the colors to merge
 * @param {String} color2 One of the colors to merge
 * @return {String} Hex of the new color
 */
Utils.mergeColors = (color1, color2) => {
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
};