<template>
    <div>
        <KonButton block @click="toggleCollapse">Toggle collapse</KonButton>
        <KonCollapse>
            <div v-if="expanded">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ipsum, deserunt sequi, harum quaerat, totam iure voluptate eos deleniti itaque laboriosam cupiditate voluptas? Ipsam deleniti facere voluptas? Non, in sed!
            </div>
        </KonCollapse>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                expanded: true,
            };
        },
        methods: {
            toggleCollapse: function(){
                this.expanded = !this.expanded;
            },
        }
    }
</script>