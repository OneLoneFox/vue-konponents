<template>
    <div class="example">
        <KonInput
          status="success"
          label="Input success"
          placeholder-as-label
          autocomplete="off"
        >
            <template #message>Success status</template>
        </KonInput>
        <KonInput
          status="warning"
          label="Input warning"
          placeholder-as-label
          autocomplete="off"
        >
            <template #message>Warning status</template>
        </KonInput>
        <KonInput
          status="error"
          label="Input error"
          placeholder-as-label
          autocomplete="off"
        >
            <template #message>Error status</template>
        </KonInput>
        <KonInput
          v-model="data"
          @change="handleChange"
          :status="fakeValidationError ? 'error' : 'default'"
          label="Fake validation (email)"
          placeholder-as-label
          autocomplete="off"
          type="email"
        >
            <template v-if="fakeValidationError" #message>Some error message</template>
        </KonInput>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            data: '',
            dirty: false,
        };
    },
    computed: {
        fakeValidationError: function(){
            return this.dirty && this.data.indexOf('@') === -1;
        }
    },
    methods: {
        handleChange: function(val){
            this.dirty = true;
        }
    }
}
</script>

<style scoped>
.example {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
</style>