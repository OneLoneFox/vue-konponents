---
{
  "api": {
    "prop_notes": "All extra attributes will be inherited to the native input.",
    "props": [
      {
        "name": "val",
        "type": ["boolean", "array"],
        "description": "The value used to determine the state of the component.\nIf not using v-model syntax this is the value you're aiming for.",
        "options": "",
        "default": null
      }
    ],
  }
}
---

# Checkbox

...

## Default

<Example>
  <component is="examples-KonCheckbox-default" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonCheckbox/default.vue
  
  </template>
</Example>


## Array model

You can pass an array of values to v-model and set the value property of the checkbox to allow it to add and remove said value from the array.

__Note:__ One thing to note is that in order to allow this component to work as a standalone form component **v-model** does not use neither **checked** nor **value**, instead it uses the property **val** and the **change** event, this means you can use the **value** attribute wether your v-model (or val) attribute is a Boolean or an Array.

<Example>
  <component is="examples-KonCheckbox-array" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonCheckbox/array.vue
  
  </template>
</Example>

## API

<API component="KonCheckbox" />
