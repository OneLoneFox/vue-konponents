<template>
	<KonModal
	class="kon-confirm"
	no-close
	:open="isOpen"
	@afterLeave="handleLeave"
	@close="handleCancel"
	>
	<template #header>
		<h4 class="kon-confirm-header">{{ title }}</h4>
	</template>
	<p class="kon-confirm-content">{{ content }}</p>
	<template #footer>
		<div class="kon-confirm-footer">
			<KonButton @click="handleCancel" danger text>{{cancelText}}</KonButton>
			<KonButton @click="handleOk">{{ okText }}</KonButton>
		</div>
	</template>
	</KonModal>
</template>

<script>
import '../Base';
import '../../KonButton';
import premades from '../../../utils/mixins/modal-premades';
export default {
	mixins: [premades],
	name: 'KonConfirm',
	data: function () {
		return {
			isOpen: false,
		};
	},
	props: {
		content: {
			type: String,
			default: '',
		},
	},
	methods: {
		handleCancel: function () {
		/**
		 * For some weird reason it's detecting a click outside unless I do this
		 * which triggers handleCancel (in this case twice)
		 * even nesting $nextTick doesn't help
		 */
			setTimeout(() => {
				this.isOpen = false;
			}, 1);
			this.onCancel && typeof this.onCancel === 'function' && this.onCancel();
		},
		handleOk: function () {
			setTimeout(() => {
				this.isOpen = false;
			}, 1);
			this.onOk && typeof this.onOk === 'function' && this.onOk();
		},
	},
};
</script>