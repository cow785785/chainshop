<!-- 搜尋分類或商品出現頁面 -->
<!-- header是否要增加輪播區域? -->
<script>
import { RouterLink, RouterView } from "vue-router";
export default {
   data() {
      return {
         keyword: null,
      };
   },
   methods: {
      storeKeyword() {
         sessionStorage.setItem("keyword", this.keyword);
      },
   },
};
</script>

<template>
   <div class="search-area">
      <input
         @change=""
         type="text"
         placeholder="請輸入搜尋關鍵字"
         v-model="keyword"
      />
      <button type="button">
         <RouterLink to="/searchProduct" @click="storeKeyword">查詢</RouterLink>
      </button>
   </div>
</template>

<style scoped></style>
