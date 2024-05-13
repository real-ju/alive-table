import type { Schema } from '/@/components/AliveTable/types';

import { ref } from 'vue';

const sexOptions = ref([
  {
    value: 1,
    label: '男'
  },
  {
    value: 2,
    label: '女'
  }
]);

const schema: Schema = [
  {
    type: 'field-group',
    key: 'row1',
    layout: 'horizontal',
    height: '50px',
    contentLayout: 'horizontal',
    children: [
      {
        type: 'field',
        key: 'name',
        name: '姓名',
        layout: 'horizontal',
        label: {
          type: 'string',
          size: '150px'
        },
        value: {
          type: 'input'
        }
      },
      {
        type: 'field',
        key: 'sex',
        name: '性别',
        layout: 'horizontal',
        label: {
          type: 'string',
          size: '150px'
        },
        value: {
          type: 'select',
          compProps: {
            options: sexOptions.value
          }
        }
      },
      {
        type: 'field',
        key: 'age',
        name: '年龄',
        layout: 'horizontal',
        label: {
          type: 'string',
          size: '150px'
        },
        value: {
          type: 'input-number'
        }
      }
    ]
  },
  {
    type: 'field-group',
    key: 'row2',
    layout: 'horizontal',
    height: '200px',
    contentLayout: 'horizontal',
    children: [
      {
        type: 'field-group',
        key: 'basicInfo',
        name: '基本信息',
        layout: 'horizontal',
        label: {
          type: 'string',
          size: '150px'
        },
        contentLayout: 'vertical',
        children: [
          {
            type: 'field',
            key: 'nativePlace',
            name: '籍贯',
            layout: 'horizontal',
            label: {
              type: 'string',
              size: '150px'
            },
            value: {
              type: 'input'
            }
          },
          {
            type: 'field',
            key: 'marriage',
            name: '婚姻状况',
            layout: 'horizontal',
            label: {
              type: 'string',
              size: '150px'
            },
            value: {
              type: 'input'
            }
          },
          {
            type: 'field',
            key: 'idCard',
            name: '身份证号码',
            layout: 'horizontal',
            label: {
              type: 'string',
              size: '150px'
            },
            value: {
              type: 'input'
            }
          },
          {
            type: 'field',
            key: 'phone',
            name: '手机号码',
            layout: 'horizontal',
            label: {
              type: 'string',
              size: '150px'
            },
            value: {
              type: 'input'
            }
          }
        ]
      },
      {
        type: 'field',
        key: 'photo',
        name: '照片',
        layout: 'horizontal',
        size: '150px',
        value: {
          type: 'slot'
        }
      }
    ]
  }
];

export default schema;
