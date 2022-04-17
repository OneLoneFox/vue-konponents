// import component
import KonConfirm from './KonConfirm.vue';
import Vue from 'vue';

// extend vue to get a constructor
let konConfirmConstructor = Vue.extend(KonConfirm);

/**
 * create a function that creates an instance of the component and
 * recieves a callbacks for cancel and ok.
 */
const confirm = (props) => {
	let instance = new konConfirmConstructor({
		propsData: {
			...props,
		},
	});
	instance.$mount();
	// Change visibility after mounting to trigger transition.
	Vue.nextTick(() => {
		instance.$data.isOpen = true;
	});
	return instance;
};

export default confirm;