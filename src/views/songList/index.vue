<template>
  <div class="main-container">
    <Header></Header>
    <Tab></Tab>
    <ThreeColumn></ThreeColumn>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, provide } from 'vue'
import Header from './components/header.vue'
import Tab from './components/tab.vue'
import ThreeColumn from './components/threeColumn.vue'
export default defineComponent({
  components: {
    Header,
    Tab,
    ThreeColumn,
  },
  setup() {

    return {
    }
  }
})
</script>

<style lang="scss" scoped>

</style>