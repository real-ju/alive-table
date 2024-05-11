// 结构图
export type Schema = Array<FieldGroup | Field | CustomRow>;

// 表单域组
export interface FieldGroup {
  type: 'field-group';
  key: string; // 唯一标识
  keyPath?: string; // key路径，自动计算，无需指定
  name?: string; // 组名
  layout: 'horizontal' | 'vertical'; // 组排版方式
  height?: string; // 高度
  // 标签
  label?:
    | false
    | {
        type: 'string'; // 显示name值
        size?: string; // FieldGroup.layout = horizontal表示所占宽度，FieldGroup.layout = vertical表示所占高度（支持css）
      };
  contentLayout: 'horizontal' | 'vertical' | 'float'; // 组内部子元素排版方式。float为自由布局，此时子元素只能是Field，且需要指定子元素的width和height值
  children: Array<FieldGroup | Field | CustomRow>; // 子元素
}

// 表单域
export interface Field {
  type: 'field';
  key?: string; // 唯一标识
  keyPath?: string; // key路径，指定后会通过该路径推断model对象中绑定的值
  name?: string; // 域名
  layout: 'horizontal' | 'vertical'; // 域排版方式
  size?: string; // 父级FieldGroup.contentLayout = horizontal表示所占宽度，没有父级或者父级FieldGroup.contentLayout = vertical表示所占高度
  width?: string; // 父级FieldGroup.contentLayout = float时生效
  height?: string; // 父级FieldGroup.contentLayout = float时生效
  // 标签
  label?:
    | false
    | {
        type: 'string'; // 显示name值
        size?: string; // Field.layout = horizontal表示所占宽度，Field.layout = vertical表示所占高度
      };
  // 值区域
  value: {
    type: 'string' | 'input' | 'input-number' | 'select' | 'slot' | 'editable-table';
    size?: string; // Field.layout = horizontal表示所占宽度，Field.layout = vertical表示所占高度
    content?: string; // Field.type = string时指定显示文本
    compProps?: Object; // 值区域组件props，对应h()第二个参数
  };
}

// 自定义行
export interface CustomRow {
  type: 'custom-row';
  height?: string; // 高度
  children: Array<CustomRowCell>; // 包含单元格
}

// 自定义单元格
export interface CustomRowCell {
  width?: string; // 所占宽度
  content?: string; // 单元格显示文本
}
