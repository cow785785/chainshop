<script>
import { RouterLink, RouterView } from "vue-router";

export default {
   components: {},
   props: ["title", "inventory", "price", "info", "code", "image", "index"],
   data() {
      return {
         show: true,
         // imgUrl: "../../public/img/",
         selectedQuantity: "1",
         orderList: [],
      };
   },
   methods: {
      saveQuantity() {
         // 按下按鈕把該商品的數量及名稱存進localStorage
         // localStorage.setItem()
      },
      changeShow() {
         this.$emit("switchCard");
      },
      putIntoCart(code, selectedQuantity) {
         const storedOrderList = sessionStorage.getItem("orderList");
         if (storedOrderList) {
            this.orderList = JSON.parse(storedOrderList);
         }
         const quantity = parseInt(selectedQuantity);
         const existingOrderIndex = this.orderList.findIndex(
            (order) => order.productsId.productCode === code
         );

         if (existingOrderIndex !== -1) {
            // 如果存在相同的 productCode 物件，將其 quantity 加總
            this.orderList[existingOrderIndex].infoQuantity += quantity;
            this.orderList[existingOrderIndex].infoTotal =
               this.price * this.orderList[existingOrderIndex].infoQuantity;
         } else {
            const totalPrice = this.price * quantity;
            const newOrder = {
               infoQuantity: quantity,
               infoTotal: totalPrice,
               productsId: {
                  productImg: this.image,
                  productName: this.title,
                  productCode: code,
               },
            };
            this.orderList.push(newOrder);
         }
         sessionStorage.setItem("orderList", JSON.stringify(this.orderList));
      },
   },
   mounted() {
      const storedOrderList = sessionStorage.getItem("orderList");
      if (storedOrderList) {
         this.orderList = JSON.parse(storedOrderList);
      }
   },
};
</script>

<template>
   <div class="card-area">
      <div class="product-card">
         <img class="img" v-bind:src="image" alt="" @click="changeShow" />

         <h5 class="title">{{ title }}</h5>
         <p class="info">{{ info }}</p>
         <p>${{ price }}</p>
         <div class="buy-area">
            <div class="count-area">
               <!-- 商品數量用select抓 可以用資料庫中的數量當作極限 -->
               <select name="inventory" v-model="selectedQuantity">
                  <option v-for="product in inventory">
                     {{ product }}
                  </option>
               </select>
            </div>
            <button
               class="cart btn btn-sm btn-primary"
               @click="putIntoCart(code, selectedQuantity)"
               type="button"
            >
               カートに入れる
            </button>
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.card-area {
   border: 1px solid;
   border-radius: 15px;
   width: 216px;
   height: 290px;
   display: flex;
   justify-content: center;
   margin: 0;

   .product-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;

      img {
         width: 100%;
         height: 50%;
         object-fit: cover;
         border-radius: 10px;
      }

      margin: 0.5rem;

      p,
      h5 {
         justify-content: center;
         margin: 0;
      }

      h5 {
         margin-top: 0.5rem;
      }
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

.cart {
   width: 80%;
   margin: 0.5rem;
   font-size: 10px;
}
</style>
