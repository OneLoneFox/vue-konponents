<template>
	<div class="demo">
		<KonButton danger text icon-only @click="confirm">
			<Trash :size="16" :stroke-width="1.5" />
		</KonButton>
	</div>
</template>

<script>
import injectResultSnippet from '../../mixins/injectResultSnippet';
import {Trash} from 'lucide-vue';
export default {
	components: {Trash},
	mixins: [injectResultSnippet],
	data: function(){
		return {
			confirmStatus: null,
		};
	},
	methods: {
		confirm: function(){
			this.$kon.confirm({
				title: 'Konfirm',
				content: 'Confirm delete',
				onCancel: () => {
					this.confirmStatus = 'Cancelled';
				},
				onOk: () => {
					this.confirmStatus = 'Confirmed';
				}
			});
		}
	},
	computed: {
        results: function(){
            return {
                confirmStatus: this.confirmStatus,
            };
        }
    }
};
</script>

<style>
</style>