---
{
  "api": {
    "prop_notes": "All extra attributes will be inherited to the native input.",
    "props": [
      {
        "name": "value",
        "type": "number",
        "description": "If not using v-model syntax this is the value you're aiming for.",
        "options": "",
        "default": 0
      }
    ],
  }
}
---

# Stepper

Simple but useful number input.

## Default

Warning: v-model.number modifier must be used

<Example>
  <component is="examples-KonStepper-default" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonStepper/default.vue
  
  </template>
</Example>

## API

<API component="KonStepper" />