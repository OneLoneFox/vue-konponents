<template>
    <div
        class="kon-input"
        :class="[
            {
                'underline': underline,
                'has-label': label,
                'disabled': disabled,
                'has-leading-icon': !!$slots.leadingIcon,
                'has-trailing-icon': !!$slots.trailingIcon
            }, status
        ]"
    >
        <div class="kon-input-icon leading" v-if="!!$slots.leadingIcon">
            <!-- Simple 1:1 aspect ratio based on height -->
            <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" class="placeholder-svg"/>
            <div class="kon-input-icon-content">
                <slot name="leadingIcon" />
            </div>
        </div>
        <input
          :id="id || uid"
          :type="inputType"
          :value="value"
          :disabled="disabled"
          v-bind="$attrs"
          @input="$emit('input', $event.target.value)"
        >
        <div class="kon-input-icon trailing" v-if="!!$slots.trailingIcon">
            <!-- Simple 1:1 aspect ratio based on height -->
            <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" class="placeholder-svg"/>
            <div class="kon-input-icon-content">
                <slot name="trailingIcon" />
            </div>
        </div>
        <label
          :for="id || uid"
          class="kon-input-label"
          :class="{'is-placeholder': placeholderAsLabel, 'elevated': isElevated}"
          v-if="label"
        >
            {{ label }}
        </label>
        <transition name="kon-toggle-message">
            <div class="kon-input-message" v-if="!!$slots.message">
                <slot name="message" />
            </div>
        </transition>
    </div>
</template>

<script>
    import uniqueId from '../../../utils/uniqueId';
    export default {
        name: 'KonInput',
        inheritAttrs: false,
        props: {
            id: {
                type: String,
            },
            type: {
                type: String,
                default: 'text',
                validator: function(value){
                    let blacklist = ['radio', 'checkbox', 'range', 'submit'];
                    return !blacklist.includes(value);
                }
            },
            value: {
                type: String,
            },
            status: {
                type: String,
                default: 'default',
                validator: function(value){
                    let whitelist = ['default', 'success', 'warning', 'error'];
                    return whitelist.includes(value);
                }
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            label: {
                type: String,
            },
            placeholderAsLabel: {
                type: Boolean,
                default: false,
            },
            showPassword: {
                type: Boolean,
                default: false,
            },
            noMargin: {
                type: Boolean,
                default: false,
            },
            underline: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            inputType: function(){
                return (this.type === 'password' && this.showPassword) ? 'text' : this.type;
            },
            isElevated: function(){
                // let inputs with pre established "placeholders" be elevated by default so the placeholderAsLabel doesn't interfere
                let preformattedTypes = ['date', 'time', 'month', 'week'];
                return this.value !== '' || preformattedTypes.includes(this.type);
            },
        },
        beforeCreate: function(){
            this.uid = `konponent-${uniqueId()}`;
        },
    }
</script>