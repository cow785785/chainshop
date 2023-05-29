<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  data() {
    return {};
  },
  methods: {
    handleUnload() {
      const storedDbCartList = sessionStorage.getItem("dbCartList");
      const storedOrderList = sessionStorage.getItem("orderList");
      const storedOrderdetail = sessionStorage.getItem("orderdetail");
      const useraccount = localStorage.getItem("useraccount");
      const dbCartList = JSON.parse(storedDbCartList);
      const newOrderList = JSON.parse(storedOrderList);
      let orderdetail;
      if (storedOrderdetail) {
        //已有訂單資料就沿用
        orderdetail = JSON.parse(storedOrderdetail)[0];
      } else {
        //創建新的訂單
        orderdetail = {
          useraccount: useraccount,
          orderStatus: "カート入り",
          totalPrice: 0,
          quantity: 0,
          deliveryAddress: "カート",
        };
      }
      const noImgDbCartList = dbCartList
        ? dbCartList.map((info) => {
            //若dbCartList存在則清除圖片資料再fetch以避免執行時間過長
            const updatedProductsId = { ...info.productsId, productImg: null };
            return { ...info, productsId: updatedProductsId };
          })
        : []; //不存在則設為空陣列
      const noImgNewOrderList = newOrderList
        ? newOrderList.map((info) => {
            //若newOrderList存在則清除圖片資料再fetch以避免執行時間過長
            const updatedProductsId = { ...info.productsId, productImg: null };
            return { ...info, productsId: updatedProductsId };
          })
        : []; //不存在則設為空陣列
      console.log(dbCartList);
      console.log(noImgDbCartList);
      const body = {
        order_list: noImgDbCartList,
        new_list: noImgNewOrderList,
        orderdetails: orderdetail,
      };
      console.log(body);
      fetch("http://localhost:8080/change_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    },
    handleStorageChange() {
      if (sessionStorage.getItem("orderList")) {
        this.orderList = JSON.parse(sessionStorage.getItem("orderList"));
        this.itemCount = this.orderList.length;
      }
    },
  },
  created() {
    window.addEventListener("beforeunload", this.handleUnload);
    window.addEventListener("storage", this.handleStorageChange);
  },
  mounted() {
    sessionStorage.clear();
    const useraccount = localStorage.getItem("useraccount");
    const orderList = sessionStorage.getItem("orderList");
    //如果登入了 取得購物車資料
    if (useraccount && !orderList) {
      const body = {
        useraccount: useraccount,
        orderStatus: "カート入り",
      };
      fetch("http://localhost:8080/get_order_by_useraccount_and_order_status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.length > 0) {
            sessionStorage.setItem("orderdetail", JSON.stringify(data));
            console.log(data[0].orderNumber);
            fetch(
              "http://localhost:8080/get_orderdetail_info_by_order_number",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: data[0].orderNumber,
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                sessionStorage.setItem("orderList", JSON.stringify(data));
                sessionStorage.setItem("dbCartList", JSON.stringify(data));
              });
          }
        })
        .catch((err) => console.log(err));
    }
    if (orderList) {
      this.orderList = JSON.parse(orderList);
      this.itemCount = this.orderList.length;
    }
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.handleUnload);
  },
};
</script>

<template>
  <header></header>
  <RouterView />
</template>

<style lang="scss" scoped></style>
