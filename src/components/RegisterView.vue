<script>
export default {
  data() {
    return {
      account: "",
      password: "",
      username: "",
      birthday: "",
      location: "",
      tel: "",
      isCheck: true,
    };
  },
  methods: {
    regis() {
      //   if (this.isCheck) {
      //     localStorage.setItem("account", this.account);
      //   } else {
      //     sessionStorage.setItem("account", this.account);
      //   }
      localStorage.setItem("account", this.account);
      this.$router.push("/loginView");
      alert("註冊成功");
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="bg-img"></div>
    <div class="text-area">
      <label for="account">帳號</label>
      <input type="text" placeholder="輸入帳號" v-model="account" />

      <label for="password">密碼</label>
      <input type="password" placeholder="輸入密碼" v-model="password" />

      <label for="password">確認密碼</label>
      <input type="password" placeholder="確認密碼" v-model="password" />

      <label for="username">會員名稱</label>
      <input type="text" placeholder="會員名稱" v-model="username" />

      <label for="birthday">出生日期</label>
      <input
        type="text"
        placeholder="輸入出生年月日ex:1995/03/01"
        v-model="birthday"
      />

      <label for="location">地址</label>
      <input type="text" placeholder="輸入地址" v-model="location" />

      <label for="tel">電話</label>
      <input
        type="text"
        placeholder="輸入電話ex:0912345678或886912345678"
        v-model="tel"
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
