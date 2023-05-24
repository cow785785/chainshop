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
      isCheck: true,
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
        password2: this.password2,
        username: this.username,
        birthDate: this.birthday,
        address: this.address,
        phone: this.phone,
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
          alert(
            "會員註冊成功！\n" +
              "會員資料\n會員 帳號 :" +
              data.userAccount +
              "\n會員名稱：" +
              data.userName +
              "\n會員密碼:" +
              data.password +
              "\n會員生日：" +
              data.birthDate +
              "\n會員地址：" +
              data.address +
              "\n會員電話：" +
              data.phone +
              "\n訊息 : " +
              data.message,
            this.$router.push("/loginView")
          );
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
        <input type="password" placeholder="輸入密碼" v-model="password" />

        <label for="password">確認密碼</label>
        <input type="password" placeholder="確認密碼" v-model="password2" />

        <label for="username">會員名稱</label>
        <input type="text" placeholder="會員名稱" v-model="username" />

        <label for="birthday">生日</label>
        <input type="text" placeholder="ex:1995-03-01" v-model="birthday" />

        <label for="location">地址</label>
        <input type="text" placeholder="輸入地址" v-model="address" />

        <label for="tel">電話</label>
        <input
          type="text"
          placeholder="ex:09-12345678或886開頭"
          v-model="phone"
        />
      </div>
      <div class="keep">
        <label for="checkbox">記住帳號</label>
        <input type="checkbox" />
      </div>
      <div class="btn-area">
        <button @click="regis">註冊</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
