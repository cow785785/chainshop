<script>
import HeaderView from "../components/HeaderView.vue";
import ProductInfoView from "../components/ProductInfoView.vue";

export default {
   components: {
      HeaderView,
      ProductInfoView,
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
</template>

<style></style>
