<template>
    <div class="demo">
        <KonSwitch name="rice" value="rice" label="Rice" />
        <KonSwitch name="dumplings" value="dumplings" label="Dumplings" />
        <KonSwitch name="ramen" value="ramen" label="Ramen" checked />
        <KonSwitch name="tacos" value="tacos" label="Tacos" checked @change="change" />
        <KonSwitch name="pizza" value="pizza" label="Pizza" />
    </div>
</template>

<script>
export default {
    methods: {
        change: function(e){
            console.log(e);
        },
    },
}
</script>