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
            val: {
                default: '',
            },
            value: {
                default: '',
            },
            checked: { // Initial state
                type: Boolean,
                default: false,
            },
            label: {
                type: String,
            },
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