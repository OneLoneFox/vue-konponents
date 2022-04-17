import * as components from './components';
import confirm from './components/KonModal/Confirm';
import prompt from './components/KonModal/Prompt';
import alert from './components/KonModal/Alert';
import notification from './components/KonNotification/Base';
import './styles/main.scss';

const Konponents = {
  install: function(Vue){
    for(const conponent in components){
      const component = components[conponent];
      
      Vue.component(component.name, component);
    }


    Vue.prototype.$kon = {
      confirm,
      prompt,
      alert,
      notification,
    };
  }
}

export default Konponents;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Konponents);
}