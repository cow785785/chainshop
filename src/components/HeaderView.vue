<script>
import { RouterLink, RouterView } from "vue-router";
import Imgchange from "./Imgchange.vue";
import ShopCarView from "./ShopCarView.vue";
export default {
  components: {
    Imgchange,
    ShopCarView,
  },
};
</script>
<template>
  <Imgchange />
  <!-- <ShopCarView /> -->
  <RouterView />
</template>
<style lang="scss" scoped>
// header {

// }
</style>
