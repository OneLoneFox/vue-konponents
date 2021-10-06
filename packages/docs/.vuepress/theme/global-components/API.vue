<template>
    <div class="konponent-api">
        <div class="tabs">
            <button
                :class="{active: selected === 'props'}"
                class="tab props"
                v-if="!!data.props"
                @click="selected = 'props'"
            >
                <div class="dummy-icon"></div>
            </button>
            <button
                :class="{active: selected === 'events'}"
                class="tab events"
                v-if="!!data.events"
                @click="selected = 'events'"
            >
                <div class="dummy-icon"></div>
            </button>
            <button
                :class="{active: selected === 'slots'}"
                class="tab slots"
                v-if="!!data.slots"
                @click="selected = 'slots'"
            >
                <div class="dummy-icon"></div>
            </button>
        </div>
        <div class="tables">
            <div class="table props-table" v-if="!!data.props && selected == 'props'">
                <div class="title">Properties</div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(prop, index) in data.props" :key="index">
                            <td>{{ prop.name }}</td>
                            <td>{{ prop.type }}</td>
                            <td>{{ prop.default }}</td>
                            <td>{{ prop.desc }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="table events-table" v-if="!!data.events && selected == 'events'">
                <div class="title">Events</div>
                
            </div>
            <div class="table slots-table" v-if="!!data.slots && selected == 'slots'">
                <div class="title">Slots</div>
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                selected: 'props',
            };
        },
        computed: {
            data: function(){
                return this.$frontmatter.api;
            },
        }
    }
</script>

<style lang="scss" scoped>
*{
    box-sizing: border-box;
}
.konponent-api{
    position: relative;
    font-family: "Poppins";
    color: rgb(var(--foreground-color));
    .tabs{
        position: absolute;
        top: 0;
        left: 0;
        width: 28px;
        margin-top: 20px;
        .tab{
            outline: none;
            background: transparent;
            border: none;
            border-radius: 12px 0 0 12px;
            padding: 2px;
            &.active{
                background: rgb(var(--background-active-color));
            }
        }
    }
    .tables{
        margin-left: 28px;
        background: rgb(var(--background-active-color));
        padding: 24px 30px;
        border-radius: 12px;
    }
    .table{
        .title{
            font-size: 24px;
            font-weight: 500;
            line-height: 36px;
        }
    }
}
.dummy-icon{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid rgb(var(--foreground-color));
}
</style>