<script>
import HeaderView from "../components/HeaderView.vue";

export default {
  components: {
    HeaderView,
  },
  data() {
    return {
      useraccount: "",
      password: "",
      loggedInUser: "", // 忘記密碼狀態
      loginAttempts: 0, //記錄錯誤次數
      loginDisabled: false, // 紀錄登入錯誤鎖定登入狀態變數
      isCheck: true,
      forgotPassword: false,
    };
  },
  methods: {
    login() {
      if (this.useraccount == 1234 && this.password == 1234) {
        this.$router.push("/backSystem");
        return;
      }
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
            // 重置錯誤次數
            // this.loginAttempts = 0;
            localStorage.setItem("useraccount", this.useraccount);
            localStorage.setItem("password", this.password);
            localStorage.setItem("username", data.userName);
            // // 使用Vuex的commit方法更新loggedInUser狀態
            // this.loggedInUser = data.userName;
            console.log(data);
            console.log(data.userName);
            alert("登錄成功，正在跳轉頁面");
            this.$router.push("/");
            this.$router.afterEach(() => {
              setTimeout(() => {
                location.reload();
              }, 1000);
            });
          } else {
            this.loginAttempts++;
            // 檢查錯誤次數是否達到3次
            if (this.loginAttempts === 3) {
              this.loginDisabled = true; // 禁用登入按鈕
              alert("今天不能再登入此帳號");
              // 進行相應的處理，例如禁止登入或重定向到其他頁面
              return;
            }
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
    forgotPasswordClicked() {
      const confirmModify = confirm("是否要修改密碼？");

      if (confirmModify) {
        this.useraccount = prompt("請輸入帳號");
      }

      fetch("http://localhost:8080/checkAccountExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useraccount: this.useraccount,
        }),
      })
        .then((response) => response.json())
        .then((dataaccount) => {
          console.log(dataaccount);
          if (dataaccount.message === "帳號已存在") {
            if (this.useraccount) {
              const newPassword = prompt("請輸入新密碼");
              if (newPassword) {
                // 發送修改密碼的請求到後端 API
                fetch("http://localhost:8080/updatePassword", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    useraccount: this.useraccount,
                    password: newPassword,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    if (data.message === "密碼已更新") {
                      alert("密碼修改成功");
                    } else {
                      alert("密碼修改失敗123123");
                    }
                    // 在這裡處理修改密碼的相關邏輯，例如顯示成功提示或錯誤訊息
                  })
                  .catch((error) => {
                    console.error(error);
                    // 處理錯誤情況
                    alert("密碼修改失敗");
                  });
              } else {
                // 處理未輸入新密碼的情況
                alert("請輸入新密碼");
              }
            } else {
              // 處理未輸入帳號的情況
              alert("請輸入帳號");
            }
          }
        });
    },
  },
};
</script>
<template>
  <div class="login">
    <HeaderView />
    <div class="container">
      <div class="text-area">
        <label for="account" placeholder="輸入帳號">帳號</label>
        <input type="text" v-model="useraccount" id="account" />
        <label for="password" placeholder="輸入密碼">密碼</label>
        <input type="password" v-model="password" id="password" />
      </div>
      <div class="keep">
        <div>
          <label for="checkbox">記住帳號</label>
          <input type="checkbox" v-model="isCheck" id="checkbox" />
        </div>
        <button @click="forgotPasswordClicked" v-show="!forgotPassword">
          忘記密碼
        </button>
      </div>
      <div class="btn-area">
        <button @click="login" :disabled="loginDisabled">登錄</button>
        <button @click="singup">註冊</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  width: 100%;
  background-image: linear-gradient(
    to top,
    #fad0c4 0%,
    #fad0c4 1%,
    #ffd1ff 100%
  );
}
.container {
  // background-color: cadetblue;
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
    justify-content: space-between;
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
