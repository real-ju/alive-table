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

// 可编辑表格的列配置
const tableColumns: any[] = [
  {
    title: '起止年月',
    key: 'date',
    editComp: {
      type: 'input'
    }
  },
  {
    title: '工作单位',
    key: 'company',
    editComp: {
      type: 'input'
    }
  },
  {
    title: '担任职务',
    key: 'duties',
    editComp: {
      type: 'input'
    }
  },
  {
    title: '离职原因',
    key: 'reason',
    editComp: {
      type: 'input'
    }
  }
];

// 结构图
const schema: Schema = [
  {
    type: 'field-group',
    key: 'personalInfo',
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
            options: sexOptions.value // 这里需要手动给ref解包
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
          type: 'input-number',
          compProps: {
            min: 16,
            max: 65
          }
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
            keyPath: 'personalInfo.nativePlace',
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
            keyPath: 'personalInfo.marriage',
            name: '婚姻状况',
            layout: 'horizontal',
            label: {
              type: 'string',
              size: '150px'
            },
            value: {
              type: 'select' // 通过slot传入select options
            }
          },
          {
            type: 'field',
            keyPath: 'personalInfo.idCard',
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
            keyPath: 'personalInfo.phone',
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
  },
  {
    type: 'field-group',
    key: 'otherInfo',
    name: '其他信息',
    layout: 'horizontal',
    height: '100px',
    label: {
      type: 'string',
      size: '150px'
    },
    contentLayout: 'float', // 自由布局
    children: [
      // 自由布局下子表单域需要指定width和height属性
      {
        type: 'field',
        key: 'job',
        name: '应聘职位',
        layout: 'horizontal',
        width: '50%',
        height: '50%',
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
        key: 'address',
        name: '现住址',
        layout: 'horizontal',
        width: '50%',
        height: '50%',
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
        key: 'interest',
        name: '兴趣爱好',
        layout: 'horizontal',
        width: '50%',
        height: '50%',
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
        key: 'motto',
        name: '座右铭',
        layout: 'horizontal',
        width: '50%',
        height: '50%',
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
    key: 'jobHistory',
    name: '工作经历',
    layout: 'vertical',
    label: {
      type: 'string',
      size: '50px'
    },
    value: {
      type: 'editable-table', // 可编辑表格
      compProps: {
        columns: tableColumns
      }
    }
  },
  {
    type: 'custom-row',
    height: '100px',
    children: [
      {
        content: {
          type: 'string',
          text: '欢迎'
        }
      },
      {
        content: {
          type: 'string',
          text: '使用！'
        }
      },
      {
        key: 'github',
        content: {
          type: 'slot'
        }
      }
    ]
  }
];

export default schema;
