<template>
    <div class="demo between">
        <KonButton @click="removeItem">Remove</KonButton>
        <div class="col">
            <KonSelectMultiple
                placeholder="Select multiple"
                :items="items"
                v-model="selectedItems"
                value-attribute="id"
                text-attribute="name"
            >
            </KonSelectMultiple>
        </div>
        <div class="col">
            <KonSelectMultiple
                placeholder="Select multiple (return-values)"
                :items="items"
                v-model="selectedValues"
                value-attribute="id"
                text-attribute="name"
                return-values
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
                {id: 1, name: "Takayan"},
                {id: 2, name: "Camellia"},
                {id: 3, name: "E ve"},
                {id: 4, name: "Inabakumori"},
                {id: 5, name: "Minami"},
                {id: 6, name: "Yorushika"},
            ],
            selectedItems: [{id: 1, name: "Takayan"}],
            selectedValues: [4],
        };
    },
    computed: {
        results: function(){
            return {
                selectedItems: this.selectedItems,
                selectedValues: this.selectedValues,
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
        },
        removeItem: function(){
            this.items.pop();
        },
    }
}
</script>