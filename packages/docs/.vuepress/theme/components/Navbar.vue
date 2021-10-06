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

<style lang="scss" scoped>
.navbar{
    height: var(--doc-navbar-height);
    border: none;
}
</style>