<template>
    <div class="demo">
        <KonSwitch v-model="checked" label="simple switch" />
        <KonSwitch v-model="checked2" label="simple switch" disabled />
        <KonSwitch v-model="checked3" label="simple switch" disabled />
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
    }
}
</script>