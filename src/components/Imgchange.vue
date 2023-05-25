<script>
// import ProductInfoView from "../views/ProductInfoView.vue";
import { RouterLink, RouterView } from "vue-router";
// import MouseView from "./MouseView.vue";
import FooterView from "./FooterView.vue";
export default {
  components: {
    // ProductInfoView,
    FooterView,
    //  MouseView,
  },
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
      show: true,
      category: null,
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
  methods: {
    // 點選圖片就顯示該分類的所有商品
    saveCategory(category) {
      this.category = category;
      sessionStorage.setItem("category", this.category);
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
    <section class="info-circles" v-show="show">
      <h3>精品美食，應有盡有</h3>
      <div class="circles">
        <div class="circle">
          <router-link class="link" to="/category">
            <img
              class="breakfast"
              src="../../public/img/breakfast.jpg"
              alt="精美早餐"
              @click="saveCategory('早餐')"
            />
          </router-link>
          <p>多種早餐</p>
        </div>

        <div class="circle">
          <router-link class="link" to="/category">
            <img
              src="../../public/img/drink.jpg"
              alt="飲料"
              @click="saveCategory('飲料')"
            />
          </router-link>
          <p>爽喝就喝</p>
        </div>
        <div class="circle">
          <router-link class="link" to="/category">
            <img
              src="../../public/img/fried.jpg"
              alt="炸物"
              @click="saveCategory('炸物')"
            />
          </router-link>
          <p>炸物</p>
        </div>
      </div>
      <div class="circles">
        <div class="circle">
          <img src="../../public/img/lunch.jpg" alt="午餐" />
          <p>多種風格午餐</p>
        </div>
        <div class="circle">
          <img src="../../public/img/yakiniku.jpg" alt="燒烤" />
          <p>經典燒烤，肯定要有</p>
        </div>
        <div class="circle">
          <img src="../../public/img/salad.jpg" alt="蔬菜" />
          <p>補充蔬菜</p>
        </div>
      </div>
    </section>
    <section v-if="!show" class="product-area">
      <h3>商品清單</h3>
      <!-- <ProductInfoView :category="category"></ProductInfoView> -->
    </section>
  </main>
  <!-- <MouseView /> -->
  <FooterView />
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
    transition: background-image 0.75s ease; /* 添加過度效果 */
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

  section.info-circles {
    background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
    opacity: 1;
    padding: 2rem 1rem;
  }

  h3 {
    text-align: center;
    font-size: 2rem;
  }

  div.circles {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .circle {
      padding: 1rem;
      flex: 0 1 250px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.3rem;
      .link {
        width: 80%;
        height: 50%;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
          transition: all 0.1s ease-in;
          &:hover {
            padding: 0.5rem;
            border: 1px solid red;
          }
        }
      }
      img {
        width: 80%;
        height: 50%;
        transition: all 0.1s ease-in;
        &:hover {
          padding: 0.5rem;
          border: 1px solid red;
        }
      }
    }
  }
}
</style>
