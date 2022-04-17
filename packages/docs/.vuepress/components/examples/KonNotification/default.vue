<template>
	<div class="demo">
		<KonButton @click="notify">Show notification</KonButton>
	</div>
</template>

<script>
export default {
	methods: {
		notify: function(){
			this.$kon.notification({
				title: 'Hey! A notification.',
				body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ab assumenda dolorem voluptatem voluptates architecto.',
			});
		}
	}
};
</script>