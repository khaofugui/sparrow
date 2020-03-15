import Base from '../Base';

export default class Switch extends Base{

  constructor (attrs: any, componentIndex: number) {
    super(attrs, componentIndex);
    this.labelValue = '开关';
  }

  public fragment () {
    return `
      <el-form-item label=" ">
        <label-box label="${this.labelValue}" indexcomp="${this.componentIndex}"></label-box>
        <el-switch></el-switch>
      </el-form-item>
    `;
  }
}