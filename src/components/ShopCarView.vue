<script>
export default {
  data() {
    return {
      itemList: [
        {
          id: "1",
          itemName: "商品1",
          imgUrl: "../../public/img/hm1.jpg",
          price: "500",
          count: "1",
        },
        {
          id: "2",
          itemName: "商品1",
          imgUrl: "../../public/img/friedck.jpg",
          price: "790",
          count: "1",
        },
        {
          id: "3",
          itemName: "商品1",
          imgUrl: "../../public/img/friedck.jpg",
          price: "1200",
          count: "1",
        },
        {
          id: "4",
          itemName: "商品1",
          imgUrl: "../../public/img/friedck.jpg",
          price: "2300",
          count: "1",
        },
      ],

      //選中的商品列表，用於計算總價
      checkList: [],
    };
  },
  methods: {
    handlePlus: function (item) {
      console.log(item);
      item.count++;
    },
    handleSub: function (item) {
      console.log(item);
      if (item.count > 1) {
        item.count--;
      }
    },
    handledelete: function (index) {
      this.itemList.splice(index, 1);
    },
  },
};
</script>
<template>
  <div id="app">
    <div class="container">
      <div class="item_header">
        <div class="item_detail">商品</div>
        <div class="price">單價</div>
        <div class="count">數量</div>
        <div class="amount">總計</div>
        <div class="operate">操作</div>
      </div>
      <div
        class="item_container"
        v-for="(item, index) in itemList"
        :key="item.id"
      >
        <div class="item_header item_body">
          <div class="item_detail">
            <img v-bind:src="item.imgUrl" alt="" />
            <div class="name">{{ item.itemName }}</div>
          </div>

          <div class="price"><span>$</span>{{ item.price }}</div>
          <div class="count">
            <button @click="handleSub(item)">-</button>
            {{ item.count }}
            <button @click="handlePlus(item)">+</button>
          </div>
          <div class="amount">{{ item.price * item.count }}</div>
          <div class="operate">
            <button @click="handledelete(index)">刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
template {
  background-color: rgba(0, 0, 0, 0.2);
}
.item_header {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  height: 30px;
  background-color: #fff;
  border-radius: 3px;
  padding-left: 10px;
}
.item_header div {
  width: 200px;
  color: #888;
  line-height: 30px;
}
.item_header .item_detail {
  width: 50%;
}
.item_body {
  margin-top: 20px;
  height: 100px;
  align-items: center;
}
.item_detail img {
  width: 80px;
  height: 80px;
  border-radius: 3px;
  /* margin-top: 10px; */
  float: left;
}
.item_detail .name {
  margin-left: 100px;
  margin-top: 20px;
}
</style>
