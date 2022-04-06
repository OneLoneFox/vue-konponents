<template>
	<div class="demo">
		<KonButton @click="isModalOpen = true">Persistent</KonButton>
		<KonButton @click="isModalOpen2 = true">Persistent &amp; no close btn</KonButton>
		<KonModal v-model="isModalOpen" persistent>
			<template #header>
				<h4 class="no-margin">Persistent</h4>
			</template>
			<p class="no-margin">Can only be closed by changing the model or the close button</p>
			<template #footer>
				<div class="actions">
                    <kon-button danger text @click="isModalOpen = false">Cancel</kon-button>
                    <kon-button @click="isModalOpen = false">Accept</kon-button>
                </div>
			</template>
		</KonModal>
        <KonModal v-model="isModalOpen2" persistent no-close>
			<template #header>
				<h4 class="no-margin">Non dismissable</h4>
			</template>
			<p class="no-margin">Can only be closed by changing the model.</p>
			<template #footer>
				<div class="actions">
                    <kon-button danger text @click="isModalOpen2 = false">Cancel</kon-button>
                    <kon-button @click="isModalOpen2 = false">Accept</kon-button>
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
				isModalOpen2: false,
			};
		},
	};
</script>

<style scoped>
.no-margin{
	margin: 0;
}
.actions{
    display: flex;
    justify-content: end;
}
</style>