<template>
	<div class="demo">
		<KonButton @click="prompt">
			<TextCursorInput :size="16" :stroke-width="1.5" />
            <span>Prompt</span>
		</KonButton>
	</div>
</template>

<script>
import injectResultSnippet from '../../mixins/injectResultSnippet';
import {TextCursorInput} from 'lucide-vue';
export default {
	components: {TextCursorInput},
	mixins: [injectResultSnippet],
	data: function(){
		return {
			promptData: null,
		};
	},
	methods: {
		prompt: function(){
            console.log(this.$kon);
			this.$kon.prompt({
				title: 'Prompt',
				promptText: 'Say someting',
				onCancel: () => {
					this.promptData = 'User cancelled';
				},
				onOk: (data) => {
					this.promptData = data;
				}
			});
		}
	},
	computed: {
        results: function(){
            return {
                promptData: this.promptData,
            };
        }
    }
};
</script>

<style>
</style>