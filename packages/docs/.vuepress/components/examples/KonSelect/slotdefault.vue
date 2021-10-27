<template>
    <div class="demo between">
        <KonButton @click="removeItem" icon-only><ListMinus :size="16" /></KonButton>
        <KonSelect
            placeholder="Sizes"
            v-model="selectedItem"
            :items="items"
            value-attribute="code"
            text-attribute="name"
            return-object
        >
            <template #default="{item, selected}">
                ({{ item.code }}) {{ item.name }} {{ selected ? '👖' : '' }}
            </template>
        </KonSelect>
        <KonButton @click="addItem" icon-only><ListPlus :size="16" /></KonButton>
    </div>
</template>

<script>
import { ListPlus, ListMinus } from 'lucide-vue';
import injectResultSnippet from '../../mixins/injectResultSnippet';
export default {
    mixins: [injectResultSnippet],
    components: {
        ListPlus,
        ListMinus,
    },
    data: function(){
        return {
            items: [
                {code: 'XS', name: 'Extra small'},
                {code: 'SM', name: 'Small'},
                {code: 'MD', name: 'Medium'},
                {code: 'LG', name: 'Large'},
                {code: 'XL', name: 'Extra large'},
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