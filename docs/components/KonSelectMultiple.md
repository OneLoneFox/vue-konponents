# Select multiple / tag picker

Custom select multiple input.

## Default

When you set an array of objects the value returned on change is set to the **value-attribute** by default.
It can also return the entire object if the **return-object** property is set to true.

When using an array of objects you must set the value-attribute and text-attribute properties to existing properties on your objects.
These values are defaulted to text and value if none are provided.

<Demo konponentName="examples-KonSelectMultiple-doc">
<<< @/docs/.vuepress/components/examples/KonSelect-doc.vue
</Demo>

## Source code

<SourceCode>
<<< @/src/components/KonSelect/Multiple/KonSelectMultiple.vue
</SourceCode>

## Option source code

<SourceCode>
<<< @/src/components/KonSelect/option/KonOption.vue
</SourceCode>