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
      },
      {
        "name": "change",
        "payload": [
          {
            "name": "item",
            "type": ["string", "object"],
            "description": "The new selected item"
          }
        ],
        "description": "Emitted on user interaction, If not using v-model syntax this is the event you're looking for."
      }
    ],
  }
}
---

# Select

A custom select input designed with compatibility and a11y in mind.

This component can be used as a native form select without compromising design or functionality
and is fully keyboard accesible. If there's an issue with accesibility please feel free to submit an issue.
  
## Default

Default behaviour.

<Example>
  <component is="examples-KonSelect-default" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelect/default.vue
  
  </template>
</Example>

## Label

Label and placeholder types.

<Example>
  <component is="examples-KonSelect-label" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelect/label.vue
  
  </template>
</Example>

## Return object and text/value properties

When you set an array of objects the value returned on change is set to the `value-attribute` by default.
It can also return the entire object if the `return-object` property is set to true.

When using an array of objects you must set the value-attribute and text-attribute properties to existing properties on your   objects.
These values are defaulted to text and value if none are provided.

<Example>
  <component is="examples-KonSelect-object" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelect/object.vue{8,9,10}
  
  </template>
</Example>

## Slots

### Default slot

The default slot is used for every item in the list, it is a scoped slot 
that exposes the current **item** and a boolean that determines if the the current item
is *selected*.

<Example>
  <component is="examples-KonSelect-slotdefault" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelect/slotdefault.vue
  
  </template>
</Example>

### Empty slot

The empty slot is used to display a message when the list of items is empty or the 
filter resulted in an empty list.

The empty slot is also a scoped slot that exposes the **search** term if there's any.

<Example>
  <component is="examples-KonSelect-slotempty" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelect/slotempty.vue
  
  </template>
</Example>

### Message slot

Shows a message under the component.

<Example>
  <component is="examples-KonSelect-slotmessage" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelect/slotmessage.vue
  
  </template>
</Example>

## Filter

The select API provides several ways to filter the provided items.

### Default

The simples way to filter is to provide the `filterable` and `filter-input` properties
which will enable filtering and provide a built in input for searching.

<Example>
  <component is="examples-KonSelect-filter" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelect/filter.vue
  
  </template>
</Example>

### External filter value

You can also choose to pass a `search` property instead of `filter-input` to filter
by a value coming from somewhere else.

<Example>
  <component is="examples-KonSelect-filterexternal" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelect/filterexternal.vue
  
  </template>
</Example>

### Filter by

If you want to filter by something else than the text-attribute you can provide
the `filter-by` attribute and pass the name of one of your objects' properties.

<Example>
  <component is="examples-KonSelect-filterby" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelect/filterby.vue
  
  </template>
</Example>

### Custom filter function

You can also provide a custom function for filtering the items.

This function takes **items** and **searchTerm** as arguments and **returns an array**.

The default implementation uses lowercase string matching on the `text-attribute` 
or `filter-by` if it's provided.

You could use a fuzzy search library if you wanted (Example not provided).

<Example>
  <component is="examples-KonSelect-filterfunction" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelect/filterfunction.vue
  
  </template>
</Example>

## Disable items

You can provide a function to disable items.

<Example>
  <component is="examples-KonSelect-disableditem" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelect/disableditem.vue{10}
  
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