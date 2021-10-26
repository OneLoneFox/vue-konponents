<template>
    <ParentNavbar />
</template>

<script>
    import ParentNavbar from '@parent-theme/components/Navbar.vue';
    export default {
        name: 'Navbar',
        components: {ParentNavbar},
    }
</script>

<style lang="scss">
.navbar{
    height: var(--doc-navbar-height);
    border: none;
    background: rgb(var(--background-active-color));
    .links{
        background: none;
    }
}
</style>