<script>

export default {
    data() {
        return {
            account: "dedault"
        }
    },
    methods: {

    },
    mounted() {
        if (localStorage.getItem("useraccount")) {
            this.account = localStorage.getItem("useraccount")
        }
    },
}

</script>

<template>
    <div class="member-side">
        <h3>{{ account }}</h3>
        <img src="../../public/img/日本壽司.jpg">
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
        width: 100px;
        height: 100px;
        border-radius: 15px;
    }
}
</style>