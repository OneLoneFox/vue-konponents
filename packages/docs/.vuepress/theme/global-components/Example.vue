<template>
    <div class="example" :class="{open: expandedSnippet}">
        <div class="card">
            <slot />
        </div>
        <div class="code">
            <div class="controls">
                <button
                    :title="expandedResults ? 'Hide results' : 'Show results'"
                    class="toggle results"
                    :class="{expanded: expandedResults}"
                    @click="toggleResults"
                    v-if="resultSnippet"
                >
                    <ViewBox :size="16" />
                </button>
                <button
                    :title="expandedSnippet ? 'Hide Snippet' : 'Show snippet'"
                    class="toggle"
                    :class="{expanded: expandedSnippet}"
                    @click="toggleSnippet"
                >
                    <Code2 :size="16" />
                </button>
            </div>
            <KonCollapse>
                <div class="kon-snippets" v-if="expandedResults || expandedSnippet">
                    <KonCollapse absolute fade>
                        <div class="kon-result-snippet" v-if="resultSnippet && expandedResults" key="result">
                            <ResultsSnippet
                                :code="resultSnippet"
                                lang="json"
                            />
                        </div>
                        <div class="snippet" v-if="expandedSnippet" key="code">
                            <slot name="snippet" />
                        </div>
                    </KonCollapse>
                </div>
            </KonCollapse>
        </div>
    </div>
</template>

<script>
    import ResultsSnippet from '@theme/global-components/ResultsSnippet.js';
    import { Code2, View as ViewBox } from 'lucide-vue';
    export default {
        name: 'Example',
        components: { Code2, ViewBox, ResultsSnippet},
        data: function(){
            return {
                expandedSnippet: false,
                expandedResults: false,
                resultSnippet: null,
            };
        },
        provide: function(){
            return {
                setResultSnippet: this.setResultSnippet,
            };
        },
        methods: {
            toggleSnippet: function(){
                this.expandedSnippet = !this.expandedSnippet;
                this.expandedResults = false;
            },
            toggleResults: function(){
                this.expandedResults = !this.expandedResults;
                this.expandedSnippet = false;
            },
            setResultSnippet: function(data){
                this.resultSnippet = JSON.stringify(data, null, '\t');
            },
        },
    }
</script>

<style lang="scss">
.example{
    border-radius: 20px;
    background: rgb(var(--background-active-color));
    padding: 10px;
    .card{
        padding: 20px;
        .demo{
            /* @media (max-width: 1250px){
                > .kon-button{
                    display: none;
                }
            } */
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            align-items: center;
            justify-content: center;
            &.between{
                justify-content: space-between;
            }
            > .results{
                position: absolute;
                visibility: hidden;
            }
        }
        .demo-relative{
            position: relative;
        }
    }
    .code{
        padding-top: 10px;
    }
    .kon-snippets{
        position: relative;
        .kon-result-snippet, .snippet{
            width: 100%;
        }
    }
    .kon-result-snippet{
        pre.language-json{
            max-height: 400px;
        }
        div.language-json{
            background: transparent;
            border: 2px solid rgba(var(--background-color), 1);
            &::before{
                content: 'json | results';
                color: rgba(var(--foreground-color), 0.4);
            }
        }
    }
    .controls{
        display: flex;
        align-items: center;
        justify-content: center;
        .toggle{
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(var(--foreground-color), 0.6);
            background: transparent;
            border: none;
            padding: 4px 10px;
            border-radius: 8px 8px 0 0;
            transition: all 250ms ease;
            // overflow: hidden;
            cursor: pointer;
            outline: none;
            border: 2px solid transparent;
            border-bottom-width: 0px;
            &.expanded:not(.results){
                color: #FFF;
                background: rgb(var(--dark-accent-color));
            }
            &.results::before{
                content: '';
                display: block;
                position: absolute;
                transition-property: background;
                transition-duration: 0;
                // transition-delay: 250ms;
                background: transparent;;
                width: 100%;
                height: 4px;
                bottom: -3px;
                z-index: 2;
            }
            &.expanded.results{
                &::before{
                    background: rgb(var(--background-active-color));
                }
                border: 2px solid rgba(var(--background-color), 1);
                border-bottom-width: 0px;
            }
            &:hover, &:focus-visible{
                &:not(.expanded){
                    color: rgba(var(--foreground-color), 1);
                }
            }
        }
    }
}
</style>