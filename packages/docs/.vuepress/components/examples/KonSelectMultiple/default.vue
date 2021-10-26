<template>
    <div class="demo between">
        <KonButton @click="removeItem">Remove</KonButton>
        <div class="col">
            <KonSelectMultiple
                placeholder="Select multiple"
                :items="items"
                v-model="selectedItems"
            >
            </KonSelectMultiple>
        </div>
        <div class="col">
            <KonSelectMultiple
                placeholder="Select multiple"
                :items="items"
                disabled
                v-model="disabledItems"
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