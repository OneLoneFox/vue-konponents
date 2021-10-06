<template>
    <div class="example">
        <KonInput v-model="data" placeholder="Leading icon" autocomplete="off">
            <template #leadingIcon>
                <div class="fake-icon"></div>
            </template>
        </KonInput>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            data: '',
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
.fake-icon{
    width: 24px;
    height: 24px;
    border: 2px solid #000;
    border-radius: 100%;
}
</style>