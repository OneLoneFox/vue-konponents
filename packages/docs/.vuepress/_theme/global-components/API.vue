<template>
    <div class="konponent-api">
        <div class="tabs">
            <button
                title="props"
                :class="{active: selected === 'props'}"
                class="tab props"
                v-if="!!apiProps"
                @click="selected = 'props'"
            >
                <Code :size="16" />
            </button>
            <button
                title="slots"
                :class="{active: selected === 'slots'}"
                class="tab slots"
                v-if="!!apiSlots"
                @click="selected = 'slots'"
            >
                <BoxSelect :size="16" />
            </button>
            <button
                title="methods"
                :class="{active: selected === 'methods'}"
                class="tab methods"
                v-if="!!apiMethods"
                @click="selected = 'methods'"
            >
                <FunctionSquare :size="16" />
            </button>
            <button
                title="events"
                :class="{active: selected === 'events'}"
                class="tab events"
                v-if="!!apiEvents"
                @click="selected = 'events'"
            >
                <Podcast :size="16" />
            </button>
            <button
                title="css variables"
                :class="{active: selected === 'css_vars'}"
                class="tab css-vars"
                v-if="!!apiCssVars"
                @click="selected = 'css_vars'"
            >
                <Palette :size="16" />
            </button>
        </div>
        <div class="api-docs">
            <div class="tables">
                <KonCollapse absolute fade>
                    <div
                        class="table props-table"
                        v-if="!!apiProps && selected == 'props'"
                        key="props"
                    >
                        <h3 class="title">Properties</h3>
                        <p v-if="propNotes">Notes: {{ propNotes }}</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Values</th>
                                    <th class="description">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(prop, index) in apiProps" :key="index">
                                    <td>{{ prop.name }}</td>
                                    <td class="type">
                                        <template v-if="Array.isArray(prop.type)">
                                            <span>{{ prop.type.join(', ') }}</span>
                                        </template>
                                        <span v-else>
                                            {{ prop.type }}
                                        </span>
                                    </td>
                                    <td class="default">
                                        <template v-if="prop.type == 'func'">truncated... (ToDo)</template>
                                        <template v-else>{{ prop.default }}</template>
                                    </td>
                                    <td>
                                        <div class="options">
                                            <div class="option" v-for="(option, idx) in prop.options" :key="idx">
                                                {{ option }}
                                            </div>
                                        </div>
                                    </td>
                                    <td><span class="description">{{ prop.description }}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                     <div
                         class="table slots-table"
                         v-if="!!apiSlots && selected == 'slots'"
                         key="slots"
                     >
                        <h3 class="title">Slots</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th class="name">Name</th>
                                    <th v-if="hasAnyBindings(apiSlots)">Bindings</th>
                                    <th class="description">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(slot, index) in apiSlots" :key="index">
                                    <td>{{ slot.name }}</td>
                                    <td v-if="hasAnyBindings(apiSlots)">
                                        <template v-if="slot.bindings">
                                            <div class="bindings" v-for="(b, idx) in slot.bindings" :key="idx">
                                                <p class="name">
                                                    {{ b.name }}: 
                                                    <template v-if="Array.isArray(b.type)">
                                                        <span>{{ b.type.join(' | ') }}</span>
                                                    </template>
                                                    <span v-else>
                                                        {{ b.type }}
                                                    </span>
                                                </p>
                                                <p>{{ b.description }}</p>
                                            </div>
                                        </template>
                                    </td>
                                    <td><span class="description">{{ slot.description }}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div
                        class="table methods-table"
                        v-if="!!apiMethods && selected == 'methods'"
                        key="methods"
                    >
                        <h3 class="title">Methods</h3>
                        <div class="method-list">
                            <div class="method" v-for="(method, index) in apiMethods" :key="index">
                                <h4 class="name">
                                    {{ method.name }}(<span v-for="(param, idx) in method.params" :key="idx">{{ param.name }}</span>): <span>{{ method.returns }}</span>
                                </h4>
                                <p class="description">{{ method.description }}</p>
                                <div class="signature" v-if="method.params">
                                    <span class="sig">Signature</span>
                                    <div class="params">
                                        <p>Params</p>
                                        <div class="param" v-for="(param, idx) in method.params" :key="idx">
                                            <p class="name">
                                                {{ param.name }}:
                                                <template v-if="Array.isArray(param.type)">
                                                    <span>{{ param.type.join(' | ') }}</span>
                                                </template>
                                                <template v-else>
                                                    <span>{{ param.type }}</span>
                                                </template>
                                            </p>
                                            <p class="desc">{{ param.description }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="table events-table"
                        v-if="!!apiEvents && selected == 'events'"
                        key="events"
                    >
                        <h3 class="title">Events</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Payload</th>
                                    <th class="description">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(event, index) in apiEvents" :key="index">
                                    <td>{{ event.name }}</td>
                                    <td v-if="event.payload">
                                        <h4>{{ event.name }}
                                        <div v-for="(item, idx) in event.payload" :key="idx">
                                            <div>
                                                <span>{{ item.name }}</span>:
                                                <template v-if="Array.isArray(item.type)">
                                                    <span>{{ item.type.join(' | ') }}</span>
                                                </template>
                                                <template v-else>
                                                    <span>{{ item.type }}</span>
                                                </template>
                                            </div>
                                            <p>{{ item.description }}</p>
                                        </div>
                                        </h4>
                                    </td>
                                    <td><span class="description">{{ event.description }}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div
                        class="table css-vars-table"
                        v-if="!!apiCssVars && selected == 'css_vars'"
                        key="css"
                    >
                        <h3 class="title">CSS Variables</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Default</th>
                                    <th>Format</th>
                                    <th class="description">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(css_var, idx) in apiCssVars" :key="idx">
                                    <td>{{ css_var.name }}</td>
                                    <td>{{ css_var.default }}</td>
                                    <td>{{ css_var.format }}</td>
                                    <td><span class="description">{{ css_var.description }}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </KonCollapse>
            </div>
        </div>
    </div>
</template>

<script>
    import attributes from '../../../.api/attributes.json';
    import slots from '../../../.api/slots.json';
    import methods from '../../../.api/methods.json';
    import { Code, Podcast, BoxSelect, Palette, FunctionSquare } from 'lucide-vue';
    export default {
        apiData: {
            attributes,
            slots,
            methods,
        },
        customOption: 'aaaaaaa',
        components: {
            Code,
            Podcast,
            BoxSelect,
            Palette,
            FunctionSquare,
        },
        props: ['component'],
        data: function(){
            return {
                selected: 'props',
            };
        },
        computed: {
            data: function(){
                return this.$frontmatter.api;
            },
            apiEvents: function(){
                return this.data?.events;
            },
            apiCssVars: function(){
                return this.data?.css_vars;
            },
            propNotes: function(){
                return this.data?.prop_notes;
            },
            /**
             * Retrieve component props from both generated api docs
             * and extra frontmatter api docs.
             */
            apiProps: function(){
                let extraProps = this.data?.props ? this.data.props : [];
                let generatedProps = this.$options.apiData.attributes[this.component] ? this.$options.apiData.attributes[this.component] : [];
                let props = [
                    ...generatedProps,
                    ...extraProps,
                ];
                return props.length ? props : null;
            },
            apiMethods: function(){
                let extraMethods = this.data?.methods ? this.data.methods : [];
                let generatedMethods = this.$options.apiData.methods[this.component] ? this.$options.apiData.methods[this.component] : [];
                let methods = [
                    ...generatedMethods,
                    ...extraMethods,
                ];
                return methods.length ? methods : null;
            },
            apiSlots: function(){
                let extraSlots = this.data?.slots ? this.data.slots : [];
                let generatedSlots = this.$options.apiData.slots[this.component] ? this.$options.apiData.slots[this.component] : [];
                let slots = [
                    ...generatedSlots,
                    ...extraSlots,
                ];
                return slots.length ? slots : null;
            }
        },
        methods: {
            /**
             * @param {Array} slots
             */
            hasAnyBindings: function(slots){
                return slots.find((slot) => {return slot.bindings != null;}) != undefined;
            }
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
        display: flex;
        flex-direction: column;
        top: 0;
        left: 0;
        transform: translateX(-100%);
        .tab{
            outline: none;
            background: transparent;
            border: none;
            border-radius: 12px 0 0 12px;
            padding: 8px;
            cursor: pointer;
            color: rgba(var(--foreground-color), 0.6);
            svg{
                vertical-align: top;
            }
            &.active{
                color: rgba(var(--foreground-color), 1);
                background: rgb(var(--background-active-color));
            }
        }
    }
    .tables{
        position: relative;
    }
    .api-docs{
        position: relative;
        background: rgb(var(--background-active-color));
        padding: 24px 30px;
        border-radius: 12px;
        border-top-left-radius: 0;
    }
    .table{
        .type{
            color: rgb(var(--foreground-color));
        }
        .title{
            font-size: 24px;
            line-height: 36px;
            margin-top: 0;
        }
        .options{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 6px;
            .option{
                font-size: 11px;
                line-height: 11px;
                padding: 3px 6px;
                border-radius: 4px;
                background: rgb(var(--background-color));
                color: rgb(var(--foreground-color));
            }
        }
        span.description{
            white-space: pre-line;
        }
        table{
            position: relative;
            display: table;
            table-layout: fixed;
            margin: 0;
            width: 100%;
        }
        tr{
            width: 100%;
        }
        td, th{
            border-collapse: collapse;
            padding: 10px;
            text-align: left;
            &.name{
                width: 100px;
            }
            &.description{
                width: 300px;
            }
            &.short-description{
                width: 180px;
            }
            &:first-child{
                padding-left: 0;
            }
            &:last-child{
                padding-right: 0;
            }
        }
        tr, td, th{
            border: none;
            background: none;
        }
        td{
            vertical-align: top;
            color: rgba(var(--foreground-color), 0.6);
        }
    }
    .method{
        .description{
            padding-left: 10px;
        }
        .signature{
            position: relative;
            background: rgb(var(--background-color));
            padding: 10px 16px;
            border-radius: 10px;
            .sig{
                font-size: 12px;
                line-height: 12px;
                position: absolute;
                top: -6px;
            }
        }
    }
}
</style>