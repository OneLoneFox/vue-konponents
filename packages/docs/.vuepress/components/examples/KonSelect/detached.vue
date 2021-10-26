<template>
    <div class="demo between">
        <KonButton @click="removeItems" icon-only><ListMinus :size="16" /></KonButton>
        <KonSelect
            placeholder="Detached select (simple)"
            kon-style="detached"
            :items="items"
            v-model="selectedItem"
        >
        </KonSelect>
        <KonSelect
            placeholder="Detached select (object)"
            kon-style="detached"
            :items="objectItems"
            v-model="selectedObject"
            value-attribute="value"
            text-attribute="text"
        >
        </KonSelect>
        <KonButton @click="addItems" icon-only><ListPlus :size="16" /></KonButton>
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
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
                'Item 5',
            ],
            selectedItem: 'Item 3',
            objectItems: [
                {value: 1, text: "Option 1"},
                {value: 2, text: "Option 2"},
                {value: 3, text: "Option 3"},
                {value: 4, text: "Option 4"},
                {value: 5, text: "Option 5"},
            ],
            selectedObject: 3,
        };
    },
    computed: {
        results: function(){
            return {
                'simple': this.selectedItem,
                'object': this.selectedObject,
            };
        },
    },
    methods: {
        addObjectItem: function(){
            let lastItemId = this.objectItems.length;
            let newItem = {
                value: lastItemId + 1,
                text: `Option ${lastItemId + 1}`
            };
            this.objectItems.push(newItem);
        },
        addItems: function(){
            let lastItemId = this.items.length;
            this.items.push(`Item ${lastItemId + 1}`);

            this.addObjectItem();
        },
        removeItems: function(){
            this.items.pop();
            this.objectItems.pop();
        },
    }
}
</script>