<template>
  <div class="demo-page">
    <AliveTable :schema="schema" v-model:model="model" :rules="rules"></AliveTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { default as AliveTable, EditableTable } from '/@/components/AliveTable';
import schema from './schema';

const model = ref<Record<string, any>>({});

const rules = ref<Record<string, any>>({});
</script>

<style lang="less">
.demo-page {
  width: 100%;
}
</style>
