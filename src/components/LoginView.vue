<script>
export default {
  data() {
    return {
      account: "",
      password: "",
      isCheck: true,
    };
  },
  methods: {
    login() {
      if (
        this.account != localStorage.getItem("account") &&
        this.password != localStorage.getItem("password")
      ) {
        alert("帳號或密碼錯誤");
        return;
      } else {
        alert("登錄成功正在跳轉頁面");
        this.$router.push("/");
      }
      if (this.isCheck) {
        localStorage.setItem("account", this.account);
      } else {
        sessionStorage.setItem("account", this.account);
      }
    },
    singup() {
      this.$router.push("/registerView");
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="text-area">
      <label for="account" placeholder="輸入帳號">帳號</label>
      <input type="text" v-model="account" />
      <label for="password" placeholder="輸入密碼">密碼</label>
      <input type="password" v-model="password" />
    </div>
    <div class="keep">
      <label for="checkbox">記住帳號</label>
      <input type="checkbox" v-model="isCheck" />
    </div>
    <div class="btn-area">
      <button @click="login">登錄</button>
      <button @click="singup">註冊</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 78vh;
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
    justify-content: space-between;
  }
}
</style>
