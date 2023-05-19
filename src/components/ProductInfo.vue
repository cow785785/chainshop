<script>
import { RouterLink, RouterView } from "vue-router";

export default {
   components: {},
   props: ["title", "quantity", "price", "info"],
   data() {
      return { show: true };
   },
   methods: {
      saveQuantity() {
         // 按下按鈕把該商品的數量及名稱存進localStorage
         // localStorage.setItem()
      },
      changeShow() {
         this.$emit("switchCard");
      },
   },
};
</script>

<template>
   <div class="card-area">
      <div class="product-card">
         <img
            class="img"
            src="../../public/img/hm1.jpg"
            alt=""
            @click="changeShow"
         />

         <h5 class="title">{{ title }}</h5>
         <p class="info">{{ info }}</p>
         <p>${{ price }}</p>
         <div class="buy-area">
            <div class="count-area">
               <!-- 商品數量用select抓 可以用資料庫中的數量當作極限 -->
               <select name="quantity" id="quantity">
                  <option v-for="product in quantity" value="product">
                     {{ product }}
                  </option>
               </select>
            </div>
            <button class="cart btn btn-sm btn-primary" type="button">
               カートに入れる
            </button>
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.card-area {
   border: 1px solid;
   width: 50vh;
   display: flex;
   justify-content: center;
   margin: 0;
   .product-card {
      margin: 0.5rem;
   }
   .buy-area {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
   }
   .count-area {
      display: flex;
      justify-content: center;
      input {
         text-align: center;
      }
      button {
         padding: 1px 2px;
      }
   }
}
.img {
   max-width: 100%;
}
.cart {
   width: 80%;
   margin: 0.5rem;
}
</style>
