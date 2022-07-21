<template>
  <div class="pagination">
    <div class="show-total">{{ `共${total}条` }}</div>
    <div v-if="showSizeChanger" class="select-page-size">
      <a-select
        :value="pageSize"
        @update:value="updatePageSize"
        style="border-radius: 6px; height: 28px"
      >
        <a-select-option
          v-for="item in pageSizeOptions"
          :key="item"
          :value="parseInt(item)"
          >{{ `${item}条/页` }}</a-select-option
        >
      </a-select>
    </div>
    <a-pagination
      :current="current"
      :pageSize="pageSize"
      @update:current="updateCurrent"
      @update:pageSize="updatePageSize"
      :defaultPageSize="defaultPageSize"
      :disabled="disabled"
      :hideOnSinglePage="hideOnSinglePage"
      :pageSizeOptions="pageSizeOptions"
      :show-less-items="showLessItems"
      :size="size"
      :total="total"
      @change="change"
    />
    <div v-if="showQuickJumper" class="ant-pagination-options-quick-jumper">
      前往
      <a-input @pressEnter="pressEnter" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'BigdaPagination',
  props: {
    current: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    defaultPageSize: {
      type: Number,
      default: 10
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false
    },
    pageSizeOptions: {
      type: Array,
      default: () => ['2', '4', '8', '10']
    },
    showLessItems: {
      type: Boolean,
      default: false
    },
    showQuickJumper: {
      type: Boolean,
      default: true
    },
    showSizeChanger: {
      type: Boolean,
      default: true
    },
    total: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  emits: ['change', 'showSizeChange', 'update:pageSize', 'update:current'],

  setup(props, { emit }) {
    const { total, pageSize, current } = toRefs(props)
    const change = (page, pageSize) => {
      emit('change', page, pageSize)
    }
    const showSizeChange = (current, size) => {
      emit('showSizeChange', current, size)
    }
    const updateCurrent = (current) => {
      emit('update:current', parseInt(current))
    }
    const pressEnter = (e) => {
      const maxPage = Math.ceil(total.value / pageSize.value)
      let goPage = e.target.value
      if (goPage > maxPage) goPage = maxPage
      emit('update:current', parseInt(goPage))
      change(goPage, pageSize.value)
    }
    const updatePageSize = (pageSize) => {
      const maxPage = Math.ceil(total.value / pageSize)
      if (current.value > maxPage) updateCurrent(maxPage)
      emit('update:pageSize', pageSize)
      showSizeChange(current.value, pageSize)
    }
    return {
      change,
      updateCurrent,
      updatePageSize,
      pressEnter,
      ...toRefs(props)
    }
  }
})
</script>

<style lang="scss" scoped>
.pagination {
  & > * {
    display: inline-block;
    height: 28px;
  }
  & > .ant-pagination-options-quick-jumper {
    box-sizing: border-box;
    line-height: 28px;
    margin-left: 8px;
    & > input {
      height: 100%;
      border-radius: 6px;
      margin: 0;
      margin-left: 5px;
    }
  }
  & > .show-total {
    margin-right: 8px;
    line-height: 28px;
    vertical-align: 8px;
  }
  & > .select-page-size {
    vertical-align: 8px;
    margin-right: 16px;
  }
  /* pagination */
  :deep {
    .ant-pagination.mini .ant-pagination-item.ant-pagination-item-active {
      border: 1px solid #4d88ff;
    }

    .ant-pagination.mini .ant-pagination-prev,
    .ant-pagination.mini .ant-pagination-next,
    .ant-pagination.mini .ant-pagination-item {
      min-width: 28px;
      height: 28px;
      background: #ffffff;
      border: 1px solid #dcdee2;
      box-sizing: border-box;
      border-radius: 6px;
      margin-right: 6px;
      line-height: 26px;
    }
    .ant-pagination.mini .ant-pagination-prev.ant-pagination-disabled {
      background-color: #f8f8f9;
    }
    .ant-pagination.mini .ant-pagination-next.ant-pagination-disabled {
      background-color: #f8f8f9;
    }
    .select-page-size
      .ant-select:not(.ant-select-customize-input)
      .ant-select-selector {
      height: 28px;
      min-height: 28px;
      border-radius: 6px;
      & > .ant-select-selection-item {
        line-height: 26px;
      }
    }
    .select-page-size
      .ant-select-single.ant-select-sm:not(.ant-select-customize-input).ant-select-show-arrow
      .ant-select-selection-item {
      line-height: 26px;
    }
    .ant-pagination.mini .ant-pagination-options-quick-jumper > input {
      height: 28px;
      line-height: 28px;
      border-radius: 6px;
    }
  }
}
</style>
