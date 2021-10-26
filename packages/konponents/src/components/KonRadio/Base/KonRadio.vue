<template>
    <div class="kon-radio" :class="{'disabled': disabled}">
        <div class="kon-radio-content">
            <input
              type="radio"
              :id="uid"
              :value="value"
              :checked="isChecked"
              :disabled="disabled"
              @change="handleChange"
              v-bind="$attrs"
            >
            <div class="kon-radio-marker">
            </div>
        </div>
        <template v-if="label">
            <label :for="uid" class="kon-radio-label">
                {{ label }}
            </label>
        </template>
    </div>
</template>

<script>
    import uidMixin from '../../../utils/mixins/uid.js';
    export default {
        name: 'KonRadio',
        model: {
            prop: 'val',
            event: 'change',
        },
        inheritAttrs: false,
        mixins: [uidMixin],
        props: {
            /**
             * @model
             */
            val: {
                default: '',
            },
            /**
            * The actual value of the radio.
            * 
            * Behaves the same as a native radio.
            */
            value: {
                default: '',
            },
            /**
             * Adds a label to the component.
             * 
             * The label also triggers interactions.
             */
            label: {
                type: String,
            },
            /**
             * Disables all interactions with the component and lowers the opacity.
             */
            disabled: {
                type: Boolean,
                default: false,
            }
        },
        computed: {
            isChecked: function(){
                return this.value === this.val;
            }
        },
        methods: {
            handleChange: function(e){
                this.$emit('change', e.target.value);
            },
        },
    }
</script>