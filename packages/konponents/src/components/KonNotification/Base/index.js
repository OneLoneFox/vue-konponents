import KonNotification from './KonNotification.vue';
import Vue from 'vue';

let konNotificationConstructor = Vue.extend(KonNotification);

/**
 * Attempts to obtain the notification container for the given position, if there's none it creates one and attaches it to the body.
 * @param {String} position The position of the desired container.
 * @returns {Element} Returns a reference to the container.
 */
const getNotificationContainer = (position) => {
	let positionedClassName = `kon-notification-container-${position}`;
	let container = document.querySelector(`.${positionedClassName}`);
	if(!container){
		container = document.createElement('div');
		container.classList.add('kon-notification-container', positionedClassName);
		document.body.appendChild(container);
	}
	return container;
}

/**
 * Create a function that creates and returns an instance.
 */
const notification = (props) => {
	// Define defaults
	let propsData = {
		position: 'bottom-right',
		...props,
	};
	let instance = new konNotificationConstructor({
		propsData,
	});
	
	let container = getNotificationContainer(propsData.position);

	// The attachable mixin handles the rest.
	instance.$props.attach = container;
	instance.$mount();
    // Change visibility after mounting to trigger transition.
	Vue.nextTick(() => {
		instance.show();
	});
	return instance;
}

export default notification;