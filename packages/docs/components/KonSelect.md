---
{
  "api": {
    "props": [
      {
        "name": "value",
        "type": ["string", "number", "object"],
        "description": "If not using v-model syntax this is the value you're aiming for.",
        "options": "",
        "default": null
      }
    ],
    "events": [
      {
        "name": "invalid",
        "payload": [
          {
            "name": "item",
            "type": ["string", "object"],
            "description": "The invalid selected item"
          }
        ],
        "description": "Emitted when an invalid item is passed as the value. Is also emitted if the items property is updated but the value is not."
      }
    ],
  }
}
---

# Select

Custom select input.

  
## Default
  
<Example>
  <component is="examples-KonSelect-default" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelect/default.vue
  
  </template>
</Example>

## Return object and text/value properties

When you set an array of objects the value returned on change is set to the **value-attribute** by default.
It can also return the entire object if the **return-object** property is set to true.

When using an array of objects you must set the value-attribute and text-attribute properties to existing properties on your   objects.
These values are defaulted to text and value if none are provided.

<Example>
  <component is="examples-KonSelect-object" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelect/object.vue{8,9,10}
  
  </template>
</Example>

## Filter

Filter.

<Example>
  <component is="examples-KonSelect-filter" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelect/filter.vue
  
  </template>
</Example>

## Detached

Detached style

<Example>
  <component is="examples-KonSelect-detached" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelect/detached.vue
  
  </template>
</Example>

## API

<API component="KonSelect" />