<script>
export default {
   props: ["title", "quantity", "price", "describe", "image"],
   data() {
      return {
         show: false,
      };
   },
   methods: {
      changeShow() {
         this.$emit("switch");
      },
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
            <p>
               {{ describe }}
            </p>
            <p>${{ price }}</p>
            <div class="count-area">
               <!-- 商品數量用select抓 可以用資料庫中的數量當作極限 -->
               <select name="quantity" id="quantity">
                  <option v-for="product in quantity" value="product">
                     {{ product }}
                  </option>
               </select>
               <button
                  @click="changeShow"
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
