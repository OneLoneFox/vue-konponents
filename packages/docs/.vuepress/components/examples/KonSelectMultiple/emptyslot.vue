<template>
    <div class="demo">
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
                @search="handleSearch"
                @keypress.native.enter="addItem"
                ref="example"
            >
                <template #empty="{search}">
                    <span class="new-item">Create a new item <b>{{ search }}</b>. Press enter.</span>
                </template>
            </KonSelectMultiple>
        </div>
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
            search: '',
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
            if(this.search.trim()){
                let lastItemId = this.items.length;
                let newItem = {
                    id: ++lastItemId,
                    name: this.search,
                }
                this.items.push(newItem);
                this.selectedItems.push(newItem);
                this.$refs.example.clearFilter();
                this.search = '';
            }
        },
        handleSearch: function(searchValue){
            this.search = searchValue;
        }
    }
}
</script>

<style>
.new-item{
    display: inline-flex;
    justify-content: space-between;
}
</style>