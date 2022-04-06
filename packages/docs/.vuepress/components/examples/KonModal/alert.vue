<template>
	<div class="demo">
		<KonButton @click="alert">Trigger alert</KonButton>
	</div>
</template>

<script>
export default {
	methods: {
		alert: function(){
			this.$kon.alert({
				title: 'Alert',
				content: 'Some alert message',
			});
		}
	},
};
</script>

<style>
</style>