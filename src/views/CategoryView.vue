<script>
import HeaderView from "../components/HeaderView.vue";
import ProductInfoView from "../components/ProductInfoView.vue";
import CartBtn from "../components/CartBtn.vue";

export default {
   components: {
      HeaderView,
      ProductInfoView,
      CartBtn,
   },
   data() {
      return {
         show: true,
         category: sessionStorage.getItem("category"),
      };
   },
};
</script>

<template>
   <HeaderView></HeaderView>
   <ProductInfoView :category="category"></ProductInfoView>
   <CartBtn></CartBtn>
</template>

<style></style>
