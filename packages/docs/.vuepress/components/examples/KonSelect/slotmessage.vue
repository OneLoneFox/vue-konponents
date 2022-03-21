<template>
    <div class="demo">
        <KonSelect
            placeholder="Some items"
            v-model="selectedItem"
            :items="items"
        >
            <template v-if="selectedItem === null" #message>
                Select one item
            </template>
        </KonSelect>
    </div>
</template>

<script>
import injectResultSnippet from '../../mixins/injectResultSnippet';
export default {
    mixins: [injectResultSnippet],
    data: function(){
        return {
            items: [
                'Item xyz 1',
                'Item xyz 2',
                'Item xyz 3',
                'Item xyz 4',
                'Item xyz 5',
                'Item xyz 6',
            ],
            selectedItem: null,
        };
    },
    computed: {
        results: function(){
            return {
                item: this.selectedItem
            };
        },
    },
}
</script>