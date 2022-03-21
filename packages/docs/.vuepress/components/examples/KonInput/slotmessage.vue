<template>
    <div class="example">
        <KonInput v-model="data" placeholder="Input" autocomplete="off">
            <template #message>Some input message</template>
        </KonInput>
        <KonInput v-model="data" placeholder="Type to show message" autocomplete="off">
            <template #message v-if="!!data.length">Animated input message</template>
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
</style>