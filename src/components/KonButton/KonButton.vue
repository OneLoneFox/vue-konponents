<template>
    <button
      class="kon-button"
      :class="{xs: xs, xl: xl, text: text, border: border, 'icon-only': iconOnly}"
      v-on="buttonListeners"
    >
        <div class="icon" v-if="hasIconSlot">
            <slot name="icon"></slot>
        </div>
        <div class="content">
            <slot>Button</slot>
        </div>
    </button>
</template>

<script>
    import ripple from '../../utils/ripple/ripple';
    export default {
        name: 'KonButton',
        props: {
            loading: {
                type: Boolean,
            },
            xs: {
                type: Boolean,
            },
            xl: {
                type: Boolean,
            },
            text: {
                type: Boolean,
                default: false,
            },
            border: {
                type: Boolean,
                default: false,
            },
            iconOnly: {
                type: Boolean,
                default: false,
            }
        },
        computed: {
            hasIconSlot: function(){
                return !!this.$slots.icon;
            },
            buttonListeners: function(){
                return {
                    ...this.$listeners,
                    mousedown: (e) => {
                        let solid = this.text;
                        ripple(e, solid);
                        this.$emit('mousedown', e);
                    },
                };
            }
        },
    }
</script>
