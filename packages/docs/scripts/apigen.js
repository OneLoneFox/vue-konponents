const { promisify } = require('util');
const fs = require('fs');
const glob = promisify(require('glob'));
const { parse } = require('vue-docgen-api');

const baseDir = '../konponents/src/components';

const convertToKebabCase = str => (
    str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')
);

const listComponents = async () => {
    // Glob for your components.
    const files = await glob(`${baseDir}/**/*.vue`);
    console.log('files: ', files);
    return files;
};

/**
* Parses the component methods
* @param {import('vue-docgen-api').ComponentDoc} component
*/
const parseMethods = (component) => {
    const methods = [];
    component.methods.forEach(method => {
        const methodDoc = {
            name: '',
            description: '',
            returns: 'void',
            params: null,
        };
        methodDoc.name = method.name;
        methodDoc.description = method.description || '';
        if(method.returns){
            methodDoc.returns = method.returns.type.name == 'union' ? method.returns.type.elements.map(t => t.name) : method.returns.type.name;
        }
        if(method.params){
            methodDoc.params = [];
            method.params.forEach((p) => {
                let type;
                if(p.type){
                    type = b.type.name == 'union' ? b.type.elements.map(t => t.name) : b.type.name;
                }else{
                    type = null;
                }
                methodDoc.params.push({
                    name: p.name || 'unnamed',
                    description: p.description || '',
                    type: type,
                });
            });
        }
        methods.push(methodDoc);
    });
    return methods;
};

/**
* Parses the component slots
* @param {import('vue-docgen-api').ComponentDoc} component
*/
const parseSlots = (component) => {
    const slots = [];
    component.slots.forEach((slot) => {
        const slotDoc = {
            name: '',
            description: '',
            bindings: null,
        };
        slotDoc.name = slot.name;
        slotDoc.description = slot.description || '';
        if(slot.scoped){
            slotDoc.bindings = [];
            slot.bindings.forEach((b) => {
                let type;
                if(b.type){
                    type = b.type.name == 'union' ? b.type.elements.map(t => t.name) : b.type.name;
                }else{
                    type = null;
                }
                slotDoc.bindings.push({
                    name: b.name || 'unnamed',
                    type: type,
                    description: b.description
                });
            });
        }
        slots.push(slotDoc);
    });
    return slots;
};

/**
* Parses the component tags
* @param {import('vue-docgen-api').ComponentDoc} component
*/
const parseAttributes = (component) => {
    const props = [];
    component.props.forEach((prop) => {
        // eslint-disable-next-line no-multi-assign
        const propDoc = {
            name: '',
            type: '',
            description: '',
            options: '',
            default: null
        };
        const propName = convertToKebabCase(prop.name);
        propDoc.name = propName;
        propDoc.description = prop.description || '';
        // if(prop.type) {
        //     propDoc.type = prop.type.name;
        // }
        if(prop.type) {
            propDoc.type = prop.type.name.indexOf('|') != -1 ? prop.type.name.split('|') : prop.type.name;
        }
        if(prop.values) {
            propDoc.options = prop.values;
        }
        if(prop.defaultValue){
            propDoc.default = prop.defaultValue.value.toString();
        }
        props.push(propDoc);
    });
    
    return props;
};

const parseDocs = (components) => {
    let attributes = {};
    let slots = {};
    let methods = {};
    components.forEach((component) => {
        const componentName = component.displayName;
        // const componentTag = convertToKebabCase(componentName);
        const componentTag = componentName;
        if (component.props) {
            attributes[componentTag] = parseAttributes(component);
        }
        if(component.slots){
            slots[componentTag] = parseSlots(component);
        }
        if(component.methods){
            methods[componentTag] = parseMethods(component);
        }
    });
    
    return [attributes, slots, methods];
};

const gen = async () => {
    const components = await listComponents();
    const componentDocsPromises = components.map(c => parse(c));
    const docs = await Promise.all(componentDocsPromises);
    const [attributes, slots, methods] = parseDocs(docs);
    
      fs.writeFileSync('.api/attributes.json', JSON.stringify(attributes, null, '\t'));
      fs.writeFileSync('.api/slots.json', JSON.stringify(slots, null, '\t'));
      fs.writeFileSync('.api/methods.json', JSON.stringify(methods, null, '\t'));
};

gen();