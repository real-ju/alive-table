<template>
  <div class="demo-page">
    <AliveTable :schema="schema" v-model:model="model" :rules="rules">
      <!-- 表单域slot内容通过field-xxx-slot插槽传入（xxx为Field.key值） -->
      <template #field-photo-slot>
        <img class="photo" :src="photoUrl" alt="photo" />
      </template>
    </AliveTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { default as AliveTable, EditableTable } from '/@/components/AliveTable';
import schema from './schema';
import photoUrl from '/@/assets/images/demo/photo.jpeg';

const model = ref<Record<string, any>>({});

const rules = ref<Record<string, any>>({});
</script>

<style lang="less">
.demo-page {
  width: 100%;
  min-width: 800px;
  padding: 20px 200px;
  .photo {
    width: 100%;
    height: 100%;
  }
}
</style>
