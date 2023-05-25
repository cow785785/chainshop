<script>
import { RouterLink, RouterView } from "vue-router";
import SearchInput from "./SearchInput.vue";
import BackTopView from "../components/BackTopBtn.vue";
export default {
  components: { SearchInput, BackTopView },
  data() {
    return {
      useraccount: "",
      userName: "ログイン",
      // checklogin: false,
      isLoggedIn: false,
    };
  },
  methods: {
    checkout() {
      const storedOrderList = sessionStorage.getItem("orderList");
      const storedDbCartList = sessionStorage.getItem("dbCartList");
      if (!storedOrderList && !storedDbCartList) {
        // 清除本地存储的用戶相關訊息
        // 清空 localStorage
        localStorage.clear();
        // 清空 sessionStorage
        sessionStorage.clear();
        this.isLoggedIn = false; // 更新登陸狀態為未登入
        alert("已登出，謝謝光臨");
        this.$router.push("/");
        this.$router.afterEach(() => {
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
        return;
      }

      const dbCartList = JSON.parse(storedDbCartList);
      const newOrderList = JSON.parse(storedOrderList);

      const body = {
        order_list: dbCartList,
        new_list: newOrderList,
      };
      fetch("http://localhost:8080/change_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then(() => {
          // 清除本地存储的用戶相關訊息
          // 清空 localStorage
          localStorage.clear();
          // 清空 sessionStorage
          sessionStorage.clear();
          this.isLoggedIn = false; // 更新登陸狀態為未登入
          alert("已登出，謝謝光臨");
          this.$router.push("/");
          this.$router.afterEach(() => {
            setTimeout(() => {
              location.reload();
            }, 1000);
          });
        })
        .catch((err) => console.log(err));
    },
    checkLogin() {
      if (localStorage.getItem("useraccount")) {
        this.$router.push("/");
      }
    },
  },
  mounted() {
    if (localStorage.getItem("useraccount")) {
      this.useraccount = localStorage.getItem("useraccount");
      this.isLoggedIn = true; // 用戶存在則設為登錄狀態
    }
    if (localStorage.getItem("username")) {
      this.userName = localStorage.getItem("username");
    }
    // if (this.checklogin) {
    //   this.checklogin = false;
    //   location.reload();
    // }
  },
};
</script>
<template>
  <div class="header">
    <BackTopView />
    <!-- <div class="scroll-container" @scroll="handleScroll">
      <div class="image-container" :class="{ 'show-images': showImages }">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image"
          class="scroll-image"
          alt="Image"
        />
      </div>
    </div> -->
    <section class="logo">
      <RouterLink to="/" class="toplogo">
        <img src="../../public/R.png" alt="網頁LOGO" />
        <h1>地獄のキッチン</h1>
      </RouterLink>
    </section>
    <nav>
      <ul>
        <li>
          <div class="dropdown">
            <SearchInput class="search"></SearchInput>
          </div>
        </li>
        <li>
          <div class="dropdown">
            <RouterLink to="loginView" class="dropbtn" @click="checkLogin">
              <i class="fa-solid fa-user-group" style="color: #d40c48"></i>
              {{ userName }}
            </RouterLink>
            <div class="dropdown-content">
              <a href="#" v-if="isLoggedIn" @click="checkout">登出</a>
            </div>
          </div>
        </li>
        <li>
          <div class="dropdown">
            <RouterLink to="/member"><i class="fa-solid fa-crown" style="color: #f3d55d"></i>会員センター</RouterLink>
            <div class="dropdown-content">
              <RouterLink to="/order"><i class="fa-solid fa-clock-rotate-left"></i>お買い物履歴</RouterLink>
              
            </div>
          </div>
        </li>
        <li>
          <div class="dropdown">
            <RouterLink to="/"><i class="fa-solid fa-clock-rotate-left"></i>メニュー</RouterLink>
            <div class="dropdown-content">
            </div>
          </div>
        </li>
        <li>
          <RouterLink to="/shopCarView"><i class="fa-solid fa-cart-shopping" style="color: #c35113"></i>カート
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/question"><i class="fa-solid fa-circle-question"></i>問い合わせ</RouterLink>
        </li>
      </ul>
    </nav>
  </div>
  <!-- <ShopCarView /> -->
</template>
<style lang="scss" scoped>
.header {
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  white-space: nowrap;
  width: 100%;

  section.logo {
    display: flex;
    flex: 2 1 200px;
    align-items: center;

    .toplogo {
      display: flex;
      align-items: center;
      text-decoration: none;
    }

    h1 {
      font-size: 2.5rem;
    }

    img {
      width: 6vw;
      height: 6vw;
    }
  }

  nav {
    flex: 5 1 500px;

    .dropdown {
      position: relative;
      margin-right: 8px;
      z-index: 1;

      .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

        a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;

          &:hover {
            background-color: #f1f1f1;
          }
        }
      }

      &:hover .dropdown-content {
        display: block;
      }
    }

    ul {
      display: flex;
      list-style-type: none;
      justify-content: space-around;

      li {
        a {
          color: black;
          text-decoration: none;
          font-size: 1.35rem;
          transition: all 0.2 ease;
          padding-bottom: 0.3rem;

          &:hover {
            color: brown;
          }
        }
      }
    }
  }

  .scroll-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }

  .image-container {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .show-images .image-container {
    opacity: 1;
  }
}
</style>
