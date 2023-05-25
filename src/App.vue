<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  data() {
    return {
    }
  },
  methods: {
    handleUnload() {
      const storedOrderList = sessionStorage.getItem("orderList");
      const storedDbCartList = sessionStorage.getItem("dbCartList");

      const dbCartList = JSON.parse(storedDbCartList);
      const newOrderList = JSON.parse(storedOrderList);
      const body = {
        order_list: dbCartList,
        new_list: newOrderList,
      };
      fetch("http://localhost:8080/change_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      }).catch(err => console.log(err));
    },
    handleStorageChange() {
      if (sessionStorage.getItem("orderList")) {
        this.orderList = JSON.parse(sessionStorage.getItem("orderList"));
        this.itemCount = this.orderList.length;
      }
    }
  },
  created() {
    window.addEventListener('beforeunload', this.handleUnload);
    window.addEventListener('storage', this.handleStorageChange);
  },
  mounted() {
    const useraccount = localStorage.getItem("useraccount");
    const orderList = sessionStorage.getItem("orderList");
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
            sessionStorage.setItem("orderList", JSON.stringify(data));
            sessionStorage.setItem("dbCartList", JSON.stringify(data));
          }
        })
        .catch(err => console.log(err))
    }
    if (orderList) {
      this.orderList = JSON.parse(orderList);
      this.itemCount = this.orderList.length;
    }


  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.handleUnload);
  },
};
</script>

<template>
  <header></header>
  <RouterView />
</template>

<style lang="scss" scoped></style>

