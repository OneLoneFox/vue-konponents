<template>
	<div class="demo">
		<KonButton @click="notify">5s duration</KonButton>
	</div>
</template>

<script>
export default {
	methods: {
		notify: function(){
			this.$kon.notification({
				title: 'Hey! A notification.',
				body: 'This notification will destroy itself after 5 seconds.',
				duration: 5000,
			});
		}
	}
};
</script>