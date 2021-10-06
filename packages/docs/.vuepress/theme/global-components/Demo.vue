<template>
    <div>
        <component :is="konponentName"></component>
        <CodeSnippet>
            <slot></slot>
        </CodeSnippet>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                expanded: false
            };
        },
        props: {
            konponentName: {
                type: String,
                required: true
            },
        },
        methods: {
            toggleSnippet: function(e){
                this.expanded = !this.expanded;
            }
        }
    };
</script>