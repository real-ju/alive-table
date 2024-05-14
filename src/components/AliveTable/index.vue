<script lang="ts">
import type { PropType } from 'vue';
import type { Schema, FieldGroup, Field, CustomRow, CustomCell } from './types';

import { ref } from 'vue';
import { Input, InputNumber, Select, Form, FormItem } from 'ant-design-vue/es';
import EditableTable from './components/EditableTable/index.vue';

const compMap: Record<string, any> = {
  input: Input,
  'input-number': InputNumber,
  select: Select
};

export default defineComponent({
  name: 'AliveTable',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      default: null
    },
    model: {
      type: Object,
      default: null
    },
    rules: {
      type: Object,
      default: null
    }
  },
  setup(props, { slots, expose }) {
    if (!props.schema || !props.model) {
      return () => null;
    }

    // 构建CustomCell的节点
    const generateCustomCellNodes = (arr: CustomCell[]): any => {
      return arr.map((item) => {
        const defaultSlot = slots[`custom-cell-${item.key}-slot`];
        return h(
          'div',
          {
            class: {
              cell: item.content.type !== 'slot',
              'custom-cell': true
            },
            style: {
              flex: item.width ? 'none' : null,
              width: item.width ? item.width : null
            }
          },
          item.content.type === 'string' ? item.content.text : defaultSlot && defaultSlot()
        );
      });
    };

    // 构建Table的节点
    const generateNodes = (
      arr: Array<FieldGroup | Field | CustomRow>,
      parent?: FieldGroup
    ): any => {
      return arr.map((item) => {
        if (item.type === 'field') {
          if (!item.key && !item.keyPath) {
            throw '存在field没有指定key或keyPath';
          }
          if (!item.keyPath && parent && !parent.key) {
            throw '存在field-group没有指定key';
          }
          // 处理keyPath
          if (!item.keyPath) {
            if (parent) {
              item.keyPath = parent.keyPath + '.' + item.key;
            } else {
              item.keyPath = item.key;
            }
          }
          const keyPathArr = item.keyPath!.split('.');

          // 根据schema层级推断字段所属model对象
          let modelObj: any = props.model;
          keyPathArr.forEach((key, index) => {
            if (index < keyPathArr.length - 1) {
              if (Reflect.has(modelObj, key)) {
                modelObj = modelObj[key];
              }
            }
          });

          // 字段key
          const modelKey = keyPathArr[keyPathArr.length - 1];

          // 值单元格子节点
          let valueCellChildren: any;
          // 如果值单元格是组件类型，获取属于该组件的slots
          const compSlots: Record<string, any> = {};
          Object.keys(slots).forEach((key) => {
            if (key.includes(`field-${item.key}-comp-slot`)) {
              if (
                key === `field-${item.key}-comp-slot` ||
                key === `field-${item.key}-comp-slot-default`
              ) {
                compSlots.default = slots[key];
              } else {
                const arr = key.split('-');
                const name = arr[arr.length - 1];
                compSlots[name] = slots[key];
              }
            }
          });

          if (item.value.type === 'string') {
            // 字符串
            valueCellChildren = h('span', null, item.value.content || '');
          } else if (
            item.value.type === 'input' ||
            item.value.type === 'input-number' ||
            item.value.type === 'select'
          ) {
            // 可输入组件
            // 添加表单验证
            valueCellChildren = h(FormItem, { name: keyPathArr }, () =>
              h(
                compMap[item.value.type],
                {
                  value: modelObj[modelKey],
                  'onUpdate:value': (value: any) => {
                    modelObj[modelKey] = value;
                  },
                  ...item.value.compProps
                },
                compSlots
              )
            );
          } else if (item.value.type === 'slot') {
            // 自定义内容
            const defaultSlot = slots[`field-${item.key}-slot`];
            valueCellChildren = defaultSlot && defaultSlot();
          } else if (item.value.type === 'editable-table') {
            // 可编辑表格
            // 根据schema层级推断字段对应rules
            let modelRules: any = props.rules;
            if (props.rules) {
              for (let index = 0; index < keyPathArr.length; index++) {
                const key = keyPathArr[index];
                if (Reflect.has(modelRules, key)) {
                  modelRules = modelRules[key];
                } else {
                  modelRules = null;
                  break;
                }
              }
            }
            // 获取属于EditableTable的slots
            const compSlots: Record<string, any> = {};
            Object.keys(slots).forEach((key) => {
              // table-xxx-col-yyy-comp-slot
              if (key.includes(`table-${item.key}-col-`)) {
                const arr = key.split('-');
                const name = arr[arr.length - 3];
                compSlots[`col-${name}-comp-slot`] = slots[key];
              }
            });

            valueCellChildren = h(
              EditableTable,
              {
                tableProps: {
                  ...item.value.compProps,
                  dataSource: modelObj[modelKey]
                },
                rules: modelRules
              },
              compSlots
            );
          }
          const childNodes = [
            h(
              'div',
              {
                class: {
                  cell: item.value.type === 'string',
                  value: true,
                  slot: item.value.type === 'slot'
                },
                style: {
                  flex: item.value.size ? 'none' : null,
                  width: item.layout === 'horizontal' && item.value.size ? item.value.size : null,
                  height: item.layout === 'vertical' && item.value.size ? item.value.size : null,
                  border: !item.label ? 'none' : null
                }
              },
              valueCellChildren
            )
          ];
          if (item.label) {
            childNodes.unshift(
              h(
                'div',
                {
                  class: 'cell label',
                  style: {
                    flex: item.label.size ? 'none' : null,
                    width: item.layout === 'horizontal' && item.label.size ? item.label.size : null,
                    height: item.layout === 'vertical' && item.label.size ? item.label.size : null
                  }
                },
                item.name || ''
              )
            );
          }
          return h(
            'div',
            {
              class: {
                row: !parent,
                field: true,
                [(item.key || item.keyPath)!]: true,
                vertical: item.layout === 'vertical'
              },
              style: {
                flex: item.size || (parent && parent.contentLayout === 'float') ? 'none' : null,
                width:
                  parent && parent.contentLayout === 'horizontal' && item.size
                    ? item.size
                    : parent && parent.contentLayout === 'float' && item.width
                    ? item.width
                    : null,
                height:
                  !parent || (parent.contentLayout === 'vertical' && item.size)
                    ? item.size
                    : parent && parent.contentLayout === 'float' && item.height
                    ? item.height
                    : null
              }
            },
            childNodes
          );
        } else if (item.type === 'field-group') {
          // 处理keyPath
          if (item.key) {
            if (parent) {
              item.keyPath = parent.keyPath + '.' + item.key;
            } else {
              item.keyPath = item.key;
            }
          }

          const childNodes = [
            h(
              'div',
              {
                class: {
                  content: true,
                  vertical: item.contentLayout === 'vertical',
                  float: item.contentLayout === 'float'
                },
                style: {
                  border: !item.label ? 'none' : null
                }
              },
              generateNodes(item.children, item)
            )
          ];
          if (item.label) {
            childNodes.unshift(
              h(
                'div',
                {
                  class: 'cell label',
                  style: {
                    flex: item.label.size ? 'none' : null,
                    width: item.layout === 'horizontal' && item.label.size ? item.label.size : null,
                    height: item.layout === 'vertical' && item.label.size ? item.label.size : null
                  }
                },
                item.name || ''
              )
            );
          }
          return h(
            'div',
            {
              class: {
                row: true,
                'field-group': true,
                vertical: item.layout === 'vertical'
              },
              style: {
                flex: item.height ? 'none' : null,
                height: item.height ? item.height : null
              }
            },
            childNodes
          );
        } else if (item.type === 'custom-row') {
          return h(
            'div',
            {
              class: 'custom-row',
              style: {
                flex: item.height ? 'none' : null,
                height: item.height ? item.height : null
              }
            },
            generateCustomCellNodes(item.children)
          );
        }
      });
    };

    const formRef = ref();
    const formMethods = [
      'clearValidate',
      'resetFields',
      'scrollToField',
      'validate',
      'validateFields'
    ];

    const exposeObj: Record<string, any> = {};

    formMethods.forEach((item) => {
      exposeObj[item] = (...rest: any[]) => {
        return formRef.value && formRef.value[item](...rest);
      };
    });

    expose(exposeObj);

    return () => {
      const nodes = generateNodes(props.schema);
      return h(
        'div',
        { class: 'alive-table' },
        h(
          Form,
          {
            ref: formRef,
            autocomplete: 'off',
            model: props.model,
            rules: props.rules
          },
          () => nodes
        )
      );
    };
  }
});
</script>

