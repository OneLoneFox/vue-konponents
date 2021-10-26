<template>
    <div class="demo">
        <KonButton icon-only xs>
            <DownloadCloud :size="16" />
        </KonButton>
        <KonButton icon-only>
            <UploadCloud />
        </KonButton>
        <KonButton icon-only xl>
            <Edit :size="32" />
        </KonButton>

        <KonButton icon-only xs text>
            <DownloadCloud :size="16" />
        </KonButton>
        <KonButton icon-only text>
            <UploadCloud />
        </KonButton>
        <KonButton icon-only xl text>
            <Edit :size="32" />
        </KonButton>

        <KonButton icon-only xs border>
            <DownloadCloud :size="16" />
        </KonButton>
        <KonButton icon-only border>
            <UploadCloud />
        </KonButton>
        <KonButton icon-only xl border>
            <Edit :size="32" />
        </KonButton>
    </div>
</template>

<script>
import { DownloadCloud, UploadCloud, Edit } from 'lucide-vue';
export default {
    components: { DownloadCloud, UploadCloud, Edit },
}
</script>