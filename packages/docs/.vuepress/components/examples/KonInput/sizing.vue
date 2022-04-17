<template>
    <div class="demo">
        <KonInput placeholder="Full width" autocomplete="off" full-width />
        <KonInput label="Has margin" autocomplete="off" has-margin>
            <template #message>Some input message</template>
        </KonInput>
    </div>
</template>

<script>
export default {
}
</script>