---
{
  "events": [
    {
      "name": "close",
      "description": "Emitted when a user clicks on the close button or presses the Escape key."
    }
  ],
}
---

# Modal / Dialog

Allows for basic dialogs, prompts and custom content.

## Default

The modal component exposes 3 slots for showing content; header, default (content) and footer.

<Example>
  <component is="examples-KonModal-default" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonModal/default.vue
  
  </template>
</Example>
 
 ## Persistent

 Prevents the modal from closing by clicking outside or pressing the `ESC` key.

<Example>
  <component is="examples-KonModal-persistent" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonModal/persistent.vue
  
  </template>
</Example>

## Scrollable

Makes the modal's body have a maximum height and be scrollable.

<Example>
  <component is="examples-KonModal-scrollable" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonModal/scrollable.vue
  
  </template>
</Example>

## Fullscreen

Makes the modal take the entire screen, removes border-radius and size constraints (margins).

<Example>
  <component is="examples-KonModal-fullscreen" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonModal/fullscreen.vue
  
  </template>
</Example>

## Premades

Provides alternatives to native functions like `alert()`, `confirm()` and `prompt()`

### Alert

This is the equivalent of the native `alert()` function in js.

<Example>
  <component is="examples-KonModal-alert" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonModal/alert.vue
  
  </template>
</Example>

### Confirm

This is the equivalent of the native `confirm()` function in js.

<Example>
  <component is="examples-KonModal-confirm" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonModal/confirm.vue
  
  </template>
</Example>

### Prompt

This is the equivalent of the native `prompt()` function in js.

<Example>
  <component is="examples-KonModal-prompt" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonModal/prompt.vue
  
  </template>
</Example>

## API

### Modal

<API component="KonModal" />

### Alert

<API component="KonAlert" />

### Confirm

<API component="KonConfirm" />

### Prompt

<API component="KonPrompt" />
