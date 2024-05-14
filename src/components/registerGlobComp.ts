import type { App } from 'vue';

import {
  Input,
  InputNumber,
  Select,
  SelectOption,
  Table,
  Form,
  FormItem,
  Button
} from 'ant-design-vue/es';

export function registerGlobComp(app: App) {
  // antd components register
  app.component(Input.name, Input);
  app.component(InputNumber.name, InputNumber);
  app.component(Select.name, Select);
  app.component('a-select-option', SelectOption);
  app.component(Table.name, Table);
  app.component(Form.name, Form);
  app.component(FormItem.name, FormItem);
  app.component(Button.name, Button);
}
