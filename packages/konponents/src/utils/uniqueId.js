let idCount = 0;

/**
 * Dead simple unique ID implementation.
 * Borrowed from vue-select who borrowed it from lodash!
 * 
 * @returns {number}
 */
function uniqueId() {
	return ++idCount;
}

export default uniqueId;