<script>
import MemberSide from "../components/MemberSide.vue";
import HeaderView from "../components/HeaderView.vue";
import Orderdetail from "../components/OrderdetailInfo.vue";
export default {
  components: {
    MemberSide,
    HeaderView,
    Orderdetail,
  },
  data() {
    return {
      orderList: [],
      useraccount: "useraccount",
      userName: "userName",
      userBirth: "userBirth",
      userPoint: "userPoint",
      userPhone: "userPhone",
      userAddress: "userAddress",
      userPassword: "",
      phoneChange: true,
      addressChange: true,
      pwdChange: true,
      haveChange: false,
      pwd: "",
    };
  },
  methods: {
    changePhone() {
      this.phoneChange = false;
    },
    changeAddr() {
      this.addressChange = false;
    },
    changePwd() {
      this.pwdChange = false;
    },
    someChange() {
      this.haveChange = true;
    },
    update() {
      const inputPwd = prompt("パスワード再確認");
      if (!inputPwd) {
        return;
      }
      if (inputPwd != localStorage.getItem("password")) {
        alert("パスワードが間違っています。");
        location.reload();
        return;
      }

      const body = {
        useraccount: this.useraccount,
        username: this.userName,
        birthDate: this.userBirth,
        phone: this.userPhone,
        address: this.userAddress,
        password: inputPwd,
      };
      fetch("http://localhost:8080/updateMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert(data.message);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOrder() {
      const useraccount = localStorage.getItem("useraccount");
      const limit = 3;
      const body = {
        useraccount: useraccount,
        limit: limit,
      };
      fetch("http://localhost:8080/get_orderdetails_by_useraccount_limit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(this.body);
          console.log(data);
          this.orderList = data;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    if (localStorage.getItem("useraccount")) {
      this.account = localStorage.getItem("useraccount");

      const body = {
        useraccount: this.account,
      };
      fetch("http://localhost:8080/selectMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          this.useraccount = data.userAccount;
          this.userName = data.userName;
          this.userBirth = data.birthDate.substring(0, 10);
          this.userPoint = "userPoint尚未導入";
          this.userPhone = data.phone;
          this.userAddress = data.address;
          this.userPassword = Math.random();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("ログインしてください。");
      this.$router.push("/loginView");
    }
  },
};
</script>
<template>
  <div class="member">
    <HeaderView />
    <div class="member-contain">
      <MemberSide
        :useraccount="useraccount"
        :userPoint="userPoint"
        class="side"
      />
      <div class="member-detail">
        <div class="member-account">
          <h4>{{ useraccount }}</h4>

          <h3>{{ userName }}，こんにちは！</h3>
          <div class="form-floating input-area birth">
            <input
              type="password"
              class="form-control input birth"
              id="pwd"
              v-model="userPassword"
              :disabled="pwdChange"
            />
            <label for="pwd">パスワード：</label>
            <i
              class="icon fa-solid fa-pen"
              @click="changePwd"
              v-if="pwdChange"
            ></i>
          </div>
          <div class="form-floating input-area birth">
            <input
              type="text"
              class="form-control input birth"
              id="birth"
              v-model="userBirth"
              disabled="true"
            />
            <label for="birth">誕生日：</label>
          </div>
          <div class="form-floating input-area point">
            <input
              type="text"
              class="form-control input point"
              id="point"
              v-model="userPoint"
              disabled="true"
            />
            <label for="point">ポイント：</label>
          </div>
          <div class="form-floating input-area phone">
            <input
              type="tel"
              class="form-control input phone"
              id="phone"
              pattern="[0-9]{2}-[0-9]{8}"
              required
              v-model="userPhone"
              :disabled="phoneChange"
              @input="someChange"
            />
            <label for="phone">電話番号：</label>
            <i
              class="icon fa-solid fa-pen"
              @click="changePhone"
              v-if="phoneChange"
            ></i>
          </div>
          <div class="form-floating input-area address">
            <input
              type="text"
              class="form-control input address"
              id="address"
              v-model="userAddress"
              :disabled="addressChange"
              @input="someChange"
            />
            <i
              class="icon fa-solid fa-pen"
              @click="changeAddr"
              v-if="addressChange"
            ></i>
            <label for="address">アドレス：</label>
          </div>
          <button
            type="button"
            class="btn btn-primary update-btn"
            v-show="haveChange"
            @click="update"
          >
            変更を保存
          </button>
        </div>
        <div class="member-order">
          <div class="title">
            <RouterLink to="/order">オーダー管理 >></RouterLink>
            <button type="button" class="btn get" @click="getOrder">
              最近の履歴を表示する
            </button>
          </div>
          <div class="orderdetails">
            <Orderdetail
              v-for="(orderdetail, index) in orderList"
              :orderdetail="orderdetail"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.member {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .member-contain {
    display: flex;
    flex: 1;
    min-width: min-content;
  }

  .member-detail {
    flex: 1;

    overflow-y: auto;

    .member-account {
      margin: 24px;
      padding: 24px;
      border: 1px solid gray;
      border-radius: 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

      .input-area {
        position: relative;
        margin: 16px;
        min-width: 300px;

        .icon {
          position: absolute;
          right: 2%;
          top: 33%;
          z-index: 2;

          &:hover {
            border: 1px black dotted;
          }
        }
      }
    }

    .member-order {
      margin: 24px;
      padding: 24px;
      border: 1px solid gray;
      border-radius: 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

      .title {
        display: flex;
        align-items: center;
        position: relative;

        .btn {
          position: absolute;
          color: gray;
          font-size: 12px;
          right: 0;
        }
      }
    }
  }
}
</style>
