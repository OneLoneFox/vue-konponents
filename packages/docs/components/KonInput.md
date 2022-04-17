---
{
  "api": {
    "prop_notes": "All extra attributes will be inherited to the native input.",
    "events": [
      {
        "name": "click-leading",
        "description": "Emitted when a user clicks on the leading icon, adding this listener will add :hover styles to the icon container."
      },
      {
        "name": "click-trailing",
        "description": "Emitted when a user clicks on the trailing icon, adding this listener will add :hover styles to the icon container."
      }
    ],
  },
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

Exposes slots that allow the usage of trailing and leading icons.

<Example>
  <component is="examples-KonInput-icon" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonInput/icon.vue
  
  </template>
</Example>

## Show Password

Allows inputs of type password to change to text back and forth.

<Example>
  <component is="examples-KonInput-showpassword" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonInput/showpassword.vue{7,8,9}
  
  </template>
</Example>

## Message

Exposes a slot to show a message below the input.

<Example>
  <component is="examples-KonInput-slotmessage" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonInput/slotmessage.vue
  
  </template>
</Example>

## Sizing and spacing

The properties `full-width` and `has-margin` allow the input to have full width
of its container and add margin for labels and messages respectively.

<Example>
  <component is="examples-KonInput-sizing" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonInput/sizing.vue
  
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