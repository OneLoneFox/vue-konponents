<template>
	<div class="demo">
		<KonButton @click="isModalOpen = true">Open modal</KonButton>
		<KonButton @click="isSecondModalOpen = true">Open second modal</KonButton>
		<KonModal v-model="isModalOpen">
			<template #header>
				<h4 class="no-margin">Modal header</h4>
			</template>
			<p class="no-margin">Supports nesting</p>
			<KonButton @click="isSecondModalOpen = true;">Open second</KonButton>
		</KonModal>
		<KonModal v-model="isSecondModalOpen">
			<template #header>
				<h4 class="no-margin">Second modal header</h4>
			</template>
			<p class="no-margin">Can be nested or standalone</p>
			<KonButton @click="closeAll">Close all</KonButton>
			<template #footer>
				<div class="button-row">
					<KonButton @click="isSecondModalOpen = false;">Close me</KonButton>
				</div>
			</template>
		</KonModal>
	</div>
</template>

<script>
	export default {
		data: function(){
			return {
				isModalOpen: false,
				isSecondModalOpen: false,
			};
		},
		methods: {
			closeAll(){
				this.isModalOpen = false;
				this.isSecondModalOpen = false;
			}
		},
	};
</script>

<style scoped>
.no-margin{
	margin: 0;
}
.button-row{
	display: flex;
	justify-content: flex-end;
}
</style>