# 指南

## 项目环境要求

- Vue+TypeScript（墙裂推荐使用[vue3-boot](https://github.com/real-ju/vue3-boot)搭建项目）
- less 或 sass
- ant-design-vue@3.x

## 安装

Github 仓库地址：[https://github.com/real-ju/alive-table](https://github.com/real-ju/alive-table)

clone 本仓库到本地，复制组件源文件到项目中。

## 示例

::: code-group

```html [template]
<AliveTable ref="aliveTableRef" :schema="schema" v-model:model="model" :rules="rules">
  <!-- 表单域slot内容通过field-xxx-slot插槽传入（xxx为Field.key值） -->
  <template #field-photo-slot>
    <img class="photo" :src="photoUrl" alt="photo" />
  </template>
  <!-- 表单域组件slot内容通过field-xxx-comp-slot插槽传入（xxx为Field.key值） -->
  <template #field-marriage-comp-slot>
    <a-select-option :value="1">未婚</a-select-option>
    <a-select-option :value="2">已婚</a-select-option>
    <a-select-option :value="3">离异</a-select-option>
    <a-select-option :value="4">丧偶</a-select-option>
  </template>
  <!-- 自定义单元格slot内容通过custom-cell-xxx-slot插槽传入（xxx为CustomCell.key值） -->
  <template #custom-cell-github-slot>
    <div class="github">
      <a href="https://github.com/real-ju/alive-table" target="_blank">前往官方仓库</a>
    </div>
  </template>
</AliveTable>
<div class="action-area">
  <a-button type="primary" @click="verify">验证表格</a-button>
</div>
```

```ts [script]
import { ref } from 'vue';
import AliveTable from '@/components/AliveTable';
import schema from './schema';
import photoUrl from '@/xxx/photo.jpeg';

// 生成可编辑表格默认值
const creatJobHistoryData = () => {
  const list: any[] = [];
  for (let index = 1; index <= 3; index++) {
    list.push({
      key: String(index),
      date: '',
      company: '',
      duties: '',
      reason: ''
    });
  }
  return list;
};

const model = ref<Record<string, any>>({
  personalInfo: {
    name: '',
    sex: 1,
    age: 20,
    nativePlace: '',
    marriage: undefined,
    idCard: '',
    phone: ''
  },
  otherInfo: {
    job: '',
    address: '',
    interest: '',
    motto: ''
  },
  jobHistory: creatJobHistoryData()
});

const rules = ref<Record<string, any>>({
  personalInfo: {
    name: [{ required: true, message: '请输入姓名' }],
    age: [{ required: true, message: '请输入年龄' }]
  },
  // 可编辑表格验证
  jobHistory: {
    // 字段名对应表格columns[i].key
    date: [{ required: true, message: '请输入起止年月' }],
    company: [{ required: true, message: '请输入工作单位' }],
    duties: [{ required: true, message: '请输入担任职务' }]
  }
});

const aliveTableRef = ref();
const verify = () => {
  aliveTableRef.value.validate();
};
```

```less [style]
.photo {
  width: 100%;
  height: 100%;
}
.github {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.action-area {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

```ts [schema.ts]
import type { Schema } from '@/components/AliveTable/types';

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
```

:::

<ExampleIframe url="/demo" height="700px"></ExampleIframe>

<script setup lang="ts">
import ExampleIframe from "./src/ExampleIframe.vue";
</script>

## API

### Props

| 属性名         | 说明                                  | 类型                                                                             | 默认值 |
| -------------- | ------------------------------------- | -------------------------------------------------------------------------------- | ------ |
| schema         | 表格结构图                            | [Schema](https://github.com/real-ju/alive-table/blob/master/AliveTable/types.ts) | -      |
| model(v-model) | 表单数据对象                          | Object（详见示例）                                                               | -      |
| rules          | 表单验证规则（结构和 model 保持一致） | Object（详见示例）                                                               | -      |

### Methods

| 方法名         | 说明                                                                       |
| -------------- | -------------------------------------------------------------------------- |
| validate       | 同 [Ant Form](https://3x.antdv.com/components/form-cn/#%E6%96%B9%E6%B3%95) |
| validateFields | 同 [Ant Form](https://3x.antdv.com/components/form-cn/#%E6%96%B9%E6%B3%95) |
| clearValidate  | 同 [Ant Form](https://3x.antdv.com/components/form-cn/#%E6%96%B9%E6%B3%95) |
| resetFields    | 同 [Ant Form](https://3x.antdv.com/components/form-cn/#%E6%96%B9%E6%B3%95) |
