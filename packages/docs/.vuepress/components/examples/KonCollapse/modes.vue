<template>
    <div class="demo-relative">
        <KonButton block @click="toggleCollapse">Toggle collapse default</KonButton>
        <KonCollapse>
            <div v-if="expanded">
                Collapse vertically
            </div>
        </KonCollapse>
        <KonButton @click="toggleCollapseX">Toggle collapse horizontal</KonButton>
        <KonCollapse mode="x">
            <div class="collapse-x" v-if="expandedX">
                <div class="wrap">Collapse horizontally</div>
            </div>
        </KonCollapse>
        <KonButton block @click="toggleCollapseBoth">Toggle collapse both</KonButton>
        <KonCollapse mode="both">
            <div class="collapse-both" v-if="expandedBoth">
                <div class="wrap">Collapse both</div>
            </div>
        </KonCollapse>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                expanded: true,
                expandedX: true,
                expandedBoth: true,
            };
        },
        methods: {
            toggleCollapse: function(){
                this.expanded = !this.expanded;
            },
            toggleCollapseX: function(){
                this.expandedX = !this.expandedX;
            },
            toggleCollapseBoth: function(){
                this.expandedBoth = !this.expandedBoth;
            }
        }
    }
</script>

<style lang="scss" scoped>
.collapse-x{
    display: inline-block;
    border-radius: 12px;
    .wrap{
        width: 200px;
    }
}
.collapse-both{
    overflow: hidden;
    border-radius: 12px;
    .wrap{
        background: rgb(var(--dark-color));
        color: rgb(var(--light-color));
        padding: 20px;
    }
}
</style>