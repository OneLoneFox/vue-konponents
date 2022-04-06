<template>
	<div class="demo">
		<KonButton @click="isModalOpen = true">Open modal</KonButton>
		<KonModal v-model="isModalOpen" scrollable>
			<template #header>
				<h4 class="no-margin">Scrollable body</h4>
			</template>
			<p class="paragraph">
                Marshmallow danish sweet lemon drops soufflé. Tiramisu biscuit lollipop pastry pudding jelly-o. Danish marshmallow dessert chupa chups muffin. Powder halvah jelly pastry soufflé chocolate halvah lollipop tiramisu. Chupa chups marshmallow wafer carrot cake danish. Wafer apple pie wafer chocolate candy wafer marzipan pastry. Tootsie roll macaroon fruitcake candy icing chocolate cake sesame snaps danish. Jelly fruitcake jelly-o icing pie wafer. Gingerbread cotton candy croissant pastry soufflé croissant. Wafer pie caramels powder candy bear claw apple pie. Pie jelly muffin jelly beans jelly. Apple pie ice cream pudding jujubes caramels cupcake soufflé.
            </p>
            <p class="paragraph">
                Carrot cake chocolate bar chupa chups soufflé brownie muffin. Gummi bears tootsie roll candy canes cookie dessert. Cake brownie liquorice liquorice gingerbread caramels. Chocolate cake chocolate bar liquorice gummies powder liquorice brownie oat cake. Dessert marzipan gummi bears donut cotton candy jelly beans oat cake. Toffee powder chocolate bar candy sweet roll chupa chups cupcake gummi bears sesame snaps. Powder biscuit dragée sweet roll cake icing halvah. Soufflé cotton candy tart danish dessert gingerbread wafer oat cake. Lemon drops topping cotton candy cheesecake icing apple pie lollipop muffin oat cake. Jujubes danish dessert liquorice biscuit. Ice cream fruitcake cupcake chupa chups topping brownie. Pastry ice cream candy canes pudding lollipop cotton candy.
            </p>
            <p class="paragraph">
                Apple pie topping pudding powder dessert tart gummies. Dessert marzipan brownie chocolate bar fruitcake brownie ice cream lollipop. Chocolate jelly-o bonbon biscuit gingerbread marshmallow. Biscuit pastry jelly-o jelly-o pudding oat cake. Shortbread croissant marzipan chocolate candy canes muffin cotton candy sweet danish. Pudding tiramisu bear claw dessert tiramisu apple pie biscuit brownie. Pudding lollipop jelly-o shortbread toffee gummi bears ice cream cotton candy. Bonbon muffin chocolate cake donut croissant. Danish cotton candy caramels apple pie lollipop oat cake cotton candy tootsie roll. Sesame snaps cotton candy gingerbread sweet pastry jujubes dragée pie cupcake. Chupa chups toffee cupcake cupcake carrot cake croissant muffin. Croissant tootsie roll bear claw icing jelly beans chupa chups. Danish tart cupcake marzipan topping jelly.
            </p>
            <template #footer>
				<p class="no-margin">🧁</p>
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
.paragraph{
    margin-top: 0;
}
</style>