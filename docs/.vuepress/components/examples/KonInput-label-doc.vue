<template>
    <div class="example">
        <KonInput v-model="data" placeholder="Placeholder" autocomplete="off">
            <template #message v-if="data.length > 4">Input messages can be cool</template>
        </KonInput>
        <KonInput v-model="data" label="Simple label" autocomplete="off">
            <template #message v-if="data.length > 4">Input messages can be cool</template>
        </KonInput>
        <KonInput v-model="data" label="Label and placeholder" placeholder="example@example.com" autocomplete="off">
            <template #message v-if="data.length > 4">Input messages can be cool</template>
        </KonInput>
        <KonInput v-model="data" label="Placeholder as label" placeholder-as-label autocomplete="off">
            <template #message v-if="data.length > 4">Input messages can be cool</template>
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