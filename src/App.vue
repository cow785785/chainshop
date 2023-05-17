<script>
import { RouterLink, RouterView } from "vue-router";
import HeaderView from "./components/HeaderView.vue";
export default {
  data() {
    return {
      useraccount: "",
      userName: "ログイン",
      checklogin: false,
    };
  },
  components: {
    HeaderView,
  },
  methods: {},
  mounted() {
    if (localStorage.getItem("useraccount")) {
      this.useraccount = localStorage.getItem("useraccount");
    }
    if (localStorage.getItem("username")) {
      this.userName = localStorage.getItem("useraccount");
    }
    // if (this.checklogin) {
    //   this.checklogin = false;
    //   location.reload();
    // }
  },
};
</script>

<template>
  <header>
    <section class="logo">
      <RouterLink to="/" class="toplogo" v:on:click="login">
        <img src="../../public/R.png" alt="網頁LOGO" />
        <h1>商店名稱</h1>
      </RouterLink>
    </section>

    <nav>
      <ul>
        <li>
          <div class="dropdown">
            <RouterLink to="loginView" class="dropbtn">
              <i class="fa-solid fa-user-group" style="color: #d40c48"></i>
              {{ userName }}
            </RouterLink>
            <div class="dropdown-content">
              <a href="#">選項 1</a>
              <a href="#">選項 2</a>
              <a href="#">選項 3</a>
            </div>
          </div>
        </li>
        <li>
          <div class="dropdown">
            <RouterLink to=""
              ><i class="fa-solid fa-crown" style="color: #f3d55d"></i
              >会員センター</RouterLink
            >
            <div class="dropdown-content">
              <a href="#">選項 1</a>
              <a href="#">選項 2</a>
              <a href="#">選項 3</a>
            </div>
          </div>
        </li>
        <li>
          <div class="dropdown">
            <RouterLink to=""
              ><i class="fa-solid fa-clock-rotate-left"></i
              >お買い物履歴</RouterLink
            >
            <div class="dropdown-content">
              <a href="#">選項 1</a>
              <a href="#">選項 2</a>
              <a href="#">選項 3</a>
            </div>
          </div>
        </li>
        <li>
          <RouterLink to="/shopCarView"
            ><i class="fa-solid fa-cart-shopping" style="color: #c35113"></i
            >購物車</RouterLink
          >
        </li>
        <li>
          <RouterLink to=""
            ><i class="fa-solid fa-circle-question"></i>問い合わせ</RouterLink
          >
        </li>
      </ul>
    </nav>
  </header>
  <RouterView />
</template>

<style lang="scss" scoped>
header {
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  section.logo {
    display: flex;
    flex: 2 1 400px;
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
}
</style>
