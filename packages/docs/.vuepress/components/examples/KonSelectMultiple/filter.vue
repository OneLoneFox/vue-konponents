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
            </KonSelectMultiple>
        </div>
        <div class="col">
            <KonInput v-model="searchTerm" label="External filter" />
            <KonSelectMultiple
                placeholder="Hololaibu"
                v-model="selectedItems2"
                filterable
                :items="items2"
                :search="searchTerm"
                :disabled-item="(item) => graduated.includes(item)"
            >
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
            items2: [
                'Fubuki V O I D',
                'Tokino Soda',
                'Korone D O O G',
                'Kyriu Coco',
                'Rushia 🦋',
            ],
            graduated: ['Kyriu Coco'],
            selectedItems: [{id: 2, name: 'Smol Ame'}],
            selectedItems2: [],
            searchTerm: '',
        };
    },
    computed: {
        results: function(){
            return {
                holo_en: this.selectedItems,
                holo: this.selectedItems2,
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