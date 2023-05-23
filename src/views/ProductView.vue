<script>
export default {
   props: ["title", "inventory", "price", "describe", "code", "image"],
   data() {
      return {
         show: false,
         selectedQuantity: "1",
         imgUrl: "../../public/img/hm1.jpg",
         orderList: [],
      };
   },
   methods: {
      changeShow() {
         this.$emit("switch");
      },
      putIntoCart(code, selectedQuantity) {
         const useraccount = localStorage.getItem("useraccount");
         const productCode = code;
         const quantity = parseInt(selectedQuantity);

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
               console.log(data);
               // 檢查是否存在相同的productCode物件
               const existingOrderIndex = this.orderList.findIndex(
                  (order) => order.productCode === productCode
               );

               console.log(quantity);
               console.log(this.price);
               if (existingOrderIndex !== -1) {
                  // 如果存在相同的 productCode 物件，將其 quantity 加總
                  this.orderList[existingOrderIndex].quantity += quantity;
                  this.orderList[existingOrderIndex].totalPrice =
                     this.price * this.orderList[existingOrderIndex].quantity;
               } else {
                  const totalPrice = this.price * quantity;
                  const newOrder = {
                     useraccount: localStorage.getItem("useraccount"),
                     productCode: productCode,
                     quantity: quantity,
                     totalPrice: totalPrice,
                     deliveryAddress: data.address,
                     imgUrl: this.imgUrl,
                  };
                  this.orderList.push(newOrder);
               }
               sessionStorage.setItem(
                  "orderList",
                  JSON.stringify(this.orderList)
               );
            });
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
      <h2 class="back" @click="changeShow">Back to Menu</h2>
      <div class="product">
         <img v-bind:src="image" alt="" />
         <div class="text-area">
            <h1>{{ title }}</h1>
            <p>{{ describe }}</p>
            <p>${{ price }}</p>
            <div class="count-area">
               <!-- 商品數量用select抓 可以用資料庫中的數量當作極限 -->
               <select
                  name="inventory"
                  id="inventory"
                  v-model="selectedQuantity"
               >
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
   height: 100vh;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
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
   text-align: center;
   margin-left: 1rem;
}

img {
   max-width: 55%;
   object-fit: contain;
}

.back {
   width: 100%;
   justify-content: start;
   cursor: pointer;
}
</style>
