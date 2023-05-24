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
      },
      handleSub: function (item, index) {
         if (item.quantity > 1) {
            const newQuantity = item.quantity - 1;
            const oldPrice = item.totalPrice / item.quantity;
            item.quantity = newQuantity;
            item.totalPrice = oldPrice * newQuantity;
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
      handleUnload() {
         //離開頁面時，保存數量變更
         sessionStorage.setItem("orderList", JSON.stringify(this.itemList));
      },
   },
   mounted() {
      const storedOrderList = sessionStorage.getItem("orderList");
      if (storedOrderList) {
         this.itemList = JSON.parse(storedOrderList);
      }
   },
   beforeRouteLeave(to, from, next) {
      if (from.path === "/shopCarView") {
         this.handleUnload();
      }
      next();
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
            :key="item.productId"
         >
            <div class="item_header item_body">
               <div class="item_detail">
                  <img v-bind:src="item.imgUrl" alt="" />
                  <div class="name">{{ item.productName }}</div>
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
         <button @click="goOrder">BUY</button>
         <button @click="getData">TEST</button>
      </div>
   </div>
</template>
<style lang="scss" scoped>
template {
   background-color: rgba(0, 0, 0, 0.2);
}
.container {
   width: 100%;
   margin: 0;
}
.item_header {
   display: flex;
   // 預設寬度
   width: 100vw;
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
