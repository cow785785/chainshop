<script>
export default {
  data() {
    return {};
  },
  methods: {
    // navigateToMember() {
    //   this.$router.push("/backMembers");
    // },
    // toproduct() {
    //   this.$router.push("/backProduct");
    // },
  },
};
</script>
<template>
  <div class="all-area">
    <div class="left-area">
      <div class="btn-area">
        <button>首頁</button>
        <RouterLink to="/backMembers" class="link"
          ><button>會員管理</button></RouterLink
        >
        <RouterLink to="/backProduct" class="link"
          ><button>產品管理</button></RouterLink
        >
        <RouterLink to="/backOrderListView" class="link"
          ><button>訂單管理</button></RouterLink
        >
      </div>
    </div>
    <div class="right-area">
      <div class="bg-img"></div>
      <div class="four-btn">
        <div class="up-area">
          <button @click="navigateToMember" class="myButton">會員管理</button>
          <button @click="toproduct" class="myButton">產品管理</button>
        </div>
        <div class="down-area">
          <button class="myButton">訂單管理</button>
          <button class="myButton">活動管理</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.all-area {
  display: flex;

  .left-area {
    background-color: cadetblue;
    width: 20vw;
    height: 100vh;

    .btn-area {
      width: 100%;
      height: 100%;
      border: 5px solid rgb(229, 216, 45);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .link {
        width: 100%;
      }
      button {
        width: 100%;
        padding: 20px;

        a {
          text-decoration: none;
          color: black;
        }
        &:hover {
          background-color: rgb(201, 30, 98);
          color: white;
          border: 5px #003c9d solid;
        }
      }
    }
  }

  .right-area {
    width: 80%;
    position: relative;
    .bg-img {
      position: absolute;
      width: 100%;
      height: 100vh;
      background-color: #d83526;
      opacity: 0.1;
      z-index: -2;
    }

    .four-btn {
      width: 100%;
      height: 100vh;
      border: 5px solid rgb(229, 216, 45);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .up-area {
        width: 50%;
        display: flex;
        justify-content: space-around;
        margin: 30px;
        button {
          width: 10rem;
          height: 10rem;
        }
      }

      .down-area {
        width: 50%;
        display: flex;
        justify-content: space-around;
        button {
          width: 10rem;
          height: 10rem;
        }
      }
    }
  }
}

.myButton {
  box-shadow: inset 0px 1px 0px 0px #f7c5c0;
  background: linear-gradient(to bottom, #fc8d83 5%, #e4685d 100%);
  background-color: #fc8d83;
  border-radius: 6px;
  border: 1px solid #d83526;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #b23e35;
}
.myButton:hover {
  background: linear-gradient(to bottom, #e4685d 5%, #fc8d83 100%);
  background-color: #e4685d;
}
.myButton:active {
  position: relative;
  top: 1px;
}
</style>
