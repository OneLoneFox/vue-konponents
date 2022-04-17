<template>
	<KonModal
	  class="kon-prompt"
	  no-close
	  :open="isOpen"
	  @after-leave="handleLeave"
	  @after-enter="handleShown"
	  @close="handleCancel"
	>
	<template #header>
		<h4 class="kon-prompt-header">{{ title }}</h4>
	</template>
	<div class="kon-prompt-content">
		<KonInput
		  @keydown.enter="handleOk"
		  v-model="inputData"
		  :label="promptText"
		  full-width
		/>
	</div>
	<template #footer>
		<div class="kon-prompt-footer">
			<KonButton @click="handleCancel" danger text>{{cancelText}}</KonButton>
			<KonButton @click="handleOk">{{ okText }}</KonButton>
		</div>
	</template>
	</KonModal>
</template>

<script>
import "../Base";
import "../../KonButton";
import "../../KonInput/Base";
import premades from "../../../utils/mixins/modal-premades";
export default {
  mixins: [premades],
  name: "KonPrompt",
  data: function () {
	return {
		isOpen: false,
		inputData: "",
	};
  },
  props: {
	/**
	 * The text to show as the prompt's input label.
	 */
	promptText: {
		type: String,
		default: "",
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
		this.onCancel && typeof this.onCancel === "function" && this.onCancel();
	},
	handleOk: function () {
		setTimeout(() => {
			this.isOpen = false;
		}, 1);
		this.onOk && typeof this.onOk === "function" && this.onOk(this.inputData);
	},
	handleShown: function(el){
		/** Refs won't work here */
		el.querySelector('input').focus();
	}
  },
};
</script>

<style>
</style>