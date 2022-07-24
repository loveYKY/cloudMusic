<template>
  <van-tabs v-model:active="active" @click-tab="onClickTab" sticky>
    <van-tab 
        v-for="(item, index) in category"
        :key="index"
        :title="item"
        :name="item"
        >
    </van-tab>
  </van-tabs>
</template>

<script>
import { defineComponent, ref, onMounted, inject, watch } from 'vue'
import Api from '@/api/index.js'
import { useStore } from 'vuex'
export default defineComponent({
    name: 'tab',
    setup() {
      const store = useStore()
      const category = ref(["流行","华语","欧美","摇滚","民谣","ACG","影视原声","电子"])
      const active = ref("流行")
      const onClickTab = (title) => {
        store.commit('changeTag',title.title)
      }

      return {
          category,
          active,
          onClickTab,
      }
    }
})
</script>

<style>

</style>