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
                collapse-chips
            >
                <template #default="{item, selected}">
                    {{ `${item.name} ${selected ? '( ⓛ ω ⓛ *)' : ''}` }}
                </template>
            </KonSelectMultiple>
        </div>
        <div class="col">
            <KonSelectMultiple
                placeholder="Select multiple"
                :items="items"
                v-model="selectedItems"
                value-attribute="id"
                text-attribute="name"
            >
                <template #default="{item, selected}">
                    <KonCheckbox readonly :checked="selected" :label="item.name" />
                    <template v-if="item.count > 1">
                        <span>{{ item.count }}</span>
                    </template>
                </template>
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
                {id: 1, name: "OwO", count: 14},
                {id: 2, name: "Nya", count: 23},
                {id: 3, name: "MAAAUUUU", count: 1},
                {id: 4, name: "Nessie", count: 1},
                {id: 5, name: "Wattson", count: 1},
            ],
            selectedItems: [{id: 4, name: "Nessie", count: 1}],
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