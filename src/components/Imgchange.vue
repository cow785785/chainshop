<script>
export default {
  data() {
    return {
      backgrounds: [
        "../../public/img/fryfood.jpg",
        "../../public/img/日本壽司.jpg",
        "../../public/img/mix2.jpg",
        "../../public/img/vage.jpg",
        "../../public/img/yakiniku.jpg",
      ],
      currentBackgroundIndex: 0,
    };
  },
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: `url(${
          this.backgrounds[this.currentBackgroundIndex]
        })`,
      };
    },
  },
  mounted() {
    setInterval(() => {
      this.currentBackgroundIndex =
        (this.currentBackgroundIndex + 1) % this.backgrounds.length;
    }, 3000);
  },
};
</script>
<template>
  <main>
    <section class="backgroung-img" :style="backgroundStyle">
      <div class="filter"></div>
      <h3>盡情開撈</h3>
    </section>
    <!-- <section class="info-circles">
      <h3>精品美食，應有盡有</h3>
      <div class="circles">
        <div class="circle">
          <img src="../../public/img/fryfood.jpg" alt="北海道雪景" />
          <p>多種炸物，任君挑選</p>
        </div>
        <div class="circle">
          <img src="../../public/img/日本壽司.jpg" alt="日本壽司" />
          <p>日本道地壽司與美食</p>
        </div>
        <div class="circle">
          <img src="../../public/img/mix2.jpg" alt="富士山" />
          <p>多種風格，選擇困難症</p>
        </div>
        <div class="circle">
          <img src="../../public/img/vage.jpg" alt="清水寺" />
          <p>不能忘記補充蔬菜</p>
        </div>
        <div class="circle">
          <img src="../../public/img/yakiniku.jpg" alt="清水寺" />
          <p>經典燒烤，肯定要有</p>
        </div>
      </div>
    </section> -->
  </main>
</template>
<style lang="scss" scoped>
main {
  section.backgroung-img {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    background-image: url("../assets/img/fryfood.jpg");
    background-size: cover;
    background-position: center;
    transition: background-image 0.75s ease; /* 添加过渡效果 */
    position: relative;
    z-index: 0; // stacking context

    .filter {
      background-color: rgba(0, 0, 0, 0.5);
      width: 100%;
      min-height: 70vh;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
    h3 {
      color: white;
      font-size: 2.5rem;
    }
  }
}
</style>
