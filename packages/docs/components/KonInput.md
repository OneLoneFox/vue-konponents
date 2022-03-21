---
{
  "api": {
    "prop_notes": "All extra attributes will be inherited to the native input.",
  }
}
---

# Input

...

## Default

<Example>
  <component is="examples-KonInput-default" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonInput/default.vue
  
  </template>
</Example>


## Label types

This component includes a couple of ways to add label to your input.

<Example>
  <component is="examples-KonInput-label" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonInput/label.vue
  
  </template>
</Example>

## Icons

Icons.

<Example>
  <component is="examples-KonInput-icon" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonInput/icon.vue
  
  </template>
</Example>

## Message

<Example>
  <component is="examples-KonInput-slotmessage" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonInput/slotmessage.vue
  
  </template>
</Example>

## Status

The status property adds some style modifications to the component
such as a shake animation to the label on error and colored text.

<Example>
  <component is="examples-KonInput-status" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonInput/status.vue
  
  </template>
</Example>

## API

<API component="KonInput" />