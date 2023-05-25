<script>
export default {
  data() {
    return {
      itemList: [],
    };
  },
  methods: {
    handlePlus: function (item) {
      const newQuantity = item.quantity + 1;
      const oldPrice = item.totalPrice / item.quantity;
      item.quantity = newQuantity;
      item.totalPrice = oldPrice * newQuantity;
      sessionStorage.setItem("orderList", JSON.stringify(this.itemList));
    },
    handleSub: function (item, index) {
      if (item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        const oldPrice = item.totalPrice / item.quantity;
        item.quantity = newQuantity;
        item.totalPrice = oldPrice * newQuantity;
        sessionStorage.setItem("orderList", JSON.stringify(this.itemList));
      }
    },
    handledelete(item, index) {
      this.itemList.splice(index, 1);
      sessionStorage.setItem("orderList", JSON.stringify(this.itemList));
    },

    goOrder() {
      sessionStorage.setItem("orderList", JSON.stringify(this.itemList));
      const storedOrderList = sessionStorage.getItem("orderList");
      console.log(storedOrderList);
      if (storedOrderList) {
        const newOrderList = JSON.parse(storedOrderList);
        newOrderList.forEach((element) => {
          element.orderStatus = "オーダー済み";
        });
        const body = {
          order_list: newOrderList,
        };
        console.log(body);
        fetch("http://localhost:8080/new_order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            sessionStorage.removeItem("orderList");
            this.itemList = [];
            alert(data.message);
            location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
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
        :key="item.productId"
      >
        <div class="item_header item_body">
          <div class="item_detail">
            <img v-bind:src="item.productsId.productImg" alt="" />
            <div class="name">{{ item.productsId.productName }}</div>
          </div>

          <div class="price">
            <span>$</span>{{ item.totalPrice / item.quantity }}
          </div>
          <div class="count">
            <button @click="handleSub(item)">-</button>
            {{ item.quantity }}
            <button @click="handlePlus(item, index)">+</button>
          </div>
          <div class="amount">{{ item.totalPrice }}</div>
          <div class="operate">
            <button @click="handledelete(item, index)">刪除</button>
          </div>
        </div>
      </div>
      <button @click="goOrder" class="btn btn-warning">BUY</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
template {
  background-color: rgba(0, 0, 0, 0.2);
}
#app {
  height: 100vh;
  background: #c9ccd3;
  background-image: linear-gradient(
    -180deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  .btn {
    margin-top: 0.5rem;
    width: 5rem;
    border-radius: 30px;
  }
  background-blend-mode: lighten;
}

.item_header {
  display: flex;
  margin: 0 auto;
  height: 30px;
  background-color: #fff;
  border-radius: 3px;
  padding-left: 10px;
  background-color: #dcd9d4;
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    radial-gradient(
      at 50% 0%,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0.5) 50%
    );
  background-blend-mode: soft-light, screen;
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
