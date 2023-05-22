<script>
export default {
    data() {
        return {
            showButton: false
        };
    },
    methods: {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        handleScroll() {
            // 檢查滾動位置，決定是否顯示按鈕
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            this.showButton = scrollTop > 0;//此行與19~23行相同
            /*if (scrollTop > 0) {
                this.showButton = true;
            } else {
                this.showButton = false;
            }*/
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>
<template>
    <button class="scroll-to-top" @click="scrollToTop" v-if="showButton">
        <i class="fa-solid fa-chevron-up"></i>
    </button>
</template>
 
<style scoped>
.scroll-to-top {
    align-items: center;
    border: 1px solid #e5e5e5;
    border-radius: 28px;
    bottom: 106px;
    left: 1rem;
    display: flex;
    justify-content: center;
    height: 56px;
    width: 56px;
    margin: 0;
    padding: 0;
    position: fixed;
    z-index: 1;
}
</style>