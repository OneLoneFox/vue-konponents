<template>
	<div class="demo">
		<KonButton @click="isModalOpen = true">Open modal</KonButton>
		<KonModal v-model="isModalOpen">
			<template #header>
				<h4>Modal header</h4>
			</template>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium maiores unde ullam officiis voluptatibus doloribus debitis reprehenderit sunt? Consectetur sint in, velit iste commodi quae rerum inventore illum maiores eum!</p>
			<template #footer>
				Footer here
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