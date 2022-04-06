---
{
  "api": {
    "css_vars": [
      {
        "name": "--primary-color",
        "description": "",
        "default": "Determined by the theme.",
        "format": "{n},{n},{n}",
      },
      {
        "name": "--konponent-color",
        "description": "Internal copy of the primary color.",
        "default": "var(--primary-color)",
        "format": "{n},{n},{n}",
      },
      {
        "name": "--radius",
        "format": "{n}px",
      },
      {
        "name": "--padding",
      },
      {
        "name": "--default-foreground",
        "description": "Defines the text color of the default/filled button.",
        "default": "255,255,255",
        "format": "{n},{n},{n}",
      },
      {
        "name": "--text-idle-foreground",
        "description": "Defines the text color of the 'text' style button.",
        "default": "var(--konponent-color)",
        "format": "{n},{n},{n}",
      },
      {
        "name": "--border-idle-foreground",
        "description": "Defines the text color of the 'border' style button in its idle state.",
        "default": "var(--foreground-color)",
        "format": "{n},{n},{n}",
      },
      {
        "name": "--border-hover-foreground",
        "description": "Defines the text color of the 'border' style button in its hover/focus state.",
        "default": "255,255,255",
        "format": "{n},{n},{n}",
      },
      {
        "name": "--border-keyboard-foreground",
        "description": "Defines the text color of the 'border' style button in its focus-visible (keyboard only focus) state. Recommended to set the same color as the idle state.",
        "default": "var(--foreground-color)",
        "format": "{n},{n},{n}",
      },
    ]
  }
}
---

# Button

An elegant button with some states and utilities.

## Default

Default button without any options

<Example>
  <component is="examples-KonButton-default" />
  <template v-slot:snippet>

  <<< @/.vuepress/components/examples/KonButton/default.vue

  </template>
</Example>

## Size

You can set the appropiate size prop for your button

<Example>
  <component is="examples-KonButton-size" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonButton/size.vue
  
  </template>
</Example>

## Text
  
<Example>
  <component is="examples-KonButton-text" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonButton/text.vue
  
  </template>
</Example>

## Border

<Example>
  <component is="examples-KonButton-border" />
  <template v-slot:snippet>

  <<< @/.vuepress/components/examples/KonButton/border.vue

  </template>
</Example>

## Colors

<Example>
  <component is="examples-KonButton-colors" />
  <template v-slot:snippet>

  <<< @/.vuepress/components/examples/KonButton/colors.vue

  </template>
</Example>

## Icon button

The icon button simply makes the padding even on all sides withot forcing the aspect ratio, if you want a 1:1 aspect ratio you must ensure your icon is also 1:1.

Needless to say this property is valid with all variations.

<Example>
  <component is="examples-KonButton-icon" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonButton/icon.vue
  
  </template>
</Example>

## API

<API component="KonButton" />