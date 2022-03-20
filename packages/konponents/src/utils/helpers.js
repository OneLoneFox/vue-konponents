/**
 * Returns all keyboard focusable elements that are not disabled or aria-hidden
 * 
 * @param {HTMLElement} base 
 * @returns {Array}
 */
export function getKeyboardFocusable(base = document){
	// Thanks!!! https://zellwk.com/blog/keyboard-focusable-elements/
	return [
		...base.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
	].filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
}