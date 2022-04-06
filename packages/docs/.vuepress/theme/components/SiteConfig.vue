<template>
    <div class="site-config">
        <KonCollapse absolute mode="both">
            <div v-if="!expanded" key="toggle-wrap">
                <div class="toggle">
                    <KonButton icon-only text @click="expanded = !expanded">
                        <Settings :size="16" :stroke-width="1.5" />
                    </KonButton>
                </div>
            </div>
            <div v-else key="settings-wrap">
                <div class="settings">
                    <p class="title">Settings</p>
                    <section>
                        <p class="subtitle">Theme</p>
                        <div class="options">
                            <div
                              class="card"
                              :class="{active: activeTheme == ''}"
                              @click="changeTheme('')"
                            >
                                Light (default)
                            </div>
                            <div
                              class="card"
                              :class="{active: activeTheme == 'dark'}"
                              @click="changeTheme('dark')"
                            >
                                Dark
                            </div>
                        </div>
                    </section>
                    <div tabindex="0" class="close" @click="expanded = !expanded">
                        <ArrowUpRight :size="16" :stroke-width="1.5" />
                        Close
                    </div>
                </div>
            </div>
        </KonCollapse>
    </div>
</template>

<script>
import {Settings, ArrowUpRight} from 'lucide-vue';

export default {
    name: "SiteConfig",
    components: {Settings, ArrowUpRight},
    data: function(){
        return {
            expanded: false,
            // No theme means light or default
            activeTheme: '',
        };
    },
    watch: {
        activeTheme: function(theme){
            localStorage.setItem('theme', theme);
        },
    },
    methods: {
        changeTheme: function(theme){
            this.activeTheme = theme;
            document.body.setAttribute('konponent-theme', theme);
        },
        handleClick(e){
            if (e.target.closest(".site-config") != this.$el) {
                this.expanded = false;
            }
        }
    },
    created: function(){
        let savedTheme = localStorage.getItem('theme');
        if(savedTheme !== null){
            this.changeTheme(savedTheme);
        }
    },
    beforeMount: function(){
        window.addEventListener('click', this.handleClick);
    },
    beforeDestroy: function(){
        window.removeEventListener('click', this.handleClick);
    }
}
</script>

<style lang="scss">
.site-config{
    --gap-size: 10px;
    position: fixed;
    top: calc(var(--doc-navbar-height) + var(--gap-size));
    right: calc(var(--doc-content-links-width) + var(--gap-size));
    border-radius: 15px;
    transition-property: top, right, border-radius;
    transition-duration: 350ms;
    transition-timing-function: var(--quintic-ease-out);
    background: rgb(var(--background-active-color));
    // box-shadow: 4px 5px 5px 0 rgb(0 0 0 / 10%);
    user-select: none;
    font-size: 13px;
    .toggle .kon-button{
        margin: 0;
        --konponent-color: var(--foreground-color);
    }
    .settings{
        width: 200px;
        padding: 10px;
        .title{
            font-size: 16px;
        }
        .title, .subtitle{
            margin: 0;
        }
        ul{
            margin: 0;
            padding: 8px;
            list-style: none;
        }
        /* .setting{
            font-size: 13px;
        } */
        .close{
            display: flex;
            align-items: center;
            gap: 6px;
            // padding: 0 8px;
            cursor: pointer;
            opacity: 0.5;
            &:hover{
                opacity: 1;
            }
        }
        section{
            padding: 16px 0;
        }
        .options{
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
        }
        .card{
            padding: 8px;
            border-radius: 8px;
            border: 1px solid rgb(var(--background-accent-color));
            cursor: pointer;
            &.active{
                background: rgb(var(--primary-color));
                color: #fff;
            }
        }
    }
    .toggle{
        padding: 8px;
    }
    z-index: 10;
    @media (max-width: 1420px){
        --gap-size: 0px;
        border-radius: 0 0 0 20px;
        &::before{
            content: "";
            position: absolute;
            width: 20px;
            height: 20px;
            top: 0;
            left: -20px;
            background: radial-gradient(circle at 0% 100%, transparent 20px, rgb(var(--background-active-color)) 20px);
        }
    }
}
</style>