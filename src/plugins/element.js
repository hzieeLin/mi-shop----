import Vue from 'vue'
import {Menu, MenuItem, Button, Form, FormItem, Input, Icon, Message,
    Submenu, Row, Col, Collapse, Dialog, Cascader, CascaderPanel, Table, TableColumn,
    Checkbox, InputNumber, Tooltip, Badge, Breadcrumb, BreadcrumbItem} from "element-ui";
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.prototype.$message = Message
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Badge)
Vue.use(Tooltip)
Vue.use(InputNumber)
Vue.use(Checkbox)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Cascader)
Vue.use(CascaderPanel)
Vue.use(Dialog)
Vue.use(Collapse)
Vue.use(Row)
Vue.use(Col)
Vue.use(Submenu)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Button)
Vue.component(CollapseTransition.name, CollapseTransition)