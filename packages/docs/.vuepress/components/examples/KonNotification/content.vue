<template>
	<div class="demo">
		<KonButton @click="showFollowNotification">Custom content (follow)</KonButton>
	</div>
</template>

<script>
import contentfollowVue from './contentfollow.vue';
export default {
	methods: {
		showFollowNotification: function(){
			this.$kon.notification({
				content: contentfollowVue,
				noPadding: true,
				noClose: true,
			});
		}
	}
};
</script>