# Switch

...

This component is essentially the same as the KonSwitch.

## Default

<Demo konponentName="examples-KonSwitch-doc">
<<< @/docs/.vuepress/components/examples/KonSwitch-doc.vue
</Demo>


## Array model

You can pass an array of values to v-model and set the value property of the checkbox to allow it to add and remove said value from the array.

__Note:__ One thing to note is that in order to allow this component to work as a standalone form component **v-model** does not use neither **checked** nor **value**, instead it uses the property **val** and the **change** event, this means you can use the **value** attribute wether your v-model (or val) attribute is a Boolean or an Array.

<Demo konponentName="examples-KonSwitch-array-doc">
<<< @/docs/.vuepress/components/examples/KonSwitch-array-doc.vue
</Demo>

## Source code

<SourceCode>
<<< @/src/components/KonSwitch/Base/KonSwitch.vue
</SourceCode>