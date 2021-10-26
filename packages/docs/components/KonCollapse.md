# Collapse / Morph

## Default

The default behaviour is to simply collapse whatever is inside the component.

<Example>
  <component is="examples-KonCollapse-default" />
  <template v-slot:snippet>

  <<< @/.vuepress/components/examples/KonCollapse/default.vue

  </template>
</Example>

## Modes

This component has 3 different modes:

- mode="y" (default) - This is the default vertical collapse.
- mode="x" - This mode collapses the element's width.
- mode="both" - This mode collapses both the height and width of the element.

All modes support both absolute and fade properties.

<Example>
  <component is="examples-KonCollapse-modes" />
  <template v-slot:snippet>

  <<< @/.vuepress/components/examples/KonCollapse/modes.vue

  </template>
</Example>

## Absolute

Give the leaving element a position absolute style.

Works great for swapping elements as it also enables the incoming element
to inherit the leaving element's size and prevents awkward jumping.

Not recomended for single element collapse.

<Example>
  <component is="examples-KonCollapse-absolute" />
  <template v-slot:snippet>

  <<< @/.vuepress/components/examples/KonCollapse/absolute.vue

  </template>
</Example>

## Fade

Fade in/out the element(s).

Works better with absolute.

<Example>
  <component is="examples-KonCollapse-fade" />
  <template v-slot:snippet>

  <<< @/.vuepress/components/examples/KonCollapse/fade.vue

  </template>
</Example>

## Mixed

This transition component can also be nested to mix both swap functionality and collapse.

The parent component takes care of the collapse when no child is present with v-if and
default behaviour, and the child one takes care of the swapping.

<Example>
  <component is="examples-KonCollapse-mixed" />
  <template v-slot:snippet>

  <<< @/.vuepress/components/examples/KonCollapse/mixed.vue

  </template>
</Example>