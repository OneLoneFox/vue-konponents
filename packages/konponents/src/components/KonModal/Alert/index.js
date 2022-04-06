// import component
import KonAlert from './KonAlert.vue';
import Vue from 'vue';

// extend vue to get a constructor
let konAlertConstructor = Vue.extend(KonAlert);

/**
 * create a function that creates an instance of the component and
 * recieves a callbacks for cancel and ok.
 */
const alert = (props) => {
    let instance = new konAlertConstructor({
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

export default alert;