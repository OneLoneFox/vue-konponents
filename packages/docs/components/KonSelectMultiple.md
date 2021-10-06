# Select multiple / tag picker

Custom select multiple input.

## Default

ª

<Demo konponentName="examples-KonSelectMultiple-default">
<<< @/.vuepress/components/examples/KonSelectMultiple/default.vue
</Demo>

## Collapse

Collapse.

<Demo konponentName="examples-KonSelectMultiple-collapse">
<<< @/.vuepress/components/examples/KonSelectMultiple/collapse.vue
</Demo>

## Array of objects and text/value attributes

When you set an array of objects the value returned on change is set to the **value-attribute** by default.
Whenever the value changes it will return an array with all the selected objects.

When using an array of objects you must set the value-attribute and text-attribute properties to existing properties on your objects.
These values are defaulted to text and value if none are provided.

<Demo konponentName="examples-KonSelectMultiple-object">
<<< @/.vuepress/components/examples/KonSelectMultiple/object.vue
</Demo>

## Filter

Filter.

<Demo konponentName="examples-KonSelectMultiple-filter">
<<< @/.vuepress/components/examples/KonSelectMultiple/filter.vue
</Demo>

## Scoped slot

The default slot in within the component exposes the properties `item` and `selected` for every item passed to the items prop.
This allows some extra flexibility and allows you to further style the way you show the selected and non-selected items.

<Demo konponentName="examples-KonSelectMultiple-slot">
<<< @/.vuepress/components/examples/KonSelectMultiple/slot.vue{12-14,25-27}
</Demo>

## Source code

<SourceCode>
<<< @/../konponents/src/components/KonSelect/Multiple/KonSelectMultiple.vue
</SourceCode>

## Option source code

<SourceCode>
<<< @/../konponents/src/components/KonSelect/option/KonOption.vue
</SourceCode>