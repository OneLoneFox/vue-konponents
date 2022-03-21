<template>
    <div class="example">
        <KonInput v-model="data" placeholder="Input" autocomplete="off"></KonInput>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            data: '',
            data2: '',
        };
    }
}
</script>

<style scoped>
.example {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
</style>