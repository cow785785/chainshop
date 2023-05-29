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
         if (window.location.href === "http://localhost:5173/searchProduct") {
            sessionStorage.setItem("keyword", this.keyword);
            window.location.reload();
         }
         sessionStorage.setItem("keyword", this.keyword);
         console.log(sessionStorage.getItem("keyword"));
         console.log(window.location.href);
      },
   },
};
</script>

<template>
   <div class="search-area">
      <input
         @change="storeKeyword"
         type="text"
         placeholder="何食べようか！"
         v-model="keyword"
      />
      <button type="button">
         <RouterLink
            to="/searchProduct"
            @click="storeKeyword"
            :category="keyword"
            >検索</RouterLink
         >
      </button>
   </div>
</template>

<style scoped></style>
