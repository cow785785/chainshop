<script>
import MemberSide from '../components/MemberSide.vue';
export default {
    components: {
        MemberSide,
    },
    data() {
        return {
            useraccount: "預設",
            userName: "預設",
            userBirth: "預設",
            userPoint: "預設",
            userPhone: "預設",
            userAddress: "預設",

        }
    },
    methods: {

    },
    mounted() {
        if (localStorage.getItem("useraccount")) {
            this.account = localStorage.getItem("useraccount")

            const body = {
                useraccount: this.account,
            };
            fetch("http://localhost:8080/selectMember", {
                methods: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            })
                .then(response=>response.json())
                .then(data=>{
                    console.log(data);
                })
                .catch(err => console.log(err))
        }

    },
}
</script>
<template>
    <div class="member">
        <MemberSide />
        <div class="member-detail">
            <div class="member-account">
                <h2>{{ useraccount }}</h2>
                <ul>
                    <li>{{ userName }}</li>
                    <li>{{ userBirth }}</li>
                    <li>{{ userPoint }}</li>
                    <li>{{ userPhone }}</li>
                    <li>{{ userAddress }}</li>
                </ul>


            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.member {
    display: flex;
    width: 100%;
    height: 900px;
    overflow: auto;

    .member-detail {
        margin: 24px;
    }

}
</style>