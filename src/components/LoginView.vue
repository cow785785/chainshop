<script>
export default {
  props: [],
  data() {
    return {
      useraccount: "",
      password: "",

      // loggedInUser: "ログイン", // 新增變數
      isCheck: true,
    };
  },
  methods: {
    login() {
      // 發送登錄請求到後端 API
      fetch("http://localhost:8080/loginMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useraccount: this.useraccount,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "登錄成功") {
            // 使用Vuex的commit方法更新loggedInUser狀態
            // this.$store.commit("setLoggedInUser", data.userName);
            localStorage.setItem("useraccount", this.useraccount);
            localStorage.setItem("password", this.password);
            localStorage.setItem("username", data.userName);
            console.log(data);
            console.log(data.userName);
            alert("登錄成功，正在跳轉頁面");

            this.$router.push("/");
            // setTimeout(location.reload(), 2000);
            setTimeout(() => {
              location.reload();
            }, 2000);
            // location.reload();
          } else {
            alert("帳號或密碼錯誤");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("登錄失敗");
        });
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
      <input type="text" v-model="useraccount" />
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
      padding: 10px;
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
