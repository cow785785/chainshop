<script>
import HeaderView from '../components/HeaderView.vue';
import Orderdetail from '../components/Orderdetail.vue';
export default {
    components:{
        HeaderView,Orderdetail,
    },
    data() {
        return {
            orderList:[],

        }
    },
    methods: {
        
    },
    mounted() {
        const useraccount = localStorage.getItem("useraccount");
        fetch("http://localhost:8080/get_orderdetails_by_useraccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: useraccount,
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.orderList = data;
            })
            .catch(err => console.log(err));
    },
}
</script>
<template>
    <div class="order">
        <HeaderView />
        <Orderdetail v-for="(orderdetail,index) in orderList" :orderdetail="orderdetail"/>
    </div>
</template>
<style lang="scss" scoped>
    
</style>