<template>
    <button 
        class="kon-option" 
        :class="{'selected': selected}"
        :disabled="disabled"
        @click="handleClick"
        @mousedown="handleMouseDown"
        @blur="handleBlur"
        tabindex="-1"
        type="button"
    >
        <!-- 
            @slot Option Content
                @binding {boolean} isSelected is this option selected
         -->
        <slot :selected="selected" />
    </button>
</template>

<script>
    import ripple from '../../../utils/ripple/ripple';
    export default {
        name: 'KonOption',
        props: {
            /**
             * The value for the option.
             */
            value: [Number, String],
            /**
             * The label to be displayed at KonSelect when this item is selected.
             * If this is not provided it will fallback to the value.
             */
            label: {
                type: String,
                default: '',
            },
            /**
             * The current state of the option.
             */
            selected: {
                type: Boolean,
            },
            /**
             * Disables any interaction with the component and lowers opacity.
             */
            disabled: {
                type: Boolean,
                default: false,
            }
        },
        inject: ['handleParentBlur', 'parentComponent'],
        methods: {
            /**
             * Adds a ripple effect on mouse down
             * 
             * @returns {void}
             */
            handleMouseDown: function(e){
                if(!this.selected){
                    ripple(e, true);
                }
                this.$emit('mousedown', e);
            },
            /**
             * Re emits the click event if the option is not disabled.
             * 
             * @returns {void}
             */
            handleClick: function(e){
                if(this.disabled){
                    return;
                }
                this.$emit('click', e);
            },
            /**
             * Checks if the user clicked or tabbed outside the component.
             * Requires the injected parent component injected by the parent itself
             * in order to skip the transition-group as the $parent within the options list.
             * 
             * @returns {void}
             */
            handleBlur: function(e){
                let isNotSelect = (e.relatedTarget && e.relatedTarget.closest('.kon-select') != this.parentComponent.$el);
                let isNotSelectMultiple = (e.relatedTarget && e.relatedTarget.closest('.kon-select-multiple') != this.parentComponent.$el);
                if(!e.relatedTarget || (isNotSelect && isNotSelectMultiple)){
                    this.handleParentBlur();
                }
            },
        },
    }
</script>