<script>
export default {
    props: {
        orderdetail: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            orderNumber: this.orderdetail.orderNumber,
            totalPrice: this.orderdetail.totalPrice,
            quantity: this.orderdetail.quantity,
            address: this.orderdetail.deliveryAddress,
            orderStatus: this.orderdetail.orderStatus,
            orderTime: this.orderdetail.orderTime.substring(0, 10),
            infoList: [],
            showInfo: false,
            checkData: false,
        }
    },
    methods: {
        getInfo(orderNumber) {
            this.showInfo = !this.showInfo
            if (!this.checkData) {
                fetch("http://localhost:8080/get_orderdetail_info_by_order_number", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: orderNumber,
                })
                    .then(res => res.json())
                    .then(data => {
                        this.infoList = data;
                        this.checkData = true;
                    })
                    .catch(err => console.log(err));
            }
        },
    },
    mounted() {
        // const orderNumber = this.orderNumber;
        // fetch("http://localhost:8080/get_orderdetail_info_by_order_number", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: orderNumber,
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         this.infoList = data
        //     })
        //     .catch(err => console.log(err));
    },
}
</script>
<template>
    <div class="orderdetail">

        <div class="title">
            <div class="info time">
                <p>注文日</p>
                {{ orderTime }}
            </div>
            <div class="info long addr">
                <p>お届け先</p>
                {{ address }}
            </div>
            <div class="info long orderNumber">
                <p>注文番号：{{ orderNumber }} </p>
                {{ orderStatus }}
            </div>
            <div class="info total">
                <p>合計</p>
                {{ totalPrice }}¥
            </div>
            <div class="get" @click="getInfo(orderNumber)">詳細を見る≫</div>
        </div>
        <div v-for="detail in infoList" class="detail" v-show="showInfo">
            <img :src="detail.productsId.productImg" alt="" class="info img">
            <div class="info product">
                <h4>{{ detail.productsId.productName }}</h4>
                {{ detail.productsId.productCode }}
                <p>個数：{{ detail.infoQuantity }}</p>
            </div>
            <div class="info long">
                <p>{{ detail.productsId.productInfo }}</p>
                <p> {{ detail.productsId.productDescribe }}</p>
            </div>
            <div class="info total">
                <p>小計：{{ detail.infoTotal }}¥</p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.orderdetail {
    margin: 12px;
    border: 1px solid rgb(211, 211, 211);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    opacity: 0.85;
    min-width: min-content;
    max-width: 920px;

    &:hover {
        opacity: 1;
    }

    .title {
        display: flex;
        border-bottom: 1px solid rgb(211, 211, 211);
        background-color: aliceblue;
        align-items: center;
        position: relative;
        justify-content: space-between;

        .info {
            margin: 1rem;
            min-width: 100px;
        }

        .long {
            min-width: 200px;
        }

        .get {
            position: absolute;
            font-size: 8px;
            color: blue;
            right: 8px;
            bottom: 0;
            cursor: pointer;
            user-select: none;
        }
    }

    .detail {
        display: flex;
        align-items: center;
        align-items: center;
        margin: 12px;
        border: 1px solid rgb(199, 199, 199);
        border-radius: 15px;
        transition: 0.3s;

        &:hover {
            background-color: rgb(84, 117, 146);
            color: white;
        }

        .info {
            margin: 8px;
            min-width: 80px;
            flex: 1;
        }

        .long {
            min-width: 35%;
        }

        .img {
            max-width: 80px;
            height: 80px;
            border-radius: 4px;
            object-fit: cover;
        }
    }
}
</style>