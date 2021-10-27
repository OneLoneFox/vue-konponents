<template>
    <div class="demo">
        <KonSelect
            label="Disable items"
            label-as-placeholder
            :items="items"
            v-model="selectedItem"
            value-attribute="id"
            text-attribute="name"
            :disabled-item="(item) => item.stock == 0"
        >
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
                {id: 1, stock: 0, name: 'Nvidia RTX 3060'},
                {id: 2, stock: 7, name: 'Nvidia RTX 3060 TI'},
                {id: 3, stock: 0, name: 'Nvidia RTX 3060 SUPER'},
                {id: 4, stock: 0, name: 'Nvidia RTX 3070'},
                {id: 5, stock: 0, name: 'Nvidia RTX 3070 TI'},
                {id: 6, stock: 2, name: 'Nvidia RTX 3080'},
                {id: 7, stock: 0, name: 'Nvidia RTX 3080 TI'},
                {id: 8, stock: 1, name: 'Nvidia RTX 3090'},
            ],
            selectedItem: null,
        };
    },
    computed: {
        results: function(){
            return {
                card: this.selectedItem,
            };
        },
    },
}
</script>