<template>
    <div class="example">
        <slot name="description" />
        <div class="content">
            <slot />
            <div
                class="toggle"
                @click="toggleSnippet"
                @keyup.space="toggleSnippet"
                @keydown.space="(e) => {e.preventDefault();}"
            >
            </div>
        </div>
        <CodeSnippet :expanded="expandedSnippet" class="snippet">
            <slot name="snippet" />
        </CodeSnippet>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                expandedSnippet: false,
            };
        },
        methods: {
            toggleSnippet: function(){
                this.expandedSnippet = !this.expandedSnippet;
            }
        }
    }
</script>

<style lang="scss">
.example{
    .content{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        border-radius: 12px;
        .snippet{
            border-radius: 0 0 12px 12px;
        }
    }
    &.open{
        .content{
            border-radius: 12px 12px 0 0;
        }
    }
}
</style>