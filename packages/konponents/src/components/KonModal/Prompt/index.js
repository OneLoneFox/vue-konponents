// import component
import KonPrompt from './KonPrompt.vue';
import Vue from 'vue';

// extend vue to get a constructor
let konPromptConstuctor = Vue.extend(KonPrompt);

/**
 * create a function that creates an instance of the component and
 * recieves a callbacks for cancel and ok.
 * 
 * The ok callback takes a parameter for the input data.
 */
const prompt = (props) => {
    let instance = new konPromptConstuctor({
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

export default prompt;