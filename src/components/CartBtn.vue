<script>
export default {
    data() {
        return {
            itemCount: 0, // 購物車項目數量
            showCartModal: false, // 是否顯示購物車視窗
            // 其他購物車相關數據和方法...
            orderList: [],
            isEmpty: true,
        };
    },
    methods: {
        toggleCart() {
            this.showCartModal = !this.showCartModal;
        }
        
    },
    mounted() {
        setTimeout(() => {
            if (sessionStorage.getItem("orderList")) {
                this.orderList = JSON.parse(sessionStorage.getItem("orderList"));
                this.itemCount = this.orderList.length;
                this.isEmpty = false;
            }
        }, 500)

    },
};
</script>

<template>
    <div class="cart-container">
        <div class="cart-button" @click="toggleCart">
            <i class="fa fa-shopping-cart"></i>
            <span class="badge">{{ itemCount }}</span>
        </div>
        <div class="cart-popup" :class="{ 'cart-open': showCartModal }">
            <div class="cart-title">
                <h3>ショッピングカート</h3>
            </div>
            <ul class="cart-container" v-if="!isEmpty">
                <li v-for="item in orderList" :key="item.id" class="item">
                    <p>コード：{{ item.productsId.productCode }}-</p>
                    <p>総額：{{ item.infoTotal }}¥</p>
                    <p>個数：{{ item.infoQuantity }}</p>
                </li>
            </ul>
            <div class="cart-empty" v-else>
                <h3>何か入れましょう！</h3>
            </div>
            <div class="cart-footer">
                <button class="btn close-btn" @click="toggleCart">閉める</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cart-container {
    position: relative;

    .cart-popup {
        position: fixed;
        top: 15%;
        right: 0;
        width: 300px;
        height: 65vh;
        min-height: 300px;
        transform: translateY(-50%);
        background-color: #fff;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        transition: transform 0.3s ease;
        transform: translateX(300px);
        overflow-y: auto;
        z-index: 999;

        .cart-title {
            background-color: goldenrod;
            border-top-left-radius: 15px;
            text-align: center;
            padding: 8px;
            opacity: 0.8;
        }

        .item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;

            .item-name {
                margin-right: 10px;
            }

            .item-price {
                font-weight: bold;
            }
        }

        .cart-empty {
            position: absolute;
            top: 50%;
            left: 16px;
        }

        .cart-footer {
            position: absolute;
            bottom: 5px;
            left: 5px;

            .close-btn {
                color: gray;
            }
        }
    }

    .cart-open {
        transform: translateX(0);
    }
}

.cart-button {
    position: fixed;
    right: 20px;
    bottom: 120px;
    width: 60px;
    height: 60px;
    background-color: #f8f8f8;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 99999;

    .badge {
        position: absolute;
        top: -5px;
        right: -5px;
        width: 20px;
        height: 20px;
        background-color: red;
        color: #fff;
        font-size: 12px;
        font-weight: bold;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
