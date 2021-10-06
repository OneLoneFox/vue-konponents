<template>
    <div class="example">
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
                </template>
            </KonSelectMultiple>
        </div>
        <KonButton @click="addItem">Add</KonButton>
        <div class="results">
            <h3>Select multiple konponent results</h3>
            <pre class="language-json">{{ selectedItems }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            items: [
                {id: 1, name: "OwO"},
                {id: 2, name: "Nya"},
                {id: 3, name: "MAAAUUUU"},
                {id: 4, name: "Nessie"},
                {id: 5, name: "Wattson"},
            ],
            selectedItems: [{id: 4, name: "Nessie"}],
        };
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

<style scoped>
.example {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}
.example .col{
    flex-basis: 200px;
}
.results{
    flex-basis: 100%;
}
</style>