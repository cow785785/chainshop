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
      // loggedInUser: "ログイン", // 新增變數
      forgotPassword: false, // 新增變數
      isCheck: true,
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
    forgotPasswordClicked() {
      const confirmModify = confirm("是否要修改密碼？");

      if (confirmModify) {
        const username = prompt("請輸入帳號");

        if (username) {
          const newPassword = prompt("請輸入新密碼");
          if (newPassword) {
            // 發送修改密碼的請求到後端 API
            fetch("http://localhost:8080/updateMember", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                useraccount: username,
                password: newPassword,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.message === "更新成功") {
                  alert("密碼修改成功");
                } else {
                  alert("密碼修改失敗");
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
      } else {
        // 處理不修改密碼的情況
        this.forgotPassword = true; // 如果不修改密碼，可以在這裡執行其他相關邏輯
      }
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
        <button @click="login">登錄</button>
        <button @click="singup">註冊</button>
      </div>
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
