<template>
    <button
      class="kon-button"
      :class="{xs: xs, xl: xl, text: text, border: border, block: block, 'icon-only': iconOnly}"
      v-on="buttonListeners"
    >
        <div class="icon" v-if="!!$slots.icon">
            <!-- 
                @slot Allows adding a leading icon to the button.
             -->
            <slot name="icon"></slot>
        </div>
        <div class="content">
            <!-- 
                @slot Default slot for the button's content.
             -->
            <slot />
        </div>
    </button>
</template>

<script>
    import ripple from '../../utils/ripple/ripple';
    export default {
        name: 'KonButton',
        props: {
            /**
             * Determines if the component is in the loading state. If true it disables all interactions with it.
             */
            loading: {
                type: Boolean,
                default: false,
            },
            /**
             * Set button size to extra small.
             */
            xs: {
                type: Boolean,
                default: false,
            },
            /**
             * Set button size to extra large.
             */
            xl: {
                type: Boolean,
                default: false,
            },
            /**
             * Determines if the button should be a text button.
             */
            text: {
                type: Boolean,
                default: false,
            },
            /**
             * Determines if the button should be a border button.
             */
            border: {
                type: Boolean,
                default: false,
            },
            /**
             * Sets the button's padding evenly to allow icons to be placed as the content.
             */
            iconOnly: {
                type: Boolean,
                default: false,
            },
            /**
             * Sets the button's width to 100% of its parent element, including flex parents.
             */
            block: {
                type: Boolean,
                default: false,
            }
        },
        computed: {
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
