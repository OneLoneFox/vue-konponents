<template>
    <div
        class="kon-input"
        :class="[
            {
                'underline': underline,
                'has-label': label,
                'disabled': disabled,
                'has-leading-icon': !!$slots.leadingicon,
                'has-trailing-icon': !!$slots.trailingicon,
                'has-margin': hasMargin,
                'full-width': fullWidth,
            }, status
        ]"
    >
        <div
          :class="{'leading-clickable': $listeners['click-leading']}"
          class="kon-input-icon leading"
          v-if="!!$slots.leadingicon"
          @click="$emit('click-leading')"
        >
            <div class="kon-input-icon-content">
                <!-- 
                    @slot Adds an icon to the left of the component
                 -->
                <slot name="leadingicon" />
            </div>
        </div>
        <input
          :id="id || uid"
          :type="inputType"
          :value="actualValue"
          :disabled="disabled"
          v-bind="$attrs"
          v-on="listeners"
        >
        <div
          :class="{'trailing-clickable': $listeners['click-trailing']}"
          class="kon-input-icon trailing"
          v-if="!!$slots.trailingicon"
          @click="$emit('click-trailing')"
        >
            <div class="kon-input-icon-content">
                <!-- 
                    @slot Adds an icon to the right of the component
                 -->
                <slot name="trailingicon" />
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
		 * Normal placeholder should not be used in conjunction with this property.
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
		 * Determines if the input has vertical margin.
		 * 
		 * The margin is just enough to let labels and messages not be occluded by other elements.
		 */
		hasMargin: {
			type: Boolean,
			default: false,
		},
		/**
		 * Determines if the component should take the full width of its container.
		 */
		fullWidth: {
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
	data: function(){
		return {
			_value: '',
		};
	},
	computed: {
		inputType: function(){
			return (this.type === 'password' && this.showPassword) ? 'text' : this.type;
		},
		isElevated: function(){
			// let inputs with pre established "placeholders" be elevated by default so the placeholderAsLabel doesn't interfere
			let preformattedTypes = ['date', 'time', 'month', 'week'];
			return this.value || this.$data._value !== '' || preformattedTypes.includes(this.type);
		},
		actualValue: function(){
			return this.value !== undefined ? this.value : this.$data._value;
		},
		listeners: function(){
			return {
				...this.$listeners,
				/**
				 * Handles input event.
				 * Sets the internal value and emits the input's value on input.
				 * 
				 * @param {Event} e - The input's event payload
				 * @fires input
				 * @returns {void}
				 */
				input: (e) => {
					this.$data._value = e.target.value;
					this.$emit('input', e.target.value);
				}
			};
		}
	},
	beforeCreate: function(){
		this.uid = `konponent-${uniqueId()}`;
	},
};
</script>