<template>
  <div>
    <div class="title">
      <span class="title-left">选择小米提供的{{mitype}}</span><span class="title-right">了解{{mitype}} ></span>
    </div>
    <div class="service" v-for="(item,index) in servicelist" :key="index">
      <input type="checkbox" class="select1" ref="checkbutton" @click="checkedTop(index*2)">
      <div class="image">
        <img :src="item.s_icon" alt="">
      </div>
      <div class="box" >
        <h3>{{item.s_con1}}</h3><em class="save">{{item.s_save}}</em>
        <div class="con1">{{item.s_con2}}</div>
        <input type="checkbox" class="select2" ref="checkbutton" @click="checkedBottom(index*2+1)" ><span>我已经阅读<span>服务条款</span>|<span>常见问题</span></span><span class="span_price">{{item.s_price+'元'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      servicelist:[],
      checkedlist: {
        icon: '',
        save: '',
        title: '',
        price: '',
        describe: '',
        type: '',
        checked: false
      },
      resultList:[]
    }
  },
  props: {
    mitype: {
      type: String,
      default: null
    }
  }
  ,created() {
    setTimeout(()=> {
      this.getService()
    },10)
  },
  mounted() {

  },
  methods: {
   async getService() {
     let pro_id = this.$route.query.product_id
      const {data: res } = await this.$http.get(`/goods/service/${pro_id}/${this.mitype}`)
      this.servicelist = res.data
     let result = []
     for (let i = 0; i < this.servicelist.length; i++) {
       const serviceItem = {
         icon: this.servicelist[i].s_icon,
         checked: false,
         save: this.servicelist[i].s_save,
         title: this.servicelist[i].s_con1,
         describe: this.servicelist[i].s_con2,
         price: this.servicelist[i].s_price,
         type: this.servicelist[i].s_type
       }
       this.resultList.push(serviceItem)
     }
      this.$emit('serviceAllDate',this.resultList)
    },
    checkedTop(i) {
      let j = i/2;
      for (let k = 0; k < this.$refs.checkbutton.length; k++) {
        if(this.$refs.checkbutton[k].checked === true && k !== i){
          this.$refs.checkbutton[k].checked = false
        }
      }
      if (this.$refs.checkbutton[i].checked === true) {
        this.$refs.checkbutton[i+1].checked = true
        console.log(j)
        this.checkedlist.icon = this.servicelist[j].s_icon
        this.checkedlist.save = this.servicelist[j].s_save
        this.checkedlist.checked = true
        this.checkedlist.title = this.servicelist[j].s_con1
        this.checkedlist.describe = this.servicelist[j].s_con2
        this.checkedlist.price = this.servicelist[j].s_price
        this.checkedlist.type = this.servicelist[j].s_type
        console.log('-------------servicelist------------------')
        console.log(this.servicelist)
        console.log('-------------servicelist------------------')
        console.log('-------------checkedlist------------------')
        console.log(this.checkedlist)
        console.log('-------------checkedlist------------------')
      }else {
        this.$refs.checkbutton[i+1].checked = false
        this.checkedlist.icon = this.servicelist[j].s_icon
        this.checkedlist.checked = false
        this.checkedlist.save = this.servicelist[j].s_save
        this.checkedlist.title = this.servicelist[j].s_con1
        this.checkedlist.describe = this.servicelist[j].s_con2
        this.checkedlist.price = this.servicelist[j].s_price
        this.checkedlist.type = this.servicelist[j].s_type
        console.log('-------------servicelist------------------')
        console.log(this.servicelist)
        console.log('-------------servicelist------------------')
        console.log('-------------checkedlist------------------')
        console.log(this.checkedlist)
        console.log('-------------checkedlist------------------')
      }
      this.$emit('serviceData',this.checkedlist)

    },
    checkedBottom(i) {
      let j = (i-1)/2;
      if (this.$refs.checkbutton[i].checked === true) {
        this.$refs.checkbutton[i-1].checked = true
        this.checkedlist.checked = true
        this.checkedlist.save = this.servicelist[j].s_save
        this.checkedlist.icon = this.servicelist[j].s_icon
        this.checkedlist.title = this.servicelist[j].s_con1
        this.checkedlist.describe = this.servicelist[j].s_con2
        this.checkedlist.price = this.servicelist[j].s_price
        this.$emit('serviceData',this.checkedlist)
      }else if (this.$refs.checkbutton[i].checked === false) {
        this.$refs.checkbutton[i-1].checked = false
        this.checkedlist.checked = false
        this.checkedlist.save = this.servicelist[j].s_save
        this.checkedlist.icon = this.servicelist[j].s_icon
        this.checkedlist.title = this.servicelist[j].s_con1
        this.checkedlist.describe = this.servicelist[j].s_con2
        this.checkedlist.price = this.servicelist[j].s_price
        this.checkedlist.type = this.servicelist[j].s_type
        this.$emit('serviceData',this.checkedlist)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  height: 27px;
  width: 600px;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 15px;
}
.title-left {
  font-size: 18px;
}
.title-right {
  font-size: 14px;
  color: #ff6700;
}
.service {
  position: relative;
  width: 598px;
  height: 86px;
  padding: 30px 0;
  border: 1px solid #e0e0e0;
  margin-top: -1px;
}
.select1 {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 40%;
  left: 3%;
  margin: 5px 0 0 30px;
  -webkit-appearance: none;
  color: #ffffff;
  font-size:0.8rem;
  -webkit-border-radius:50%;
  border: 1px solid #b0b0b0;
  float: left;
}
.select1:checked,.select2:checked {
  background-color: #ff6700;
}
.select1:checked:after {
  content:'';
  position:absolute;
  top:4px;
  left:4px;
  border:#fff solid 2px;
  border-top:none;
  border-right:none;
  height:5px;
  width:7px;
  -moz-transform:rotate(-50deg);
  -ms-transform:rotate(-50deg);
  -webkit-transform:rotate(-50deg);
  transform:rotate(-50deg);
}
.select2 {
  width: 16px;
  height: 16px;
  margin-top: 4px;
  -webkit-appearance: none;
  color: #ffffff;
  border: 1px solid #b0b0b0;
  float: left;
}
.select2:checked:after {
  content:'';
  position:absolute;
  top:55px;
  left:7px;
  border:#fff solid 2px;
  border-top:none;
  border-right:none;
  height:5px;
  width:7px;
  -moz-transform:rotate(-50deg);
  -ms-transform:rotate(-50deg);
  -webkit-transform:rotate(-50deg);
  transform:rotate(-50deg);
}
.image {
  position: absolute;
  left: 13%;
  width: 50px;
  height: 86px;
  margin: 0 15px 0 10px;
  float: left;
}
h3 {
  display: inline;
}
.box {
  position: absolute;
  left: 25%;
  float: left;
}
.image img {
  position: absolute;
  top: 0;
  width: 50px;
  height: 50px;
  float: left;
}
.con1 {
  width: 286px;
  height: 18px;
  margin-top: 5px;
  font-size: 12px;
  color: #B0B0B0;
}
span {
  font-size: 14px;
}
.span_price {
  position: absolute;
  top: 70%;
  right: 5%;
  font-size: 14px;
}
.save {
  background-color: #ff6700;
  font-style: normal;
  font-weight: bold;
  padding: 2px 6px;
  font-size: 14px;
  margin: 0 0 0 2px;
  color: #ffffff;
  border-radius: 20px;
}
</style>
