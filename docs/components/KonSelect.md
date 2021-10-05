# Select

Custom select input.

## Default

<Demo konponentName="examples-KonSelect-doc">
<<< @/docs/.vuepress/components/examples/KonSelect-doc.vue
</Demo>

## Return object and text/value properties

When you set an array of objects the value returned on change is set to the **value-attribute** by default.
It can also return the entire object if the **return-object** property is set to true.

When using an array of objects you must set the value-attribute and text-attribute properties to existing properties on your objects.
These values are defaulted to text and value if none are provided.

<Demo konponentName="examples-KonSelect-object-doc">
<<< @/docs/.vuepress/components/examples/KonSelect-object-doc.vue{8,9,10}
</Demo>

## Filter

Filter.

<Demo konponentName="examples-KonSelect-filter-doc">
<<< @/docs/.vuepress/components/examples/KonSelect-filter-doc.vue
</Demo>

## Detached

Detached style

<Demo konponentName="examples-KonSelect-detached-doc">
<<< @/docs/.vuepress/components/examples/KonSelect-detached-doc.vue
</Demo>

## Source code

<SourceCode>
<<< @/src/components/KonSelect/base/KonSelect.vue
</SourceCode>

## Option source code

<SourceCode>
<<< @/src/components/KonSelect/option/KonOption.vue
</SourceCode>