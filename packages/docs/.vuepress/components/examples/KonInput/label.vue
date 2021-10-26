<template>
    <div class="demo">
        <KonInput v-model="data" placeholder="Placeholder" autocomplete="off" />
        <KonInput v-model="data" label="Simple label" autocomplete="off" />
        <KonInput v-model="data" label="Label and placeholder" placeholder="example@example.com" autocomplete="off" />
        <KonInput v-model="data" label="Placeholder as label" placeholder-as-label autocomplete="off" />
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