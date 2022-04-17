<template>
	<KonModal
	  class="kon-alert"
	  no-close
	  :open="isOpen"
	  @afterLeave="handleLeave"
	  @close="dismiss"
	>
		<template #header>
			<h4 class="kon-alert-header">{{ title }}</h4>
		</template>
		<p class="kon-alert-content">{{ content }}</p>
		<template #footer>
			<div class="kon-alert-footer">
				<KonButton @click="dismiss">{{ okText }}</KonButton>
			</div>
		</template>
	</KonModal>
</template>

<script>
import '../Base';
import '../../KonButton';
export default {
	name: 'KonAlert',
	data: function () {
		return {
			isOpen: false,
		};
	},
	props: {
		/**
		 * Text of the ok button.
		 */
		okText: {
			type: String,
			default: 'Ok',
		},
		/**
		 * Title of the alert.
		 */
		title: {
			type: String,
			default: '',
		},
		/**
		 * Text of the alert.
		 */
		content: {
			type: String,
			default: '',
		},
	},
	methods: {
		handleLeave: function(){
			this.$destroy();
		},
		dismiss: function(){
			this.isOpen = false;
		}
	},
};
</script>