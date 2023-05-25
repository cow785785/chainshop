<script>
export default {};
</script>
<template>
  <div class="end-area">
    <ul class="otherLink">
      <li class="otherLink__item">
        <a target="_blank" href="/question">会員規約</a>
      </li>
      <li class="otherLink__item">
        <a target="_blank" href="/question">個人情報の取り扱い</a>
      </li>
      <li class="otherLink__item">
        <a target="_blank" href="/question">サイトマップ</a>
      </li>
      <li class="otherLink__item">
        <a target="_blank" href="/question">問い合わせ</a>
      </li>
      <div class="pos">&copy; 版權為豬豬所有</div>
      <div class="links">
        <a href="#">
          <img src="../../public/Icons/facebook.svg" alt="facebook" />
        </a>
        <a href="#">
          <img src="../../public/Icons/instagram.svg" alt="instagram" />
        </a>
        <a href="#">
          <img src="../../public/Icons/twitter.svg" alt="twitter" />
        </a>
        <a href="#">
          <img src="../../public/Icons/youtube.svg" alt="youtube" />
        </a>
      </div>
    </ul>
  </div>
</template>
<style lang="scss">
.end-area {
  background-color: aquamarine;
  width: 100vw;
  height: 15vh;
  ul {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style-type: none;
    flex-wrap: wrap;

    a {
      img {
        width: 5vh;
        margin: 0rem 1rem;
      }
    }
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
