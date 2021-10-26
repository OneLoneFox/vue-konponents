---
{
  "api": {
    "prop_notes": "All extra attributes will be inherited to the native input.",
    "props": [
      {
        "name": "value",
        "type": "string|number|object",
        "description": "The value used to determine if the current radio is selected.\nIf not using v-model syntax this is the value you're aiming for.",
        "options": "",
        "default": null
      }
    ],
  }
}
---

# Radio

...

## Default

<Example>
  <component is="examples-KonRadio-default" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonRadio/default.vue
  
  </template>
</Example>

## API

<API component="KonRadio" />