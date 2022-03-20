var attachableMixin = {
	props: {
		/**
		 * Determine the element to attach the modal to
		 * if false (default) it attaches to the body.
		 * Accepts Node and css selector string as values.
		 */
		attach: {
			default: false,
			validator: (val) => {
				if (typeof val === 'string' || typeof val === 'boolean') return true;
				return val.nodeType === Node.ELEMENT_NODE;
			}
		}
	},
	computed: {
		/**
		 * querySelector can be expensive so why don't we cache it?.
		 */
		target: function () {
			let target;
			if (!this.attach) {
				target = document.body;
			} else if (typeof this.attach === 'string') {
				target = document.querySelector(this.attach);
			} else {
				target = this.attach;
			}
			return target;
		}
	},
	methods: {
		attachToTarget() {
			let target = this.target;
			if (!target || this.$el === target) return;
			// console.log(target);
			target.appendChild(this.$el);
		}
	},
	mounted: function () {
		this.attachToTarget();
	},
	beforeDestroy: function () {
		if(this.$el && this.$el.parentElement){
			// console.log('Warning destroying modal', this.open, this.$el);
			this.$el.parentElement.removeChild(this.$el);
		}
	},
}

export default attachableMixin;