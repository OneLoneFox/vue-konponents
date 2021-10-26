<template>
    <div class="demo between">
        <KonButton @click="removeItem">Remove</KonButton>
        <div class="col">
            <KonSelectMultiple
                placeholder="Hololive EN"
                :items="items"
                v-model="selectedItems"
                value-attribute="id"
                text-attribute="name"
                :clear-search="false"
                filterable
                filterInput
            >
                <template #empty="{search}">
                    No matching results for {{ search }}
                </template>
            </KonSelectMultiple>
        </div>
        <KonButton @click="addItem">Add</KonButton>
    </div>
</template>

<script>
import injectResultSnippet from '../../mixins/injectResultSnippet';
export default {
    mixins: [injectResultSnippet],
    data: function(){
        return {
            items: [
                {id: 1, name: 'Gªwr Gurª'},
                {id: 2, name: 'Smol Ame'},
                {id: 3, name: 'Ninomae Inaff'},
                {id: 4, name: 'Tsundori Calliope'},
                {id: 5, name: 'Kusotori'},
            ],
            graduated: ['Kyriu Coco'],
            selectedItems: [{id: 2, name: 'Smol Ame'}],
        };
    },
    computed: {
        results: function(){
            return {
                selectedItems: this.selectedItems,
            };
        }
    },
    methods: {
        addItem: function(){
            let lastItemId = this.items.length;
            this.items.push(`Item ${lastItemId + 1}`);
        },
        removeItem: function(){
            this.items.pop();
        },
    }
}
</script>