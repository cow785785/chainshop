<script>
import HeaderView from '../components/HeaderView.vue';
import Imgchange from '../components/Imgchange.vue';
import CartBtn from '../components/CartBtn.vue';
export default {
    components: {
        HeaderView, Imgchange,CartBtn,
    },
    mounted() {
    },
}
</script>
<template>
    <div class="home">
        <HeaderView />
        <Imgchange />
        <CartBtn/>
    </div>
</template>
<style lang="scss" scoped></style>