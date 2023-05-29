<script>
import { RouterLink, RouterView } from "vue-router";
export default {
   data() {
      return {
         productCode: null,
         productName: null,
         productPrice: null,
         productInventory: null,
         productCategory: null,
         productImg: "",
         productInfo: null,
         productDescribe: null,
         result: null,
      };
   },
   methods: {
      createProduct() {
         console.log(this.productImg);
         const reader = new FileReader();
         reader.readAsDataURL(this.productImg);
         reader.onload = (e) => {
            console.log(this.productCode);
            const product = {
               "product": {
                  "productCode": this.productCode,
                  "productName": this.productName,
                  "price": this.productPrice,
                  "inventory": this.productInventory,
                  "category": this.productCategory,
                  "productImg": e.target.result,
                  "productInfo": this.productInfo,
                  "productDescribe": this.productDescribe,
               },
            };
            console.log("ready to fetch");
            fetch("http://localhost:8080/create_product", {
               method: "POST",

               headers: {
                  "Content-Type": "Application/json",
               },

               body: JSON.stringify(product),
            })
               .then((res) => res.json())

               .then((data) => {
                  console.log(data);
                  this.result = data.message;
                  alert(this.result);
                  this.$router.push("/backProduct");
               });
         };
      },
      getImg(e) {
         console.log(e.target.files[0]);
         this.productImg = e.target.files[0];

         //reader.onload = function (e) {
         //    console.log(typeof e.target.result);
         //    img = e.target.result;
         //    console.log(img);
         //    this.a = this.productImg;
         // };
         // this.productImg = img;
         // console.log(this.productImg);
      },
   },
};
</script>

<template>
   <div class="container">
      <form action="">
         <!--商品代碼-->
         <div class="product-code">
            <label for="">商品代碼</label>
            <input type="text" v-model="productCode" />
         </div>

         <!--商品名稱-->
         <div class="product-name">
            <label for="">商品名稱</label>
            <input type="text" v-model="productName" />
         </div>

         <!--商品價錢-->
         <div class="product-price">
            <label for="">商品價錢</label>
            <input type="number" v-model="productPrice" />
         </div>

         <!--商品庫存-->
         <div class="product-inventory">
            <label for="">商品庫存</label>
            <input type="number" v-model="productInventory" />
         </div>

         <!--商品分類-->
         <div class="product-category">
            <label for="">商品分類</label>
            <input type="text" v-model="productCategory" />
         </div>

         <!--商品圖片-->
         <div class="product-image">
            <label for="">商品圖片</label>
            <input type="file" @change="getImg" />
         </div>

         <!--商品簡述-->
         <div class="product-info">
            <label for="">商品簡述</label>
            <input type="text" v-model="productInfo" />
         </div>

         <!--商品詳述-->
         <div class="product-describe">
            <label for="">商品詳述</label>
            <input type="text" v-model="productDescribe" />
         </div>
         <button type="button" @click="createProduct">送出</button>
         <!-- <RouterLink to="/backProduct"
            ><button type="button" @click="createProduct">
               送出
            </button></RouterLink
         > -->
      </form>
      <p>{{ result }}</p>
   </div>
</template>

<style lang="scss" scoped>
.container {
   width: 100vw;
   height: 100vh;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}
</style>
