<script>
import HeaderView from '../components/HeaderView.vue';
import BuyConfirmPopup from '../components/BuyConfirmPopup.vue';
export default {
  components: {
    HeaderView, BuyConfirmPopup,
  },
  data() {
    return {
      itemList: [],
      showConfirm: false,
    };
  },
  methods: {
    handlePlus: function (item) {
      const newQuantity = item.infoQuantity + 1;
      const oldPrice = item.infoTotal / item.infoQuantity;
      item.infoQuantity = newQuantity;
      item.infoTotal = oldPrice * newQuantity;
      sessionStorage.setItem("orderList", JSON.stringify(this.itemList));
    },
    handleSub: function (item, index) {
      if (item.infoQuantity > 1) {
        const newQuantity = item.infoQuantity - 1;
        const oldPrice = item.infoTotal / item.infoQuantity;
        item.infoQuantity = newQuantity;
        item.infoTotal = oldPrice * newQuantity;
        sessionStorage.setItem("orderList", JSON.stringify(this.itemList));
      }
    },
    handledelete(item, index) {
      this.itemList.splice(index, 1);
      sessionStorage.setItem("orderList", JSON.stringify(this.itemList));
    },
    closeConfirm() {
      this.showConfirm = false;
    },
    goConfirm() {
      this.showConfirm = true;
    }
  },
  mounted() {
    const storedOrderList = sessionStorage.getItem("orderList");
    if (storedOrderList) {
      this.itemList = JSON.parse(storedOrderList);
    }
  },
  //離開頁面的監測
};
</script>
<template>
  <div id="app">
    <HeaderView></HeaderView>
    <div class="container">
      <div class="item_header">
        <div class="item_detail">商品</div>
        <div class="price">單價</div>
        <div class="count">數量</div>
        <div class="amount">總計</div>
        <div class="operate">操作</div>
      </div>
      <div class="item_container" v-for="(item, index) in itemList" :key="item.productsId.productCode">
        <div class="item_header item_body">
          <div class="item_detail">
            <img v-bind:src="item.productsId.productImg" alt="" />
            <div class="name">{{ item.productsId.productName }}</div>
          </div>

          <div class="price">
            <span>$</span>{{ item.infoTotal / item.infoQuantity }}
          </div>
          <div class="count">
            <button @click="handleSub(item)">-</button>
            {{ item.infoQuantity }}
            <button @click="handlePlus(item, index)">+</button>
          </div>
          <div class="amount">{{ item.infoTotal }}</div>
          <div class="operate">
            <button @click="handledelete(item, index)">刪除</button>
          </div>
        </div>
      </div>
    </div>
    <button @click="goConfirm" class="btn btn-warning">BUY</button>
    <transition name="fade">
      <BuyConfirmPopup @closeConfirm="closeConfirm" v-show="showConfirm" :isOpen="showConfirm" :orderList="itemList">
      </BuyConfirmPopup>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
template {
  background-color: rgba(0, 0, 0, 0.2);
}

#app {
  height: 100vh;
  background: #c9ccd3;
  background-blend-mode: lighten;
  background-image: linear-gradient(-180deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(0, 0, 0, 0.5) 100%);

  .btn {
    margin-top: 0.5rem;
    width: 5rem;
    border-radius: 30px;
  }

  .container {
    height: 75vh;
    overflow-y: auto;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }


  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    visibility: hidden;
  }

}

.item_header {
  display: flex;
  margin: 0 auto;
  height: 30px;
  background-color: #fff;
  border-radius: 3px;
  padding-left: 10px;
  background-color: #dcd9d4;
  background-image: linear-gradient(to bottom,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(0, 0, 0, 0.5) 100%),
    radial-gradient(at 50% 0%,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0.5) 50%);
  background-blend-mode: soft-light, screen;
}

.item_header div {
  width: 300px;
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
  object-fit: cover;
  /* margin-top: 10px; */
  float: left;
}

.item_detail .name {
  margin-left: 100px;
  margin-top: 20px;
}
</style>
