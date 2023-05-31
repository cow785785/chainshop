<script>
export default {
  props: ["isOpen", "orderList"],
  data() {
    return {
      isOrder: false,
    }
  },
  methods: {
    close() {
      this.$emit("closeConfirm")
    },
    goOrder() {
      sessionStorage.setItem("orderList", JSON.stringify(this.orderList));
      const storedOrderList = sessionStorage.getItem("orderList");
      const useraccount = localStorage.getItem("useraccount")
      console.log(storedOrderList);
      if (storedOrderList) {
        const newOrderList = JSON.parse(storedOrderList);
        const deliveryAddress = "尚未設定";

        const orderdetails = {
          useraccount: useraccount,
          quantity: newOrderList.length,
          totalPrice: newOrderList.reduce((sum, item) => sum + item.infoTotal, 0),
          orderStatus: "オーダー済み",
          deliveryAddress: deliveryAddress
        }

        const body = {
          order_list: newOrderList,
          orderdetails: orderdetails,
        };

        console.log(body);
        fetch("http://localhost:8080/new_order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.message == "新增成功") {
              sessionStorage.removeItem("orderList");
              this.itemList = [];
              fetch("http://localhost:8080/clear_cart", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: useraccount,
              }).then(() => {
                sessionStorage.removeItem("dbCartList");
                sessionStorage.removeItem("orderdetail");
                this.isOrder = true;
                setTimeout(() => {
                  this.$router.push("/");
                }, 3000)
              }).catch(err => console.log(err))
            }
          })
          .catch((err) => console.log(err));
      }
    },
  },
  mounted() {

  },
}
</script>
<template>
  <div class="buy-confirm-popup" :class="{ 'active': isOpen }">
    <div class="popup-container">
      <button class="close-btn" @click="close">✖</button>
      <div class="popup-title">
        <h3>オーダー確認</h3>
      </div>
      <div class="item-container" v-if="!isOrder">
        <div class="item-body" v-for="(item, index) in orderList" :key="item.productsId.productCode">
          <div class="info name">
            {{ item.productsId.productName }}
          </div>
          <div class="info price">
            単価：{{ item.infoTotal / item.infoQuantity }}<span>¥</span>
          </div>
          <div class="info count">
            個数：{{ item.infoQuantity }}
          </div>
          <div class="info amount">
            小計：{{ item.infoTotal }}¥
          </div>
        </div>
        <div class="item-footer">
          <p> 合計：{{ orderList.reduce((total, item) => total + item.infoTotal, 0) }}</p>
        </div>
      </div>
      <div class="complete" v-else>
        <h3>お買い上げありがとうございました!</h3>
      </div>
      <div class="popup-footer">
        <button class="btn btn-secondary cancel" @click="close">キャンセル</button>
        <button class="btn btn-primary order" @click="goOrder">オーダーする</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.buy-confirm-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 5;

  &.active {
    opacity: 1;
    visibility: visible;
  }

  .popup-container {
    background-color: whitesmoke;
    border-radius: 16px;
    position: relative;
    height: 428px;
    width: 512px;
    min-width: 512px;

    .close-btn {
      font-size: 24px;
      position: absolute;
      right: 12px;
      top: 12px;
      border: none;
      background: none;
    }

    .popup-title {
      height: 96px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: lightskyblue;
      border-top-right-radius: 16px;
      border-top-left-radius: 16px;
    }

    .complete,
    .item-container {
      margin: 16px;
      position: relative;
      height: 216px;

      .item-body {
        display: flex;

        .info {
          min-width: 120px;
        }

      }

      .item-footer {
        position: absolute;
        right: 12px;
        bottom: 0;
      }
    }

    .popup-footer {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    .btn {
      width: 128px;
    }

  }
}
</style>