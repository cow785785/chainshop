<script>
import HeaderView from "../components/HeaderView.vue";
export default {
  components: {
    HeaderView,
  },
  data() {
    return {
      account: "",
      password: "",
      password2: "",
      username: "",
      birthday: "",
      address: "",
      phone: "",
      email: "",
      showcaptcha: false,
      captcha: 0,
      responseData: {},
      isCheck: false,
    };
  },
  methods: {
    regis() {
      if (this.password !== this.password2) {
        alert("兩次輸入的密碼不一致");
        return;
      }
      const body = {
        useraccount: this.account,
        password: this.password,
        username: this.username,
        birthDate: this.birthday,
        address: this.address,
        phone: this.phone,
        email: this.email,
      };
      console.log(body);
      fetch("http://localhost:8080/addMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message != "註冊成功") {
            alert("輸入有誤，或是有空格沒填寫");
            return;
          }
          this.responseData = data; // 將返回的數據保存到responseData屬性中
          this.showcaptcha = true; // 顯示彈出視窗
          // alert(
          //   "會員註冊成功！\n" +
          //     "會員資料\n會員 帳號 :" +
          //     data.userAccount +
          //     "\n會員名稱：" +
          //     data.userName +
          //     "\n會員密碼:" +
          //     data.password +
          //     "\n會員生日：" +
          //     data.birthDate +
          //     "\n會員地址：" +
          //     data.address +
          //     "\n會員電話：" +
          //     data.phone +
          //     "\n會員點數 : " +
          //     data.point +
          //     "\n會員信箱 : " +
          //     data.email +
          //     "\n訊息 : " +
          //     data.message,
          //   this.$router.push("/loginView")
          // );
        })
        .catch((error) => {
          console.error(error);
          alert("註冊失敗" + "\n" + error.message);
        });

      localStorage.setItem("account", this.account);
      // this.$router.push("/loginView");
      // alert("註冊成功");
    },
    checkaccount() {
      if (!this.account) {
        alert("請輸入帳號");
        return;
      }

      const body = {
        useraccount: this.account,
      };
      fetch("http://localhost:8080/checkAccountExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === "帳號已存在") {
            alert("帳號已存在");
          } else {
            alert("帳號可用");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("檢查帳號時發生錯誤");
        });
    },
    checkcaptcha() {
      const body = {
        useraccount: this.account,
        captcha: parseInt(this.captcha),
      };
      fetch("http://localhost:8080/checkcaptcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message == "驗證成功") {
            console.log(message);
            this.isCheck = true; // 設置為成功
            alert("驗證成功");
          } else {
            // this.isCheck = false; // 设置为验证失败
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
<template>
  <div class="register">
    <HeaderView />
    <div class="container">
      <div class="bg-img"></div>
      <div class="text-area">
        <label for="account">帳號</label>
        <input type="text" placeholder="輸入帳號" v-model="account" />
        <input
          type="button"
          class="checkaccount"
          name="checkaccount"
          id="checkaccount"
          @click="checkaccount"
          value="檢查帳號是否重複"
        />

        <label for="password">密碼</label>
        <input
          type="password"
          placeholder="(至少要8位數和大寫字母)"
          v-model="password"
          :style="{ border: password.length < 8 ? '1px solid red' : '' }"
        />

        <label for="password">確認密碼</label>
        <input type="password" placeholder="確認密碼" v-model="password2" />

        <label for="username">會員名稱</label>
        <input type="text" placeholder="會員名稱" v-model="username" />

        <label for="birthday">生日</label>
        <input type="date" placeholder="ex:1995-03-01" v-model="birthday" />

        <label for="location">地址</label>
        <input type="text" placeholder="輸入地址(XX市XX路)" v-model="address" />

        <label for="tel">電話</label>
        <input
          type="text"
          placeholder="ex:09-12345678或886開頭"
          v-model="phone"
        />

        <label for="email">信箱</label>
        <input type="text" placeholder="@gmail" v-model="email" />
      </div>
      <div class="btn-area">
        <button @click="regis">註冊</button>
      </div>
    </div>
    <!-- 彈出視窗 -->
    <div class="popup" v-if="showcaptcha">
      <div class="popup-content">
        <div class="bg-img"></div>
        <form class="member-form">
          <tr>
            <p>會員註冊成功！</p>
          </tr>

          <tr>
            <p>會員資料：</p>
          </tr>
          <tr>
            <p>會員帳號：{{ responseData.userAccount }}</p>
          </tr>
          <tr>
            <p>會員名稱：{{ responseData.userName }}</p>
          </tr>
          <tr>
            <p>會員密碼：{{ responseData.password }}</p>
          </tr>
          <tr>
            <p>會員生日：{{ responseData.birthDate }}</p>
          </tr>
          <tr>
            <p>會員地址：{{ responseData.address }}</p>
          </tr>
          <tr>
            <p>會員電話：{{ responseData.phone }}</p>
          </tr>
          <tr>
            <p>會員點數：{{ responseData.point }}</p>
          </tr>
          <tr>
            <p>會員信箱：{{ responseData.email }}</p>
          </tr>
          <tr>
            <input
              type="text"
              placeholder="請輸入收到的驗證碼"
              v-model="captcha"
            />
            <button @click="checkcaptcha">驗證</button>
            <span v-if="isCheck" style="color: green; margin-left: 10px"
              >✓</span
            >
            <!-- <span v-else="isCheck" style="color: red; margin-left: 10px"
              >✕</span
            > -->
          </tr>
          <tr>
            <button>關閉</button>
          </tr>
        </form>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.register {
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  .popup {
    .member-form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: normal;
      background-color: aliceblue;
      position: fixed;
      top: 50%;
      left: 50%;
      height: 100%;
      width: 50vw;
      transform: translate(-50%, -50%);
      /* 其他样式属性 */
      border: 2px solid black;
      .tfoot {
        text-align: center;
      }
      tr {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      .myButton {
        box-shadow: inset 0px 39px 0px -24px #e67a73;
        background-color: #e4685d;
        border-radius: 4px;
        border: 1px solid #ffffff;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        font-family: Arial;
        font-size: 15px;
        padding: 6px 15px;
        text-decoration: none;
        text-shadow: 0px 1px 0px #b23e35;
        margin-left: 0.5rem;
      }
      .myButton:hover {
        background-color: #eb675e;
      }
      .myButton:active {
        position: relative;
        top: 1px;
      }
    }
  }
}
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .text-area {
    width: 300px;
    padding: 1rem;

    // border: 2px solid black;
    input {
      width: 250px;
      border-radius: 20px;
    }
    .checkaccount {
      background-color: burlywood;
      color: aliceblue;
    }
  }

  .keep {
    display: flex;
    width: 300px;
    justify-content: start;
    // border: 2px solid red;
    padding: 0.5rem;
  }

  .btn-area {
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
