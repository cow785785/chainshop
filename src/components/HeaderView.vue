<script>
import { RouterLink, RouterView } from "vue-router";
import Imgchange from "./Imgchange.vue";
export default {
  components: {
    Imgchange,
  },
};
</script>
<template>
  <header>
    <section class="logo">
      <a href="#" class="toplogo">
        <img src="../../public/R.png" alt="網頁LOGO" />
        <h1>商店名稱</h1>
      </a>
    </section>
    <nav>
      <ul>
        <li>
          <RouterLink to="/login"
            ><i class="fa-solid fa-user-group" style="color: #d40c48"></i
            >ログイン</RouterLink
          >
        </li>
        <li>
          <RouterLink to=""
            ><i class="fa-solid fa-plane"></i>会員センター</RouterLink
          >
        </li>
        <li>
          <RouterLink to=""
            ><i class="fa-solid fa-plane"></i>お買い物履歴</RouterLink
          >
        </li>
        <li>
          <RouterLink to=""
            ><i class="fa-solid fa-plane"></i>問い合わせ</RouterLink
          >
        </li>
      </ul>
    </nav>
  </header>
  <Imgchange />
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
