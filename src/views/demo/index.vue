<template>
  <div class="demo-page">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AliveTable from '/@/components/AliveTable';
import schema from './schema';
import photoUrl from '/@/assets/images/demo/photo.jpeg';

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
</script>

<style lang="less">
.demo-page {
  width: 100%;
  min-width: 1000px;
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
}
</style>