<style lang="less" scoped>
.alive-table {
  width: 100%;
  border: 1px solid #000000;
  box-sizing: border-box;
  div {
    box-sizing: border-box;
  }
  .row {
    width: 100%;
    & + .row {
      border-top: 1px solid #000000;
    }
  }
  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .field {
    display: flex;
    align-items: stretch;
    > .label {
      width: 0px;
      flex: 1;
    }
    > .value {
      width: 0px;
      flex: 1;
      border-left: 1px solid #000000;
      position: relative;
      &.slot {
        overflow: auto;
      }
      :deep {
        .ant-input {
          height: 100%;
        }
        .ant-input-number {
          width: 100%;
          height: 100%;
          .ant-input-number-input-wrap {
            height: 100%;
            display: flex;
            align-items: center;
          }
        }
        .ant-select {
          width: 100%;
          height: 100%;
          .ant-select-selector {
            height: 100%;
            .ant-select-selection-search-input {
              height: 100%;
            }
            .ant-select-selection-placeholder {
              display: flex;
              align-items: center;
            }
            .ant-select-selection-item {
              display: flex;
              align-items: center;
            }
          }
        }
        .ant-table-wrapper {
          .ant-table-container {
            border-left: none;
            // 没有固定表头情况下存在
            .ant-table-content {
              > table {
                border-top: none;
              }
            }
            .ant-table-header,
            .ant-table-thead {
              > table {
                border-top: none;
              }
              .ant-table-cell {
                padding: 0px;
                background-color: unset;
              }
            }
            .ant-table-body,
            .ant-table-tbody {
              .ant-table-cell {
                padding: 0px;
              }
            }
            .ant-table-cell {
              border-right: none;
              border-bottom-color: #000000;
              & + .ant-table-cell {
                border-left: 1px solid #000000;
              }
            }
            .ant-table-cell-scrollbar {
              border-left: none !important;
            }
          }
          // 表单样式
          .ant-input,
          .ant-input-number,
          .ant-select {
            height: 40px;
          }
        }
        .ant-form-item {
          margin: 0px;
          width: 100%;
          height: 100%;
          position: relative;
          .ant-form-item-control,
          .ant-form-item-control-input,
          .ant-form-item-control-input-content {
            width: 100%;
            height: 100%;
          }
          .ant-form-item-control-input {
            min-height: unset;
          }
          .ant-form-item-explain {
            position: absolute;
            top: 100%;
            left: 0px;
            opacity: 0.8;
            pointer-events: none;
            z-index: 1;
          }
        }
      }
    }
    &.vertical {
      flex-direction: column;
      .label {
        width: unset;
        height: 0px;
      }
      .value {
        width: unset;
        height: 0px;
        border-left: none;
        border-top: 1px solid #000000;
      }
    }
  }
  .field-group {
    display: flex;
    align-items: stretch;
    > .label {
      width: 0px;
      flex: 1;
    }
    > .content {
      width: 0px;
      flex: 1;
      border-left: 1px solid #000000;
      display: flex;
      align-items: stretch;
      > div {
        width: 0px;
        flex: 1;
        & + div {
          border-left: 1px solid #000000;
        }
      }
      &.vertical {
        flex-direction: column;
        > div {
          width: unset;
          height: 0px;
          & + div {
            border-left: none;
            border-top: 1px solid #000000;
          }
        }
      }
      &.float {
        align-items: flex-start;
        flex-wrap: wrap;
        align-content: flex-start;
        > div {
          // border: 1px solid lighten(#000000, 50%);
          border: 1px solid #000000;
        }
      }
    }
    &.vertical {
      flex-direction: column;
      > .label {
        width: unset;
        height: 0px;
      }
      > .content {
        width: unset;
        height: 0px;
        border-left: none;
        border-top: 1px solid #000000;
      }
    }
  }
  .custom-row {
    width: 100%;
    display: flex;
    align-items: stretch;
    .custom-cell {
      width: 0px;
      flex: 1;
      position: relative;
      & + .custom-cell {
        border-left: 1px solid #000000;
      }
    }
  }
}
</style>
