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
      setTimeout(() => {
         this.showFirstElement = true;
      }, 500);
   },
};
</script>
<template>
   <main>
      <section class="backgroung-img fly-in-left-top" :style="backgroundStyle">
         <div class="filter"></div>
         <h3>ぞんぶんにえものを食う</h3>
      </section>
      <section class="info-circles" v-show="show">
         <h3 class="fade-in">たようびしょくいちおうく</h3>
         <div class="circles">
            <div class="circle fly-in-left">
               <router-link class="link" to="/category">
                  <img
                     class="breakfast"
                     src="../../public/img/breakfast.jpg"
                     alt="精美早餐"
                     @click="saveCategory('早餐')"
                  />
               </router-link>
               <p>多様なちょうしょく</p>
            </div>

            <div class="circle fly-in-top">
               <router-link class="link" to="/category">
                  <img
                     src="../../public/img/drink.jpg"
                     alt="飲料"
                     @click="saveCategory('飲料')"
                  />
               </router-link>
               <p>爽快に飲む</p>
            </div>
            <div class="circle fly-in-right">
               <router-link class="link" to="/category">
                  <img
                     src="../../public/img/dessert.png"
                     alt="甜點"
                     @click="saveCategory('甜點')"
                  />
               </router-link>
               <p>万悪の根源-スイーツ</p>
            </div>
         </div>
         <div class="circles">
            <div class="circle fly-in-bottom">
               <router-link class="link" to="/category">
                  <img
                     src="../../public/img/lunch.jpg"
                     alt="午餐"
                     @click="saveCategory('午餐')"
                  />
               </router-link>
               <p>多様なスタイルのランチ</p>
            </div>
            <div class="circle fly-in-bottom">
               <router-link class="link" to="/category">
                  <img
                     src="../../public/img/yakiniku.jpg"
                     alt="燒烤"
                     @click="saveCategory('燒烤')"
                  />
               </router-link>
               <p>クラシックな焼き肉</p>
            </div>
            <div class="circle fly-in-right">
               <router-link class="link" to="/category">
                  <img
                     src="../../public/img/salad.jpg"
                     alt="蔬菜"
                     @click="saveCategory('蔬菜')"
                  />
               </router-link>
               <p>野菜の摂取</p>
            </div>
         </div>
      </section>
      <section v-if="!show" class="product-area">
         <h3>商品リスト</h3>
         <!-- <ProductInfoView :category="category"></ProductInfoView> -->
      </section>
   </main>
   <!-- <MouseView /> -->
   <FooterView />
</template>
<style lang="scss" scoped>
main {
   .fly-in-left-top {
      animation: fly-in-left 2.5s ease;
   }

   @keyframes fly-in-left {
      from {
         transform: translateX(-100%);
         opacity: 0;
      }
      to {
         transform: translateX(0);
         opacity: 1;
      }
   }
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
      margin-top: 4rem;
      //h3
      @keyframes fade-in {
         from {
            opacity: 0;
         }
         to {
            opacity: 1;
         }
      }

      .fade-in {
         animation: fade-in 1s ease;
      }

      //左邊飛入
      .fly-in-left {
         animation: fly-in-left 3.5s ease;
      }

      @keyframes fly-in-left {
         from {
            transform: translateX(-200%);
            opacity: 0;
         }
         to {
            transform: translateX(0);
            opacity: 1;
         }
      }
      //右邊飛入
      @keyframes fly-in-right {
         from {
            transform: translateX(200%);
            opacity: 0;
         }
         to {
            transform: translateX(0);
            opacity: 1;
         }
      }

      .fly-in-right {
         animation: fly-in-right 3.5s ease;
      }

      //上面飛入
      @keyframes fly-in-top {
         from {
            transform: translateY(-200%);
            opacity: 0;
         }
         to {
            transform: translateY(0);
            opacity: 1;
         }
      }

      .fly-in-top {
         animation: fly-in-top 3.5s ease;
      }

      //下方飛入
      @keyframes fly-in-bottom {
         from {
            transform: translateY(200%);
            opacity: 0;
         }
         to {
            transform: translateY(0);
            opacity: 1;
         }
      }

      .fly-in-bottom {
         animation: fly-in-bottom 3.5s ease;
      }
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
