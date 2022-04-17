<template>
  <transition
    name="kon-toggle-modal"
    @after-leave="$emit('after-leave')"
    @after-enter="(el) => {$emit('after-enter', el)}"
  >
    <div class="kon-modal" v-if="open" v-bind="$attrs" @click="handleClick">
      <div
        class="kon-modal-content"
        :class="{
          'kon-modal-no-padding': noPadding,
          'persistent-animate': $data._persistentAnimation,
          'kon-hide-overflow': hideOverflow,
          'kon-fullscreen': fullscreen,
        }"
        ref="content"
        :tabindex="open ? 0 : undefined"
      >
        <div class="kon-header" v-if="!!$slots.header">
          <slot name="header" />
        </div>
        <div class="kon-body" :class="{ 'kon-scrollable': scrollable }">
          <slot />
        </div>
        <div class="kon-footer" v-if="!!$slots.footer">
          <slot name="footer" />
        </div>
        <KonButton
          class="kon-close"
          icon-only
          @click="close"
          v-if="!noClose || hideOverflow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
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
		 * Prevents the modal from being closed if the
		 * user clicks outside the content area
		 * or presses the ESC key.
		 *
		 * It can still be closed by clicking the close button
		 * if available.
		 */
		persistent: {
			type: Boolean,
			default: false,
		},
		/**
		 * Capture focus to the first focusable element within
		 * the modal's area when focus tries to escape the component.
		 */
		captureFocus: {
			type: Boolean,
			default: true,
		},
		/**
		 * Makes the modal's content fill the screen.
		 */
		fullscreen: {
			type: Boolean,
			default: false,
		},
		/**
		 * Tells the modal's body to be scrollable if the content
		 * overflows the max-height.
		 */
		scrollable: {
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
		 * Determines if the modal's close button is visible.
		 */
		noClose: {
			type: Boolean,
			default: false,
		},
		/**
		 * Determines if the modal's body overflow is visible or hidden and slightly moves the close button to prevent clipping.
		 *
		 * Overflow is visible by default to prevent components like select
		 * and select-multiple from being clipped.
		 */
		hideOverflow: {
			type: Boolean,
			default: false,
		},
		/**
		 * Determines if the modal should prevent the page from scrolling when visible.
		 */
		captureScroll: {
			type: Boolean,
			default: true,
		},
	},
	data: function () {
		return {
			_persistentAnimation: false,
			_previousActiveElement: null,
		};
	},
	watch: {
		/**
		 * Reattach to the end of the target every time it's opened
		 * to support nested modals without the hassle of computing z-index every time
		 * for every modal in the current instance.
		 */
		open: function (isOpen) {
			if (isOpen) {
				this.attachToTarget();
				// Wait for content to be attached to the DOM and forward focus to it.
				this.$nextTick(() => {
					this.$data._previousActiveElement = document.activeElement;
					this.$refs.content.focus();
				});
				this.bindListeners();
				if (this.captureScroll) {
					document.body.style.overflow = 'hidden';
				}
			} else {
				this.unbindListeners();
				if (this.captureScroll) {
					document.body.style.overflow = null;
				}
				this.$data._previousActiveElement?.focus();
			}
		},
	},
	methods: {
		handleClick: function (e) {
			// Detect click outside the content
			if (e.target.closest('.kon-modal-content') != this.$refs.content) {
				if (this.persistent) {
					this.animatePersistent();
					return;
				}
				this.close();
			}
		},
		/**
		 * Fires a toggle event (model) which closes the modal event and fires a close event.
		 *
		 * @fires toggle
		 * @fires close
		 * @returns {void}
		 */
		close: function () {
			this.$emit('toggle', false);
			this.$emit('close');
		},
		handleFocusIn(e) {
			if (!this.open) return;
			if (!e || !this.captureFocus) return;
			if (
				!!e.target &&
        // Not the document or the modal content
        ![document, this.$refs.content].includes(e.target) &&
        // Focus is escaping the modal
        !this.$refs.content.contains(e.target)
			) {
				// then redirect the focus to the first element in the modal content

				let keyboardFocusable = getKeyboardFocusable(this.$refs.content);
				console.log(keyboardFocusable);
				keyboardFocusable[0] && keyboardFocusable[0].focus();
			}
		},
		handleEscKey(e) {
			if (e.code === 'Escape') {
				if (this.persistent) {
					this.animatePersistent();
					return;
				}
				this.close();
			}
		},
		bindListeners() {
			window.addEventListener('focusin', this.handleFocusIn);
			window.addEventListener('keydown', this.handleEscKey);
		},
		unbindListeners() {
			window.removeEventListener('focusin', this.handleFocusIn);
			window.removeEventListener('keydown', this.handleEscKey);
		},
		animatePersistent() {
			console.log(this.$data._persistentAnimation);
			if (!this.$data._persistentAnimation) {
				this.$data._persistentAnimation = true;
				setTimeout(() => {
					this.$data._persistentAnimation = false;
				}, 350);
			}
		},
	},
	beforeMount: function () {
		this.$nextTick(() => {
			this.open && this.bindListeners();
		});
	},
	beforeDestroy: function () {
		this.unbindListeners();
	},
};
</script>

<style lang="scss" scoped>
</style>