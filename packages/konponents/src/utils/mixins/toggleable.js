var toggleableMixin = {
	props: {
		/**
		 * The id of the native input used to target the label.
		 * Defaults to an internal random  uid.
		 */
		id: {
			type: String,
		},
		/**
		 * The name of the native input.
		 */
		name: {
			type: String,
			default: '',
		},
		/**
		 * @model
		 */
		val: {
			type: [Boolean, Array],
			default: undefined,
		},
		/**
		 * The actual value of the checkbox.
		 * 
		 * Behaves the same as a native checkbox.
		 */
		value: {
			type: String,
			default: 'on',
		},
		/**
		 * State of the component.
		 * 
		 * Used only if readonly mode is set to true or using this component as native
		 * (without v-model).
		 */
		checked: {
			type: Boolean,
			default: false,
		},
		/**
		 * Disables all interactions with the component.
		 * 
		 * If set to true v-model becomes obsolete and checked should be used instead.
		 */
		readonly: {
			type: Boolean,
			default: false,
		},
		/**
		 * Disables all interactions with the component and lowers the opacity.
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Adds a label to the component.
		 * 
		 * The label also triggers interactions
		 */
		label: {
			type: String,
		},
		indeterminate: {
			type: Boolean,
		}
	},
	data: function(){
		return {
			_indeterminate: this.indeterminate,
			_checked: this.checked,
		};
	},
	computed: {
		isChecked: function(){
			if(this.val === undefined && !this.readonly){
				return this.$data._checked;
			}
			if(this.$data._indeterminate) {
				return false;
			}
			if(this.readonly){
				return this.checked;
			}
			if(typeof this.val === 'boolean'){
				return this.val;
			}
			if(Array.isArray(this.val)){
				let itemFound = this.val.find((item) => {
					return item === this.value;
				});
				return !!itemFound;
			}
		},
	},
	watch: {
		indeterminate: function(val){
			// force data update on prop update
			this.$nextTick(() => {this.$data._indeterminate = val;});
		}
	},
	methods: {
		/**
		 * Toggles the state of the component.
		 * Handles both val: Boolean and val: Array cases.
		 * 
		 * @fires change
		 */
		handleChange: function(e){
			if(this.val === undefined){
				let checked = e.target.checked;
				this.$data._checked = checked;
				this.$emit('change', e);
				return;
			}
			if(this.$data._indeterminate){
				this.$data._indeterminate = false;
				// override default behaviour to force checked on next change.
				if(typeof this.val === 'boolean'){
					this.$emit('change', true);
					return;
				}
			}
			if(typeof this.val === 'boolean'){
				this.$emit('change', !this.val);
			}
			if(Array.isArray(this.val)){
				let len = this.val.length;
				let values = [...this.val];
				values = values.filter((item) => {return item !== this.value;});
				// if nothing changed it means it wasn't there so we add it to the array
				if(values.length === len){
					values.push(this.value);
				}
				this.$emit('change', values);
			}
		},
	},
};

export default toggleableMixin;