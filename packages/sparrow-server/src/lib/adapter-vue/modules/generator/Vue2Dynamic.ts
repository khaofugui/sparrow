import  VueParse from './VueParse';
const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';
import Container from '../box/Container';
import storage from '../../../storage';
import * as fsExtra from 'fs-extra';
import * as Path from 'path';

export default class Vue2Dynamic{
  rootTemplate: string = '';
  vueParse: any;
  uuid:string = '';
  $fragment: any;
  components: any = [];
  widgetType: string = 'DVue';
  dComponents: any = [];

  constructor (template: string = '') {
    this.uuid = uuid().split('-')[0]; 
    this.rootTemplate = template;
    this.vueParse = new VueParse(this.uuid, template);
    this.templateParse();
    this.injectionSlot();
    this.activeCode();
    this.components.push(new Container({}, storage));
    console.log(this.$fragment.html());
  }
  
  templateParse () {
    this.$fragment = cheerio.load(this.vueParse.template, {
      xmlMode: true,
      decodeEntities: false,
    });
    // console.log('********', this.$fragment('template').toArray());
  }
  
  // 激活容器
  activeCode () {
    const activeNodeList = [
      'el-form',
      's-box',
    ];
    activeNodeList.forEach(key => {
      const tempUuid = uuid().split('-')[0];
      const currentNode = this.$fragment(key);
      currentNode.attr('data-design-mode', 'design-border-box');
      currentNode.attr('data-instance-name', key);
      currentNode.attr('data-type', 'box');
      currentNode.attr('data-id', this.uuid);
      currentNode.attr('data-child-id', tempUuid);
      this.dComponents.push({
        uuid: tempUuid,
        node: currentNode,
        components: [],
      })
    });
  }
  
  // 注入占位
  injectionSlot () {
    this.$fragment('template').children('div').append('<div class="drag-box">empty</div>')
  }

  public setPreview () {
    this.renderComp();
  }

  public renderComp () {
    this.$fragment('.drag-box').first().empty();
    this.components.forEach(component => {
      this.$fragment('.drag-box').first().append(component.getFragment(0).html());
    });

    if (this.components.length  === 0) {
      this.$fragment('.drag-box').attr('data-empty', true);
    }
  }

  public addComponent (data, operatetype: string = 'manual') {
    console.log('**********8*****', data);
    // let { id, params = {}, nextSiblingId, config, path } = data;
    //   if (config) {
    //     config.initType = operatetype;
    //   }
    //   let compIndex = -2;
    //   if (nextSiblingId) {
    //     compIndex = this.components.findIndex(item => item.uuid === nextSiblingId);
    //   }

    //   const hasBox = fsExtra.pathExistsSync(Path.join(__dirname, `../box/${id}`));
    //   let isPlugins = false;
    //   if (id.includes('sparrow')) {
    //     isPlugins = true;
    //   }
    //   let backComp = null;
    //   if (isPlugins) {
    //     const dynamicObj = require(path).default;
    //     const comp = new dynamicObj(config || data, storage);
    //     comp.path = path;
    //     if (compIndex >= 0) {
    //       this.components.splice(compIndex, 0, comp)
    //     } else {
    //       this.components.push(comp);
    //     }
    //     backComp = comp;
    //   } 
    //   else if (path) {
    //     const dynamicObj = require(`..${path}`).default;
    //     const comp = new dynamicObj(config || data, storage);
    //     comp.path = path;
    //     if (compIndex >= 0) {
    //       this.components.splice(compIndex, 0, comp)
    //     } else {
    //       this.components.push(comp);
    //     }
    //     backComp = comp;

    //   } else if (hasBox) {
    //     const dynamicObj = require(`../box/${id}`).default;
    //     const comp = new dynamicObj(data, storage)
    //     if (compIndex >= 0) {
    //       this.components.splice(compIndex, 0, comp)
    //     } else {
    //       this.components.push(comp);
    //     }
    //     backComp = comp;
    //   } else {
    //     const dynamicObj = require(`../component/${id}`).default;
    //     const comp = new dynamicObj(config || params, '');
    //     if (compIndex >= 0) {
    //       this.components.splice(compIndex, 0, comp)
    //     } else {
    //       this.components.push(comp);
    //     }
    //     backComp = null;
    //   }

    //   return backComp;
  }

  public getFragment(index: number): any {
    return this.$fragment;
  }

  getConfig() {
    return {};
  }

}