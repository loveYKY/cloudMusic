<template>
    <h1>hello</h1>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
    setup() {
        const route = useRoute()
        const albumId = ref(route.query.id)
        console.log(albumId.value)
    },
})
</script>

<style lang="scss" scoped>

</style>
