<script>

export default {
    props: [
        "useraccount","userPoint",
    ],
    data() {
        return {
        }
    },
    methods: {

    },
    mounted() {
       
    },
}

</script>

<template>
    <div class="member-side">
        <h3>{{ useraccount }}</h3>
        <img src="../../public/img/日本壽司.jpg">
        <h4>{{ userPoint }}</h4>
    </div>
</template>
<style lang="scss" scoped>
.member-side {
    background-color: antiquewhite;
    width: 200px;
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        margin: 24px;
        width: 100px;
        height: 100px;
        border-radius: 15px;
    }
}
</style>