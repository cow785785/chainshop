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
            productName: this.orderdetail.productsId.productName,
            productCode: this.orderdetail.productCode,
            totalPrice: this.orderdetail.totalPrice,
            quantity: this.orderdetail.quantity,
            address: this.orderdetail.deliveryAddress,
            orderStatus: this.orderdetail.orderStatus,
            orderTime: this.orderdetail.orderTime.substring(0, 10),
            imgLink: this.orderdetail.productsId.productImg,
        }
    },
    methods: {

    },
    mounted() {

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
            <div class="info total">
                <p>合計</p>
                {{ totalPrice }}
            </div>
            <div class="info long addr">
                <p>お届け先</p>
                {{ address }}
            </div>
            <div class="info long ordercode">
                <p>注文番号：{{ orderNumber }} </p>

            </div>
        </div>
        <div class="detail">
            <div class="info box">
                {{ imgLink }}
            </div>
            <div class="info long product">
                <h4>{{ productName }}</h4>
                {{ productCode }}
                <p>個数：{{ quantity }}</p>
            </div>
            <div class="info status">
                
                <p>{{ orderStatus }}</p>
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
    opacity: 0.8;

    &:hover {
        opacity: 1;
    }

    .title {
        display: flex;
        border-bottom: 1px solid rgb(211, 211, 211);
        background-color: aliceblue;
        align-items: center;

        .info {
            margin: 8px;
            min-width: 50px;
        }

        .long {
            min-width: 300px;
        }
    }

    .detail {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .info {
            margin: 8px;
            min-width: 50px;
        }

        .long {
            min-width: 65%;
        }

        .box {
            width: 80px;
            height: 80px;
            background-color: aqua;
        }

    }
}
</style>