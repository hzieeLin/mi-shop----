<template>
  <div class="box">
    <input type="checkbox" v-model="checkAll">全选/全不选
    <ul>
      <li v-for="(item, index) in list" :key="index"> <input type="checkbox" v-model="checklist[index]">{{item}} </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      list: ['one','two','three'],
      checklist: [false, true, false]
    }
  },
  computed: {
    checkAll: {
      get() {
        return !this.checklist.includes(false)
      },
      set(newValue) {
        this.checklist = this.checklist.map(() => newValue)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  height: 300px;
  width: 100%;
  background-color: #63a35c;
}
</style>
