<template>
    <div class="demo">
        <KonStepper v-model.number="count" />
    </div>
</template>

<script>
export default {
    data: function(){
        return{
            count: 0,
        };
    },
}
</script>