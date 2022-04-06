<template>
	<div class="demo">
		<KonButton @click="isModalOpen = true">Open modal</KonButton>
		<KonModal v-model="isModalOpen">
			<template #header>
				<h4 class="no-margin">Modal header</h4>
			</template>
			<p class="no-margin">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium maiores unde ullam officiis voluptatibus doloribus debitis reprehenderit sunt? Consectetur sint in, velit iste commodi quae rerum inventore illum maiores eum!</p>
			<template #footer>
				<p class="no-margin">Footer here</p>
			</template>
		</KonModal>
	</div>
</template>

<script>
	export default {
		data: function(){
			return {
				isModalOpen: false,
			};
		},
	};
</script>

<style scoped>
.no-margin{
	margin: 0;
}
</style>