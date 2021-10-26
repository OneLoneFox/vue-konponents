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
            <div class="kon-input-icon-content">
                <!-- 
                    @slot Adds an icon to the left of the component
                 -->
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
            <div class="kon-input-icon-content">
                <!-- 
                    @slot Adds an icon to the right of the component
                 -->
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
                <!-- 
                    @slot Shows a message below the input
                 -->
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
            /**
             * The id of the native input used to target the label.
             * Defaults to an internal random  uid.
             */
            id: {
                type: String,
            },
            /**
             * The native input type. It accepts any valid input type except for the following black list: 
             * radio, checkbox, range, submit
             * @values text, email, password, ...
             */
            type: {
                type: String,
                default: 'text',
                validator: function(value){
                    let blacklist = ['radio', 'checkbox', 'range', 'submit'];
                    return !blacklist.includes(value);
                }
            },
            /**
             * If not using v-model syntax this is the value you're aiming for.
             */
            value: {
                type: String,
            },
            /**
             * Changes the style of the component sligthly.
             * 
             * @values default, success, warning, error
             */
            status: {
                type: String,
                default: 'default',
                validator: function(value){
                    let whitelist = ['default', 'success', 'warning', 'error'];
                    return whitelist.includes(value);
                }
            },
            /**
             * Disables all interactions with the component and lowers the opacity.
             */
            disabled: {
                type: Boolean,
                default: false,
            },
            /**
             * Defines the component's label.
             */
            label: {
                type: String,
            },
            /**
             * If set to true, the label will mimic a placeholder when not focused
             * and shift to a normal label when focused or the value is not empty.
             * 
             * Normal placeholder should not be used with this property.
             * 
             * Note: date, time, month and week input types will always show as a normal label.
             */
            placeholderAsLabel: {
                type: Boolean,
                default: false,
            },
            /**
             * When true the input's type will change to text.
             */
            showPassword: {
                type: Boolean,
                default: false,
            },
            /**
             * @ignore
             */
            noMargin: {
                type: Boolean,
                default: false,
            },
            /**
             * @ignore
             */
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