<template>
	<transition name="kon-toggle-modal">
		<div
		  class="kon-modal"
		  v-if="open"
		  v-bind="$attrs"
		  @click="handleClick"
		>
			<div class="kon-modal-content" ref="content" :tabindex="open ? 0 : undefined">
				<div class="kon-header">
					<slot name="header" />
				</div>
				<slot />
				<div class="kon-footer">
					<slot name="footer" />
				</div>
				<KonButton class="kon-close" icon-only @click="close">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</KonButton>
			</div>
		</div>
	</transition>
</template>

<script>
	import '../../KonButton';
	import attachableMixin from '../../../utils/mixins/attachable.js';
	import { getKeyboardFocusable } from '../../../utils/helpers.js';
	export default {
		mixins: [attachableMixin],
		name: 'KonModal',
		inheritAttrs: false,
		model: {
			prop: 'open',
			event: 'toggle',
		},
		props: {
			/**
			 * @model
			 */
			open: {
				type: Boolean,
				default: false,
			},
			/**
			 * Callback function triggered on modal close
			 * either by clicking ouside the content area
			 * or clicking the close button.
			 */
			onClose: {
				type: Function,
			},
			/**
			 * Prevents the modal from being closed if the
			 * user clicks outside the content area
			 * or presses the ESC key.
			 */
			persistent: {
				type: Boolean,
				default: false,
			},
			/**
			 * Capture focus to the first focusable element within 
			 * the modal's area.
			 */
			captureFocus: {
				type: Boolean,
				default: true,
			},
		},
		watch: {
			/**
			 * Reattach to the end of the target every time it's opened
			 * to support nested modals without the hassle of computing z-index every time
			 * for every modal in the current instance.
			 */
			open: function(isOpen){
				if(isOpen){
					this.attachToTarget();
					this.$nextTick(() => {
						console.log(this.$refs.content);
						this.$refs.content.focus();
					})
					this.bindFocusIn();
				}else{
					this.unbindFocusIn();
				}
			},
		},
		methods: {
			handleClick: function(e){
				if(e.target.closest('.kon-modal-content') != this.$refs.content){
					this.close();
				}
			},
			close: function(){
				this.$emit('toggle', false);
				this.onClose && typeof this.onClose === 'function' && this.onClose();
			},
			handleFocusIn(e){
				if(!e || !this.captureFocus) return;
				if(
					!!e.target &&
					// Not the document or the modal content
					![document, this.$refs.content].includes(e.target) &&
					// Focus is escaping the modal
					!this.$refs.content.contains(e.target)
				){
					// then redirect the focus to the first element in the modal content
					
					let keyboardFocusable = getKeyboardFocusable(this.$refs.content);
					console.log(keyboardFocusable);
					keyboardFocusable[0] && keyboardFocusable[0].focus();
				}
			},
			bindFocusIn(){
				window.addEventListener('focusin', this.handleFocusIn);
			},
			unbindFocusIn(){
				window.removeEventListener('focusin', this.handleFocusIn);
			}
		},
	}
</script>

<style lang="scss" scoped>

</style>