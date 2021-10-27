<template>
    <div class="demo between">
        <KonButton @click="removeItem" icon-only><ListMinus :size="16" /></KonButton>
        <KonSelect
            placeholder="Imaginary products"
            :items="emptyItems"
            v-model="emptySelected"
            filterable
            filterInput
        >
            <template #empty>
                Where items? 🐒
            </template>
        </KonSelect>
        <KonSelect
            placeholder="Imaginary products"
            :items="items"
            v-model="selectedItem"
            filterable
            filterInput
        >
            <template #empty="{search}">
                {{ search }} not found.
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
                'Nvidia RTX 3060',
                'Nvidia RTX 3060 TI',
                'Nvidia RTX 3060 SUPER',
                'Nvidia RTX 3070',
                'Nvidia RTX 3070 TI',
                'Nvidia RTX 3080',
                'Nvidia RTX 3080 TI',
                'Nvidia RTX 3090',
            ],
            emptyItems: [],
            selectedItem: null,
            emptySelected: null,
        };
    },
    computed: {
        results: function(){
            return {
                card: this.selectedItem,
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