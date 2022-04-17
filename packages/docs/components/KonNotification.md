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

# Notification

...

## Default

...

<Example>
  <component is="examples-KonNotification-default" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonNotification/default.vue
  
  </template>
</Example>

## Duration

You can set a duration in `ms` for the notification to close automatically.

<Example>
  <component is="examples-KonNotification-duration" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonNotification/duration.vue
  
  </template>
</Example>

## Custom Content

The component also allows custom content instead of only title and body.

<Example>
  <component is="examples-KonNotification-content" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonNotification/content.vue
  
  </template>
</Example>
 
## API

<API component="KonNotification" />
