---
{
    "api": {
        "props": [
            {
                "name": "loading",
                "type": "boolean",
                "desc": "Determines if the component is in the loading state. If true it disables all interactions with it.",
                "default": "false",
            },
            {
                "name": "xs",
                "type": "boolean",
                "desc": "Set the button size to be extra small.",
                "default": "false",
            },
            {
                "name": "xl",
                "type": "boolean",
                "desc": "Set the button size to be extra large.",
                "default": "false",
            },
            {
                "name": "text",
                "type": "boolean",
                "desc": "Determines if the button should be a text button.",
                "default": "false",
            },
            {
                "name": "border",
                "type": "boolean",
                "desc": "Determines if the button should be a border button.",
                "default": "false",
            },
            {
                "name": "iconOnly",
                "type": "boolean",
                "desc": "Sets the button's padding evenly to allow icons to be placed as the content.",
                "default": "false",
            }
        ],
    }
}
---

# Button

An elegant button with some states and utilities.

## Default

Default button without any options

<Demo konponentName="examples-KonButton-default">
<<< @/.vuepress/components/examples/KonButton/default.vue
</Demo>

## Size

You can set the appropiate size prop for your button

<Demo konponentName="examples-KonButton-size">
<<< @/.vuepress/components/examples/KonButton/size.vue
</Demo>

## Text

<Demo konponentName="examples-KonButton-text">
<<< @/.vuepress/components/examples/KonButton/text.vue
</Demo>

## Border

<Demo konponentName="examples-KonButton-border">
<<< @/.vuepress/components/examples/KonButton/border.vue
</Demo>

## Icon button

The icon button simply makes the padding even on all sides withot forcing the aspect ratio, if you want a 1:1 aspect ratio you must ensure your icon is also 1:1.

Needless to say this property is valid with all variations.

<Demo konponentName="examples-KonButton-icon">
<<< @/.vuepress/components/examples/KonButton/icon.vue
</Demo>

## Api
<API />

## Source code

<SourceCode>
<<< @/../konponents/src/components/KonButton/KonButton.vue
</SourceCode>
