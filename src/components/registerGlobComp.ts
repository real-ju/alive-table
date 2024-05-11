import type { App } from 'vue';

import { Input, InputNumber, Select, Table, Form, FormItem } from 'ant-design-vue/es';

export function registerGlobComp(app: App) {
  // antd components register
  app.component(Input.name, Input);
  app.component(InputNumber.name, InputNumber);
  app.component(Select.name, Select);
  app.component(Table.name, Table);
  app.component(Form.name, Form);
  app.component(FormItem.name, FormItem);
}
