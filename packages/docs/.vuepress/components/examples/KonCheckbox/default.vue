<template>
    <div class="demo">
        <KonCheckbox v-model="checked" label="simple checkbox" />
        <KonCheckbox v-model="checked2" label="simple checkbox" disabled />
        <KonCheckbox v-model="checked3" label="simple checkbox" disabled />
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            checked: false,
            checked2: false,
            checked3: true,
        };
    },
}
</script>