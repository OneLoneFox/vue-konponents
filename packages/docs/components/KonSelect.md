# Select

Custom select input.

## Default

<Demo konponentName="examples-KonSelect-default">
<<< @/.vuepress/components/examples/KonSelect/default.vue
</Demo>

## Return object and text/value properties

When you set an array of objects the value returned on change is set to the **value-attribute** by default.
It can also return the entire object if the **return-object** property is set to true.

When using an array of objects you must set the value-attribute and text-attribute properties to existing properties on your objects.
These values are defaulted to text and value if none are provided.

<Demo konponentName="examples-KonSelect-object">
<<< @/.vuepress/components/examples/KonSelect/object.vue{8,9,10}
</Demo>

## Filter

Filter.

<Demo konponentName="examples-KonSelect-filter">
<<< @/.vuepress/components/examples/KonSelect/filter.vue
</Demo>

## Detached

Detached style

<Demo konponentName="examples-KonSelect-detached">
<<< @/.vuepress/components/examples/KonSelect/detached.vue
</Demo>

## Source code

<SourceCode>
<<< @/../konponents/src/components/KonSelect/base/KonSelect.vue
</SourceCode>

## Option source code

<SourceCode>
<<< @/../konponents/src/components/KonSelect/option/KonOption.vue
</SourceCode>