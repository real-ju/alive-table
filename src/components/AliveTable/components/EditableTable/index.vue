<template>
  <div class="editable-table" v-if="tableProps && tableProps.columns && tableProps.dataSource">
    <Form ref="formRef" autocomplete="off" :model="tableProps.dataSource" :rules="formRules">
      <Table v-bind="props.tableProps" :pagination="false" bordered :scroll="tableScroll">
        <template #bodyCell="{ column, record, index }">
          <FormItem v-if="column.key && column.editComp" :name="[index, column.key]">
            <component
              :is="compMap[column.editComp.type]"
              v-model:value="record[column.key]"
              v-bind="column.editComp.props || {}"
              v-on="column.editComp.on || {}"
            >
              <slot :name="`col-${column.key}-comp-slot`"></slot>
            </component>
          </FormItem>
          <template v-else>请指定column.key和column.editComp</template>
        </template>
      </Table>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Table, Input, InputNumber, Select, Form, FormItem } from 'ant-design-vue/es';

const compMap: Record<string, any> = {
  input: Input,
  'input-number': InputNumber,
  select: Select
};

const props = defineProps({
  tableProps: {
    type: Object,
    default: null
  },
  rules: {
    type: Object,
    default: null
  }
});

const formRef = ref();

const tableScroll = computed(() => {
  const scroll = props.tableProps.scroll;
  if (scroll) {
    scroll.y = 0;
    return scroll;
  } else {
    return { y: 0 };
  }
});

const formRules = computed<any>(() => {
  if (!props.rules) {
    return null;
  }
  return new Array(props.tableProps.dataSource.length).fill(props.rules);
});

defineExpose({
  formRef
});
</script>

<style lang="less" scoped>
.editable-table {
  width: 100%;
  height: 100%;
  :deep {
    .ant-form {
      width: 100%;
      height: 100%;
      .ant-form-item-explain {
        top: unset !important;
        bottom: 0px;
        left: unset !important;
        right: 5px;
        min-height: unset;
        font-size: 12px;
        line-height: 1.5;
      }
    }
    .ant-table-wrapper {
      width: 100%;
      height: 100%;
      .ant-spin-nested-loading {
        height: 100%;
        .ant-spin-container {
          height: 100%;
          .ant-table {
            height: 100%;
            .ant-table-container {
              height: 100%;
              display: flex;
              flex-direction: column;
              .ant-table-header {
                flex: none;
                .ant-table-cell {
                  padding: 13px;
                }
              }
              .ant-table-body {
                height: 0px;
                flex: 1;
                max-height: unset !important;
                overflow-y: auto !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
