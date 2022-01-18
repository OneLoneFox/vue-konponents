<template>
    <div class="demo">
        <KonSelect
            placeholder="Sizes"
            v-model="selectedItem"
            :items="items"
            value-attribute="id"
            text-attribute="name"
            return-object
        >
            <template #default="{item, selected}">
                ({{ item.code }}) {{ item.name }} {{ selected ? '👖' : '' }}
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
                {id: 1, code: 'XS', name: 'Extra small'},
                {id: 2, code: 'SM', name: 'Small'},
                {id: 3, code: 'MD', name: 'Medium'},
                {id: 4, code: 'LG', name: 'Large'},
                {id: 5, code: 'XL', name: 'Extra large'},
            ],
            selectedItem: null,
            searchTerm: '',
        };
    },
    computed: {
        results: function(){
            return {
                size: this.selectedItem
            };
        },
    },
}
</script>