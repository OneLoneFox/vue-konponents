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
  }
}
---

# Select multiple / tag picker

Custom select multiple input.

## Default

Default behaviour.

<Example>
  <component is="examples-KonSelectMultiple-default" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelectMultiple/default.vue
  
  </template>
</Example>

## Label

Label and placeholder types.

<Example>
  <component is="examples-KonSelectMultiple-label" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelectMultiple/label.vue
  
  </template>
</Example>

## Collapse

Collapse.

<Example>
  <component is="examples-KonSelectMultiple-collapse" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelectMultiple/collapse.vue
  
  </template>
</Example>

## Array of objects and text/value attributes

Unlike the single select, the select multiple component returns an array of selected objects by default on change.
If you wish to return an array containing only the values you must set `return-values` to true.

When using an array of objects you must set the `value-attribute` and `text-attribute` properties to existing properties on your objects.
These values are defaulted to **text** and **value** if none are provided.

<Example>
  <component is="examples-KonSelectMultiple-object" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelectMultiple/object.vue
  
  </template>
</Example>

## Filter

Filter.

<Example>
  <component is="examples-KonSelectMultiple-filter" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelectMultiple/filter.vue
  
  </template>
</Example>

## Slots

### Default slot

The default slot exposes the properties `item` and `selected` for every item passed to the items prop.
This allows some extra flexibility and allows you to further style the way you show the selected and non-selected items.

<Example>
  <component is="examples-KonSelectMultiple-slot" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelectMultiple/slot.vue{12-14,25-27}
  
  </template>
</Example>

### Empty slot

The empty slot exposes the search value if search is filter is enabled.

<Example>
  <component is="examples-KonSelectMultiple-emptyslot" />
  <template v-slot:snippet>
  
  <<< @/.vuepress/components/examples/KonSelectMultiple/emptyslot.vue
  
  </template>
</Example>

## API

<API component="KonSelectMultiple" />