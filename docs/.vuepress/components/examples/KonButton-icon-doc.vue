<template>
    <div class="example">
        <KonButton icon-only xs>
            <span class="fake-icon xs"></span>
        </KonButton>
        <KonButton icon-only>
            <span class="fake-icon"></span>
        </KonButton>
        <KonButton icon-only xl>
            <span class="fake-icon xl"></span>
        </KonButton>

        <KonButton icon-only xs text>
            <span class="fake-icon xs"></span>
        </KonButton>
        <KonButton icon-only text>
            <span class="fake-icon"></span>
        </KonButton>
        <KonButton icon-only xl text>
            <span class="fake-icon xl"></span>
        </KonButton>

        <KonButton icon-only xs border>
            <span class="fake-icon xs"></span>
        </KonButton>
        <KonButton icon-only border>
            <span class="fake-icon"></span>
        </KonButton>
        <KonButton icon-only xl border>
            <span class="fake-icon xl"></span>
        </KonButton>
    </div>
</template>

<style scoped>
.example {
    display: flex;
    gap: 10px;
    align-items: center;
}
.fake-icon{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: currentColor;
}
.fake-icon.xs{
    width: 12px;
    height: 12px;
}
.fake-icon.xl{
    width: 24px;
    height: 24px;
}
</style>