<template>
    <ul v-if="items.length" class="content-sidebar-links">
        <li class="title">Contents</li>
        <li v-for="(item, i) in items" :key="i">
            <!-- <SidebarGroup
                v-if="item.type === 'group'"
                :item="item"
                :open="true"
                :collapsable="false"
                :depth="depth"
                @toggle="toggleGroup(i)"
            />
            <SidebarLink v-else :sidebar-depth="sidebarDepth" :item="item" /> -->
            <template v-if="item.type === 'group'">
                <template v-for="(child, idx) in item.children">
                    <ul v-if="isActive(child.path)" :key="idx">
                        <li class="content-item" v-for="(h, k) in secondLevelHeaders(child.headers)" :key="k">
                            <RouterLink
                              :to="`${child.path}#${h.slug}`"
                              class="content-link"
                              :class="{active: isActive(`${child.path}#${h.slug}`)}"
                            >
                                {{ h.title }}
                            </RouterLink>
                        </li>
                    </ul>
                </template>
            </template>
        </li>
    </ul>
</template>

<script>
import SidebarGroup from "@theme/components/SidebarGroup.vue";
import SidebarLink from "@theme/components/SidebarLink.vue";
import { isActive } from "@theme/util";

export default {
    name: "ContentSidebarLinks",

    components: { SidebarGroup, SidebarLink },

    props: [
        "items",
        "depth", // depth of current sidebar links
        "sidebarDepth", // depth of headers to be extracted
        "initialOpenGroupIndex"
    ],

    methods: {
        isActive(path) {
            return isActive(this.$route, path);
        },
        secondLevelHeaders(headers){
            return headers.filter(h => h.level === 2);
        }
    }
};
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
        width: var(--doc-content-links-width);
        padding: 10px;
        padding-top: 20px;
        background: rgb(var(--background-active-color));
        border-bottom-left-radius: 20px;
        z-index: 10;
        .title{
            margin-bottom: 10px;
            margin-left: 6px;
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
        .content-item .content-link{
            display: block;
            font-size: 13px;
            color: rgba(var(--foreground-color), 0.6);
            padding: 2px 8px;

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
    @media (max-width: 1420px){
        display: none;
    }
}
</style>