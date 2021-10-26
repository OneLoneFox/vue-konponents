<template>
    <div class="demo-relative">
        <KonButton block @click="toggleCollapse">Swap and collapse</KonButton>
        <KonCollapse>
            <div class="wrap" v-if="expanded || expanded2">
                <KonCollapse absolute fade>
                    <div class="box-a" v-if="expanded" key="a">
                        <div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ipsum, deserunt sequi, harum quaerat, totam iure voluptate eos deleniti itaque laboriosam cupiditate voluptas? Ipsam deleniti facere voluptas? Non, in sed!</p>
                        </div>
                    </div>
                    <div class="box-b" v-if="expanded2" key="b">
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum quo veniam earum aspernatur perspiciatis voluptatum dolore similique dolorum laudantium assumenda repudiandae autem, officiis natus magni vitae placeat iste voluptatibus necessitatibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas repudiandae aperiam est veniam? Explicabo tempore itaque fuga ut. Blanditiis exercitationem dolore nisi dolorem voluptatum consectetur illum amet dicta cum minus.</p>
                        </div>
                    </div>
                </KonCollapse>
            </div>
        </KonCollapse>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                expanded: true,
                expanded2: false,
            };
        },
        methods: {
            toggleCollapse: function(){
                if(this.expanded){
                    this.expanded = false;
                    this.expanded2 = true;
                }else if(this.expanded2){
                    this.expanded2 = false;
                    this.expanded = false;
                }else{
                    this.expanded = true;
                    this.expanded2 = false;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
.box{
    &-a{
        background: rgb(var(--background-color));
        color: rgb(var(--foreground-color));
    }
    &-b{
        color: rgb(var(--background-color));
        background: rgb(var(--foreground-color));
    }
    &-a, &-b{
        border-radius: 12px;
    }
    &-a > div, &-b > div{
        padding: 20px;
    }
}
</style>