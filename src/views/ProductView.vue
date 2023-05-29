<script>
export default {
   props: ["title", "inventory", "price", "describe", "code", "image"],
   data() {
      return {
         show: false,
         selectedQuantity: "1",
         // imgUrl: "../../public/img/",
         address: "",
         orderList: [],
      };
   },
   methods: {
      changeShow() {
         this.$emit("switch");
      },
      putIntoCart(code, selectedQuantity) {
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
   <div class="contain">
      <button class="back btn btn-secondary" @click="changeShow">
         Back to Menu
      </button>
      <div class="product">
         <img v-bind:src="image" alt="" />
         <div class="text-area">
            <h1>{{ title }}</h1>
            <p>{{ describe }}</p>
            <p>${{ price }}</p>
            <div class="count-area">
               <!-- 商品數量用select抓 可以用資料庫中的數量當作極限 -->
               <select name="inventory" v-model="selectedQuantity">
                  <option v-for="count in inventory">
                     {{ count }}
                  </option>
               </select>
               <button
                  @click="putIntoCart(code, selectedQuantity)"
                  class="cart btn btn-primary"
                  type="button"
               >
                  カートに入れる
               </button>
            </div>
         </div>
      </div>
      <!-- <div class="bg"></div> -->
   </div>
</template>

<style lang="scss" scoped>
.contain {
   height: 80vh;
   min-height: 650px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   flex-wrap: nowrap;
}

.product {
   width: 80vw;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 2rem;
   border-radius: 2rem;
   background-color: white;
}

.text-area {
   min-width: 200px;
   text-align: center;
   margin-left: 1rem;
}

img {
   width: 500px;
   height: 500px;
   min-width: 500px;
   object-fit: cover;
   border-radius: 16px;
}

.back {
   display: flex;
   justify-content: start;
   font-size: 24px;
   cursor: pointer;
}
</style>
