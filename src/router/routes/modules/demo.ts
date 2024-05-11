import type { RouteRecordRaw } from 'vue-router';

import { asyncViewImport } from '/@/router/helper/asyncViewImport';

const demo: RouteRecordRaw = {
  path: '/demo',
  name: 'demo',
  meta: {
    title: 'AliveTable示例',
    public: true
  },
  component: asyncViewImport('demo/index.vue')
};

export default demo;
