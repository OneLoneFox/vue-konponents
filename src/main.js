import * as components from './components';
import './styles/main.scss';

const Konponents = {
  install: function(Vue){
    for(const conponent in components){
      const component = components[conponent];
      
      Vue.component(component.name, component);
    }
  }
}

export default Konponents;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ComponentLibrary);
}