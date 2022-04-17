import './ripple.scss';

const ripple = (e, solid = false) => {
	const duration = 350;
	// set a delay for the removeRipple the same as the effect duration and decrement it until nothing is left
	let removeDelay = duration * 0.7;
	setInterval(() => {
		// this will allow the effect to finish if the click is released before the effect is finished
		removeDelay = removeDelay > 0 ? removeDelay - 10 : 0;
	}, 10);
	const element = e.currentTarget;
	// Say we have an element at x = 50 and y = 50 on screen space
	const offset = element.getBoundingClientRect();
	/*
	 * We need to get the local click coordinate
	 * imagine we clicked at x = 10 y = 10 at local space on the component
	 * e.clientX will be 60 and e.clientY will be 60 too
	 * if we need local coordinates that's easy we simply substract the component position from the click position
	 * 60 - 50 = 10
	 */
	const dx = e.clientX - offset.left;
	const dy = e.clientY - offset.top;

	const rippleElement = document.createElement('div');
	rippleElement.classList.add('kon-ripple');
	if(solid){
		rippleElement.classList.add('kon-ripple-solid');
	}
	rippleElement.style.setProperty('--duration', `${duration}ms`);
	rippleElement.style.setProperty('--dx', `${dx}px`);
	rippleElement.style.setProperty('--dy', `${dy}px`);

	element.appendChild(rippleElement);
    
	// get the longest dimension of the element to make the ripple circle full size of the element
	let longestDimension;
	let offsetFromCenter;
	if(element.clientWidth > element.clientHeight){
		longestDimension = element.clientWidth;
		/*
		 * get the cursor offset based on the center of the element's 
		 * longest dimension so the effect only reaches the border of it
		 */
		offsetFromCenter = Math.abs((longestDimension / 2) - dx);
	}else{
		longestDimension = element.clientHeight;
		offsetFromCenter = Math.abs((longestDimension / 2) - dy);
	}
	/*
	 * make the effect grow the amount needed to reach the border
	 * why 1.35? good question, trial and error gave me 1.38 as the perfect number for a circle that reaaches the very edge
	 */
	const diameter = (longestDimension + offsetFromCenter) * 1.38;
	rippleElement.style.setProperty('--opacity', '1');
	rippleElement.style.setProperty('--dw', `${diameter}px`);
	rippleElement.style.setProperty('--dh', `${diameter}px`);

	/*
	 * console.table({
	 *     'dx': dx,
	 *     'dy': dy,
	 *     'ld': longestDimension,
	 *     'offsetFromCenter': offsetFromCenter,
	 *     'diamenter': diameter,
	 * });
	 */

	/*
	 * let removeDelay = true;
	 * setTimeout(() => {
	 *     // if the mouse is held down for the entire duration of the effect
	 *     // remove the effect rippleElement instantly, otherwise add a delay to let the effect finish
	 *     removeDelay = false;
	 * }, duration);
	 */

	function removeRipple(e){
		// remove after a delay to allow the effect to complete in quick click scenarios
		setTimeout(() =>{
			// fade out
			rippleElement.style.setProperty('--opacity', '0');
			setTimeout(() => {
				// add an extra delay for the fade out effect
				element.removeChild(rippleElement);
			}, duration * .5);
		}, removeDelay);
		element.removeEventListener('mouseup', removeRipple);
		element.removeEventListener('mouseleave', removeRipple);
	}

	// remove effect element after mouse leaves the element or click ends
	element.addEventListener('mouseup', removeRipple);
	element.addEventListener('mouseleave', removeRipple);
};

export default ripple;