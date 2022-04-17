<template>
    <div class="demo between">
        <KonButton @click="removeItem" icon-only><ListMinus :size="16" /></KonButton>
        <KonSelect 
            placeholder="Select konponent (return-object)" 
            :items="items" 
            v-model="selectedItem"
            value-attribute="id"
            text-attribute="name"
            return-object
        >
        </KonSelect>
        <KonSelect
            placeholder="Select konponent"
            :items="items2"
            v-model="selectedItem2"
            value-attribute="id"
            text-attribute="name"
        >
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
                {id: 1, name: 'Fubuki V O I D'},
                {id: 2, name: 'Tokino Soda'},
                {id: 3, name: 'Korone D O O G'},
                {id: 4, name: 'Rushia 🦋'},
                {id: 5, name: 'Matsuri (GOD)'},
            ],
            items2: [
                {id: 1, name: 'Fubuki V O I D'},
                {id: 2, name: 'Tokino Soda'},
                {id: 3, name: 'Korone D O O G'},
                {id: 4, name: 'Rushia 🦋'},
                {id: 5, name: 'Matsuri (GOD)'},
            ],
            /** 
             * Preselected items can either be the object representing the option
             * or just the value set as value-attribute.
             */
            selectedItem: {id: 1, name: 'Fubuki V O I D'},
            selectedItem2: 1,
        };
    },
    computed: {
        results: function(){
            return {
                return_object: this.selectedItem,
                no_return_object: this.selectedItem2,
            };
        },
    },
    methods: {
        addItem: function(){
            let lastItemId = this.items.length;
            let newItem = {
                id: lastItemId + 1,
                name: `Option ${lastItemId + 1}`
            };
            this.items.push(newItem);

            let lastItemId2 = this.items2.length;
            let newItem2 = {
                id: lastItemId2 + 1,
                name: `Option ${lastItemId2 + 1}`
            };
            this.items2.push(newItem2);
        },
        removeItem: function(){
            this.items.pop();
            this.items2.pop();
        },
    }
}
</script>