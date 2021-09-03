<template>
    <button 
        class="kon-option" 
        :class="{'selected': selected, 'disabled': disabled}"
        :disabled="disabled"
        @click="handleClick"
        @mousedown="handleMouseDown"
        @blur="handleBlur"
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
             * The value for the option
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
             * the current state of the option
             */
            selected: {
                type: Boolean,
            },
            disabled: {
                type: Boolean,
                default: false,
            }
        },
        methods: {
            handleMouseDown: function(e){
                if(!this.selected){
                    ripple(e, true);
                }
                this.$emit('mousedown', e);
            },
            handleClick: function(e){
                if(this.disabled){
                    return;
                }
                this.$emit('click', e);
            },
            handleBlur: function(e){
                // clicked or tabbed outside component
                // calls parent handler if required
                let isNotSelect = (e.relatedTarget && e.relatedTarget.closest('.kon-select') != this.$parent.$el);
                let isNotSelectMultiple = (e.relatedTarget && e.relatedTarget.closest('.kon-select-multiple') != this.$parent.$el);
                if(!e.relatedTarget || (isNotSelect && isNotSelectMultiple)){
                    this.$parent.handleBlur();
                }
            },
            // handleClick: function(e){
            //     console.log('clicked item');
            //     // tell the KonSelect element that this item was selected
            //     this.selectItem(this.value, this.label || this.value);
            //     // change the state of this option
            //     this.isSelected = true;
            //     this.$emit('click', e);
            // },
        },
    }
</script>