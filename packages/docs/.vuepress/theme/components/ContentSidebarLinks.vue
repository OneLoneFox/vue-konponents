<template>
    <ul v-if="items.length" class="content-sidebar-links">
        <li class="title">Contents</li>
        <li v-for="(item, i) in items" :key="i">
            <SidebarGroup
                v-if="item.type === 'group'"
                :item="item"
                :open="true"
                :collapsable="false"
                :depth="depth"
                @toggle="toggleGroup(i)"
            />
            <SidebarLink v-else :sidebar-depth="sidebarDepth" :item="item" />
        </li>
    </ul>
</template>

<script>
import SidebarGroup from "@theme/components/SidebarGroup.vue";
import SidebarLink from "@theme/components/SidebarLink.vue";
import { isActive } from "@parent-theme/util";

export default {
    name: "ContentSidebarLinks",

    components: { SidebarGroup, SidebarLink },

    props: [
        "items",
        "depth", // depth of current sidebar links
        "sidebarDepth", // depth of headers to be extracted
        "initialOpenGroupIndex"
    ],

    data() {
        return {
            openGroupIndex: this.initialOpenGroupIndex || 0
        };
    },

    watch: {
        $route() {
            this.refreshIndex();
        }
    },

    created() {
        this.refreshIndex();
    },

    methods: {
        refreshIndex() {
            const index = resolveOpenGroupIndex(this.$route, this.items);
            if (index > -1) {
                this.openGroupIndex = index;
            }
        },

        toggleGroup(index) {
            this.openGroupIndex = index === this.openGroupIndex ? -1 : index;
        },

        isActive(page) {
            return isActive(this.$route, page.regularPath);
        }
    }
};

function resolveOpenGroupIndex(route, items) {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (descendantIsActive(route, item)) {
            return i;
        }
    }
    return -1;
}

function descendantIsActive(route, item) {
    if (item.type === "group") {
        const childIsActive = item.path && isActive(route, item.path);
        const grandChildIsActive = item.children.some(child => {
            if (child.type === "group") {
                return descendantIsActive(route, child);
            } else {
                return child.type === "page" && isActive(route, child.path);
            }
        });

        return childIsActive || grandChildIsActive;
    }
    return false;
}
</script>

<style lang="scss">
.content-sidebar{
    ul{
        padding: 0;
        margin: 0;
        list-style-type: none;
    }
    .content-sidebar-links{
        position: fixed;
        top: var(--doc-navbar-height);
        right: 0;
        width: 150px;
        padding: 10px;
        padding-top: 20px;
        background: rgb(var(--background-active-color));
        border-bottom-left-radius: 20px;
        .title{
            margin-bottom: 10px;
        }
        &::before{
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            top: 0;
            left: -20px;
            background: radial-gradient(circle at 0% 100%, transparent 20px, rgb(var(--background-active-color)) 20px);
        }
        .sidebar-group.is-sub-group > .sidebar-group-items{
            padding-left: 0;
        }
        .sidebar-heading{
            display: none;
        }
        .sidebar-links{
            > li > a{
                display: none;
            }
        }
        .sidebar-sub-header .sidebar-link{
            display: block;
            font-size: 13px;
            color: rgba(var(--foreground-color), 0.6);
            padding: 4px 8px;

            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            transform: translateX(0px);
            transition: transform 250ms ease;
            &.active{
                color: rgba(var(--foreground-color), 1);
                transform: translateX(12px);
            }
        }
    }
    @media (max-width: 1300px){
        display: none;
    }
}
</style>