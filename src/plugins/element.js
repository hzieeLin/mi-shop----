import Vue from 'vue'
import {Menu, MenuItem, Button, Form, FormItem, Input, Icon, Message, Submenu} from "element-ui";

Vue.prototype.$message = Message
Vue.use(Submenu)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Button)