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
      putIntoCart(code, selectedQuantity, index) {
         const useraccount = localStorage.getItem("useraccount");
         const productCode = code;
         const quantity = parseInt(selectedQuantity);
         //若沒有地址則透過API去取得
         if (!this.address) {
            fetch("http://localhost:8080/selectMember", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  useraccount: useraccount,
               }),
            })
               .then((res) => res.json())
               .then((data) => {
                  this.address = data.address;
                  this.addToCartWithAddress(
                     this.address,
                     productCode,
                     quantity,
                     index
                  );
               })
               .catch((err) => {
                  console.log(err);
                  // 處理錯誤，例如顯示錯誤訊息或使用預設值
                  this.addToCartWithAddress(
                     "Default Address",
                     productCode,
                     quantity,
                     index
                  );
               });
         } else {
            this.addToCartWithAddress(
               this.address,
               productCode,
               quantity,
               index
            );
         }
      },
      addToCartWithAddress(address, productCode, quantity, index) {
         const storedOrderList = sessionStorage.getItem("orderList");
         // 检查是否有存储的订单列表数据
         if (storedOrderList) {
            this.orderList = JSON.parse(storedOrderList);

            const existingOrderIndex = this.orderList.findIndex(
               (order) => order.productCode === productCode
            );

            // 如果存在相同的 productCode 物件，将其数量加总
            if (existingOrderIndex !== -1) {
               this.orderList[existingOrderIndex].quantity += quantity;
               this.orderList[existingOrderIndex].totalPrice =
                  this.price * this.orderList[existingOrderIndex].quantity;
               sessionStorage.setItem(
                  "orderList",
                  JSON.stringify(this.orderList)
               );
               alert("已成功加入至購物車");
               return; // 提前返回，结束函数执行
            }
         }

         // 如果不存在相同的 productCode 物件，或者没有存储的订单列表数据，则创建一个新的订单对象
         const totalPrice = this.price * quantity;
         const newOrder = {
            useraccount: localStorage.getItem("useraccount"),
            productCode: productCode,
            quantity: quantity,
            totalPrice: totalPrice,
            deliveryAddress: address,
            productsId: {
               productImg: this.image,
               productName: this.title,
            },
         };
         this.orderList.push(newOrder);
         sessionStorage.setItem("orderList", JSON.stringify(this.orderList));
         alert("已成功加入至購物車");
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
               @click="putIntoCart(code, selectedQuantity, index)"
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
