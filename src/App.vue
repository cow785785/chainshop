<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  data() {
    return {
    }
  },
  methods: {
    handleUnload(event) {
      event.preventDefault();
      event.returnValue = '';
      const confirmationMessage = "確定要登出嗎？";

      const storedOrderList = sessionStorage.getItem("orderList");
      const storedDbCartList = sessionStorage.getItem("dbCartList");

      const dbCartList = JSON.parse(storedDbCartList);
      const delBody = {
        order_list: dbCartList,
      };

      const newOrderList = JSON.parse(storedOrderList);
      if (newOrderList) {
        newOrderList.forEach(element => {
          element.orderStatus = "カート入り";
        });
      }
      const newBody = {
        order_list: newOrderList,
      };

      // 刪除舊資料的 fetch 請求
      const deleteRequest = fetch("http://localhost:8080/del_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(delBody),
      }).then(res => res.json());

      // 新增新資料的 fetch 請求
      const createRequest = deleteRequest.then(() => {
        return fetch("http://localhost:8080/new_order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newBody),
        }).then(res => res.json());
      });

      // 確保刪除和新增按照順序執行
      return Promise.all([deleteRequest, createRequest])
        .then(([deleteResponse, createResponse]) => {
          console.log(deleteResponse.message);
          console.log(createResponse.message);
          return confirmationMessage;
        })
        .catch(err => {
          console.log(err);
          return confirmationMessage;
        });
    },

  },
  created() {
    window.addEventListener('beforeunload', this.handleUnload);
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

