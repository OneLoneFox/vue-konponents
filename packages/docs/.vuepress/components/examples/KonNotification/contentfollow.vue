<template>
	<div class="example-follow">
		<div class="header">
			<img src="./abstract.jpg" alt="abstract" />
		</div>
		<div class="content">
			<div class="title">
				<h4>Someone follows you.</h4>
			</div>
			<div class="actions">
				<KonButton text blank @click="close">Dismiss</KonButton>
				<KonButton :border="!follows" :flat="follows" @click="toggleFollow">
					<template v-if="follows">
						Unfollow
					</template>
					<template v-else>
						Follow back
					</template>
				</KonButton>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: function(){
		return {
			follows: false,
		};
	},
	/** Provided by the notification component */
	inject: ['close'],
	methods: {
		toggleFollow: function(){
			this.follows = !this.follows;
		}
	}
};
</script>

<style scoped>
.example-follow{
	display: grid;
	grid-template-rows: 180px 1fr;
	gap: 20px;
	padding: 5px;
}
.header{
	overflow: hidden;
	object-fit: cover;
	border-radius: 15px;
}
.header img{
	display: block;
	width: 100%;
	height: auto;
}
.title h4{
	margin: 0;
}
.content{
	padding: 0 10px;
}
.actions{
	display: flex;
	justify-content: end;
	margin-top: 15px;
}
</style>