<template>
    <div class="demo between">
        <KonButton @click="removeItem">Remove</KonButton>
        <KonSelectMultiple
            label="Select multiple"
            :items="items"
            v-model="selectedItems"
        >
        </KonSelectMultiple>
        <KonSelectMultiple
            placeholder="Select multiple"
            :items="items"
            v-model="selectedItems"
        >
        </KonSelectMultiple>
        <KonSelectMultiple
            label="Select multiple"
            label-as-placeholder
            :items="items"
            v-model="selectedItems"
        >
        </KonSelectMultiple>
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
                "Konponents",
                "Vue.js",
                "Feather",
                "Vuepress",
                "Library",
            ],
            selectedItems: ["Konponents"],
            disabledItems: [],
        };
    },
    computed: {
        results: function(){
            return {
                selectedItems: this.selectedItems,
            };
        },
    },
    methods: {
        addItem: function(){
            let lastItemId = this.items.length;
            let newItem = `Option ${lastItemId + 1}`;
            this.items.push(newItem);
        },
        removeItem: function(){
            this.items.pop();
        },
    }
}
</script>