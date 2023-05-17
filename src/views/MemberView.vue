<script>
import MemberSide from '../components/MemberSide.vue';
export default {
    components: {
        MemberSide,
    },
    data() {
        return {
            useraccount: "useraccount",
            userName: "userName",
            userBirth: "userBirth",
            userPoint: "userPoint",
            userPhone: "userPhone",
            userAddress: "userAddress",
            phoneChange: true,
            addressChange: true,
            haveChange: false,
        }
    },
    methods: {
        changePhone() {
            this.phoneChange = false;
        },
        changeAddr() {
            this.addressChange = false;
        },
        someChange() {
            this.haveChange = true;

        },
        update() {
            const inputPwd = prompt('パスワード再確認');
            if (inputPwd != localStorage.getItem("password")) {
                alert("パスワードが間違っています。");
                return;
            }

            const body = {
                useraccount: this.account,
                username: this.userName,
                birthDate: this.userBirth,
                phone: this.userPhone,
                address: this.userAddress,
                password: inputPwd,
            };
            fetch("http://localhost:8080/updateMember", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    alert("更新完了、リロードします。")
                    location.reload();
                }).catch(err => {
                    console.log(err);
                })
        }
    },
    mounted() {
        if (localStorage.getItem("useraccount")) {
            this.account = localStorage.getItem("useraccount")

            const body = {
                useraccount: this.account,
            };
            fetch("http://localhost:8080/selectMember", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            })
                .then(response => response.json())
                .then(data => {
                    this.useraccount = data.userAccount;
                    this.userName = data.userName;
                    this.userBirth = data.birthDate.substring(0, 10);
                    this.userPoint = "userPoint尚未導入";
                    this.userPhone = data.phone;
                    this.userAddress = data.address;
                })
                .catch(err => console.log(err))
        } else {
            alert("ログインしてください。");
            this.$router.push("/loginView");
        }
    },
}
</script>
<template>
    <div class="member">
        <MemberSide :useraccount="useraccount" :userPoint="userPoint" />
        <div class="member-detail">
            <div class="member-account">
                <h4>{{ useraccount }}</h4>

                <h3> {{ userName }}，こんにちは！</h3>
                <div class="form-floating input-area birth">
                    <input type="text" class="form-control input birth" id="birth" v-model="userBirth" disabled="true">
                    <label for="birth">誕生日：</label>
                </div>
                <div class="form-floating input-area point">
                    <input type="text" class="form-control input point" id="point" v-model="userPoint" disabled="true">
                    <label for="point">ポイント：</label>
                </div>
                <div class="form-floating input-area phone">
                    <input type="tel" class="form-control input phone" id="phone" pattern="[0-9]{2}-[0-9]{8}" required
                        v-model="userPhone" :disabled="phoneChange" @input="someChange">
                    <label for="phone">電話番号：</label>
                    <i class="icon fa-solid fa-pen" @click="changePhone"></i>
                </div>
                <div class="form-floating input-area address">
                    <input type="text" class="form-control input address" id="address" v-model="userAddress"
                        :disabled="addressChange" @input="someChange">
                    <i class="icon fa-solid fa-pen " @click="changeAddr"></i>
                    <label for="address">アドレス：</label>
                </div>
                <button type="button" class="btn btn-primary update-btn " v-show="haveChange" @click="update">修正する</button>
            </div>
            <div class="member-order">
                <h3>オーダー管理</h3>
                
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
    text-align: center;

    .member-order {}

    .member-detail {
        margin: 24px;
        padding: 24px;
        width: 100%;
        border: 1px solid gray;
        border-radius: 15px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

        .member-account {

            .input-area {
                position: relative;
                margin: 16px;
                min-width: 300px;

                .icon {
                    position: absolute;
                    right: 2%;
                    top: 33%;
                    z-index: 2;
                }

            }

            .update-btn {
                transition: 1s;
            }
        }

    }
}
</style>