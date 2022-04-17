<template>
	<transition
	  name="kon-toggle-notification"
	  @enter="enter"
	  @after-enter="afterEnter"
	  @leave="leave"
	  @after-leave="destroy"
	>
		<div class="kon-notification-wrapper" v-if="open">
			<div class="kon-notification" :class="{'no-padding': noPadding}" v-bind="$attrs">
				<button class="kon-close" @click="close" v-if="!noClose">
					<span class="kon-close-icon"></span>
				</button>
				<template v-if="content">
					<div class="kon-content">
						<component :is="content" />
					</div>
				</template>
				<template v-else>
					<div class="kon-title">
						<h4>{{title}}</h4>
					</div>
					<div class="kon-body">
						<p>{{body}}</p>
					</div>
				</template>
			</div>
		</div>
	</transition>
</template>

<script>
import attachableMixin from '../../../utils/mixins/attachable.js';
export default {
	name: 'KonNotification',
	inheritAttrs: false,
	mixins: [attachableMixin],
	props: {
		/**
		 * Sets the notification's title.
		 */
		title: {
			type: String,
			default: '',
		},
		/**
		 * Sets the notification's text.
		 */
		body: {
			type: String,
			default: '',
		},
		/**
		 * Allows for the use of custom content in the form
		 * of a component.
		 * Using this makes title and body obsolete.
		 */
		content: {
			default: null,
		},
		/**
		 * Determines if the notification's close button is visible.
		 * 
		 * Note: you MUST provide a way to close the notification yourself,
		 * either by injecting the close method provided by this component
		 * or by setting a duration for closing automatically.
		 */
		noClose: {
			type: Boolean,
			default: false,
		},
		/**
		 * Determines if the modal's header, body and footer have padding.
		 */
		noPadding: {
			type: Boolean,
			default: false,
		},
		/**
		 * Determines the duration of the notification in milliseconds.
		 */
		duration: {
			type: Number,
		},
		collapsed: {
			type: Boolean,
			default: false,
		}
	},
	data: function(){
		return {
			open: false,
			_timeout: null,
		};
	},
	provide: function(){
		return {
			close: this.close,
		};
	},
	methods: {
		/**
		 * Shows the notification.
		 * @public
		 */
		show: function(){
			this.open = true;
		},
		/**
		 * Instructs the notification to close and destroy itself.
		 * 
		 * This method is <<provided>> and can be <<injected>> to descendants.
		 * @fires close
		 * @returns {void}
		 * @public
		 */
		close: function(){
			this.open = false;
			this.$emit('close');
		},
		/**
		 * Called after the out transition ends.
		 */
		destroy: function(){
			// should be destroyed after out transition or simply hidden
			if(!this.collapsed){
				this.$destroy();
			}
		},
		/**
		 * Sets timeout to destroy automatically.
		 */
		setCloseOnTimeout(duration){
			this.$data._timeout = setTimeout(() => {
				this.close();
			}, duration);
		},
		/**
		 * ---------------------------------------------
		 * SET OF FUNCTIONS FOR COLLAPSING "AUTO" HEIGHT
		 * ---------------------------------------------
		 * 
		 * I chose not to use KonCollapse for this because it would require multiple wrappers and I only need a small portion of the functionality.
		 */
		enter: function(element){
			const {height} = getComputedStyle(element);
			element.style.height = 0;

			void element.offsetHeight;

			requestAnimationFrame(() => {
				element.style.height = height;
			});
		},
		afterEnter: function(element){
			element.style.height = 'auto';
		},
		leave: function(element){
			const {height} = getComputedStyle(element);
			element.style.height = height;

			void element.offsetHeight;

			requestAnimationFrame(() => {
				element.style.height = 0;
			});
		},
	},
	beforeDestroy: function(){
		if(this.$data._timeout){
			clearTimeout(this.$data._timeout);
		}
	},
	mounted: function(){
		if(this.duration){
			this.setCloseOnTimeout(this.duration);
		}
	},

};
</script>

<style>

</style>