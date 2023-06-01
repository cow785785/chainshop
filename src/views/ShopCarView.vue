<script>
import HeaderView from '../components/HeaderView.vue';
import BuyConfirmPopup from '../components/BuyConfirmPopup.vue';
export default {
  components: {
    HeaderView, BuyConfirmPopup,
  },
  data() {
    return {
      itemList: [],
      showConfirm: false,
      zipcode: "",
      selectedAddress: "",
      selectedCity: "",
      inputStreet: "",
      addressList: [],
      cityList: [],
      deliveryAddress: "",
    };
  },
  methods: {
    handlePlus: function (item) {
      const newQuantity = item.infoQuantity + 1;
      const oldPrice = item.infoTotal / item.infoQuantity;
      item.infoQuantity = newQuantity;
      item.infoTotal = oldPrice * newQuantity;
      sessionStorage.setItem("orderList", JSON.stringify(this.itemList));
    },
    handleSub: function (item, index) {
      if (item.infoQuantity > 1) {
        const newQuantity = item.infoQuantity - 1;
        const oldPrice = item.infoTotal / item.infoQuantity;
        item.infoQuantity = newQuantity;
        item.infoTotal = oldPrice * newQuantity;
        sessionStorage.setItem("orderList", JSON.stringify(this.itemList));
      }
    },
    handledelete(item, index) {
      this.itemList.splice(index, 1);
      sessionStorage.setItem("orderList", JSON.stringify(this.itemList));
    },
    closeConfirm() {
      this.showConfirm = false;
    },
    goConfirm() {
      if (this.selectedAddress && this.selectedCity && this.inputStreet) {
        this.deliveryAddress = this.zipcode + this.selectedAddress.name + this.selectedCity.name + this.inputStreet
        this.showConfirm = true;
      }
      else {
        alert("住所を入力してください。")
      }
    },
    getcity(address) {//取得該縣市所有的區
      fetch(address.zipcodes_endpoint)
        .then(res => res.json()
          .then(data => {
            this.cityList = data;
          })
        )
    },
    setZipcode(selectedCity) {
      console.log(selectedCity);
      this.zipcode = selectedCity.zipcode;
    }
  },
  mounted() {
    const storedOrderList = sessionStorage.getItem("orderList");
    if (storedOrderList) {
      this.itemList = JSON.parse(storedOrderList);
    }

    fetch("https://demeter.5fpro.com/tw/zipcode/cities.json")//取得台灣縣市
      .then(res => res.json())
      .then(data => {
        this.addressList = data;
      })

  },
  //離開頁面的監測
};
</script>
<template>
  <div id="app">
    <HeaderView></HeaderView>
    <div class="container">
      <div class="item_header">
        <div class="item_detail">商品</div>
        <div class="price">單價</div>
        <div class="count">數量</div>
        <div class="amount">總計</div>
        <div class="operate">操作</div>
      </div>
      <div class="shopcar-body">
        <div class="item_container" v-for="(item, index) in itemList" :key="item.productsId.productCode">
          <div class="item_header item_body">
            <div class="item_detail">
              <img v-bind:src="item.productsId.productImg" alt="" />
              <div class="name">{{ item.productsId.productName }}</div>
            </div>

            <div class="price">
              <span>$</span>{{ item.infoTotal / item.infoQuantity }}
            </div>
            <div class="count">
              <button @click="handleSub(item)">-</button>
              {{ item.infoQuantity }}
              <button @click="handlePlus(item, index)">+</button>
            </div>
            <div class="amount">{{ item.infoTotal }}</div>
            <div class="operate">
              <button @click="handledelete(item, index)">刪除</button>
            </div>
          </div>

        </div>
      </div>
      <div class="footer">
        <div class="address-area">
          お届け先：
          <input type="text" class="zip-code" placeholder="〒" disabled="true" v-model="zipcode">
          <select name="adderss" id="" v-model="selectedAddress" @change="getcity(selectedAddress)"
            v-if="addressList.length > 0">
            <option value="" disabled selected>請選擇縣市</option>
            <option :value="address" v-for="address in addressList">{{ address.name }}</option>
          </select>
          <select name="city" id="" v-model="selectedCity" @change="setZipcode(selectedCity)" v-if="cityList.length > 0">
            <option value="" disabled selected>請選擇鄉鎮區</option>
            <option :value="city" v-for="city in cityList">{{ city.name }}</option>
          </select>
          <input type="text" class="street" placeholder="XX路XX號" v-if="selectedCity" v-model="inputStreet">
        </div>
        <button @click="goConfirm" class="btn btn-warning">BUY</button>
      </div>
    </div>


    <transition name="fade">
      <BuyConfirmPopup @closeConfirm="closeConfirm" v-show="showConfirm" :isOpen="showConfirm" :orderList="itemList"
        :deliveryAddress="deliveryAddress">
      </BuyConfirmPopup>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
template {
  background-color: rgba(0, 0, 0, 0.2);
}

#app {
  height: 100vh;
  background: #c9ccd3;
  background-blend-mode: lighten;
  background-image: linear-gradient(-180deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(0, 0, 0, 0.5) 100%);

  .btn {
    margin-top: 0.5rem;
    width: 5rem;
    border-radius: 30px;
  }

  .container {
    width: 926px;

    .item_header {
      width: 100%;
    }

    .shopcar-body {

      width: 100%;
      height: 70vh;
      overflow-y: auto;
    }

    .footer {
      width: 100%;
      padding: 20px;
      display: flex;
      position: relative;
      align-items: center;
      background-color: honeydew;

      .address-area {
        .zip-code {
          width: 48px;
        }
      }

      .btn {
        position: absolute;
        margin: 0;
        right: 12px;
      }
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }


    .fade-enter,
    .fade-leave-to {
      opacity: 0;
      visibility: hidden;
    }


  }

}

.item_header {
  display: flex;
  margin: 0 auto;
  height: 30px;
  background-color: #fff;
  border-radius: 3px;
  padding-left: 10px;
  background-color: #dcd9d4;
  background-image: linear-gradient(to bottom,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(0, 0, 0, 0.5) 100%),
    radial-gradient(at 50% 0%,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0.5) 50%);
  background-blend-mode: soft-light, screen;
}

.item_header div {
  width: 300px;
  color: #888;
  line-height: 30px;
}

.item_header .item_detail {
  width: 50%;
}

.item_body {
  margin-top: 20px;
  height: 100px;
  align-items: center;
}

.item_detail img {
  width: 80px;
  height: 80px;
  border-radius: 3px;
  object-fit: cover;
  /* margin-top: 10px; */
  float: left;
}

.item_detail .name {
  margin-left: 100px;
  margin-top: 20px;
}
</style>
