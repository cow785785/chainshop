<script>
import ProductInfoView from "../components/ProductInfo.vue";
import ProductView from "../views/ProductView.vue";
import HeaderView from "../components/HeaderView.vue";

export default {
   components: {
      ProductInfoView,
      ProductView,
      HeaderView,
   },
   props: ["category"],
   data() {
      return {
         quantity: 10,
         productList: null,
         card: true,
         info: false,
         index: null,
         searchName: localStorage.getItem("keyword"),
      };
   },
   methods: {
      getCategortProduct() {
         console.log;
         console.log(this.category);
         let reqCategory = { searchName: localStorage.getItem("keyword") };
         console.log(reqCategory);
         fetch("http://localhost:8080/find_product_by_name_or_category", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(reqCategory),
         })
            .then(function (res) {
               return res.json();
            })

            .then((data) => {
               console.log(data);
               this.productList = data.list;

               console.log(this.productList);
            });
      },
      showProduct(a) {
         this.card = !this.card;
         this.info = !this.info;
         this.index = a;
      },
      closeProduct() {
         this.card = !this.card;
         this.info = !this.info;
         this.index = null;
      },
   },
   mounted() {
      this.getCategortProduct();
   },
};
</script>

<template>
   <HeaderView />
   <div class="contain">
      <div class="row">
         <!-- foreach商品卡片 -->
         <div
            v-for="(product, index) in productList"
            v-show="card"
            class="product-area"
         >
            <ProductInfoView
               :title="product.productName"
               :inventory="product.inventory"
               :price="product.price"
               :info="product.productInfo"
               :image="product.productImg"
               :code="product.productCode"
               @switchCard="showProduct(index)"
               class="product-card"
            ></ProductInfoView>
         </div>
      </div>
      <!-- 點擊卡片時出現單項商品資訊 -->

      <div v-if="info" class="product">
         <ProductView
            :title="productList[index].productName"
            :inventory="productList[index].inventory"
            :price="productList[index].price"
            :describe="productList[index].productDescribe"
            :image="productList[index].productImg"
            :code="productList[index].productCode"
            @switch="closeProduct"
         />
      </div>
   </div>
</template>

<style lang="scss" scoped>
.contain {
   width: 100%;
}
.row {
   display: flex;
   margin-top: 0.5rem;
}
.product-card {
   margin: 1rem;
}
.product-area {
   width: 25%;
   margin: 0;
   display: flex;
   justify-content: center;
}
</style>
