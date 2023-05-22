<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  methods: {
    handleUnload() {//使用者關閉瀏覽器或離開網頁時執行，將購物車資料存入資料庫
      const storedOrderList = localStorage.getItem("orderList");
      localStorage.removeItem("orderList");
      if (storedOrderList) {
        const newOrderList = JSON.parse(storedOrderList)
        newOrderList.forEach(element => {
          element.orderStatus = "カート入り";
        });
        const body = {
          order_list: newOrderList,
        }
        console.log(body)
        fetch("http://localhost:8080/new_order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body),
        })
          .then(res => res.json())
          .then(data => {
            console.log(data.message)
          }).catch(err => console.log(err))
      }
    },

  },
  created() {
    window.addEventListener('beforeunload', this.handleUnload);
  },
  mounted() {
    const useraccount = localStorage.getItem("useraccount");
    const orderList = localStorage.getItem("orderList");
    //如果登入了 取得購物車資料
    if (useraccount && !orderList) {
      const body = {
        useraccount: useraccount,
        orderStatus: "カート入り"
      }
      fetch("http://localhost:8080/get_order_by_useraccount_and_order_status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.length > 0) {
            localStorage.setItem("orderList", JSON.stringify(data));
          }
        })
        .catch(err => console.log(err))
    }
  },
  beforeUnmounted() {
    window.removeEventListener('beforeunload', this.handleUnload);
  },
};
</script>

<template>
  <header></header>
  <RouterView />
</template>

<style lang="scss" scoped></style>
