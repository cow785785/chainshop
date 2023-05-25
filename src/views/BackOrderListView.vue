<script>
export default {
  data() {
    return {
      isCheck: false,
      showSearch: false,
      orderLists: [], // 新增一個用於存儲會員資料的數據屬性
      showModal: false, // 叫出畫面
      editedorderList: null,
      updatedorderList: {
        orderNumber: "",
        useraccount: "",
        productCode: "",
        totalPrice: "",
        quantity: "",
        deliveryAddress: "",
        orderStatus: "",
        orderTime: "",
      },
      searchKeyword: "", // 新增搜尋關鍵字的屬性
    };
  },
  methods: {
    searchAllOrderInfo() {
      this.isCheck = !this.isCheck;
      this.showSearch = !this.showSearch; // 收起第二個數據資料
      fetch("http://localhost:8080/get_all_orderdetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.orderLists = data; // 將獲得的資料賦值給 orderLists 屬性
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    searchOrderlist() {
      if (this.showSearch) {
        return []; // 返回空陣列，隱藏第二個數據資料
      }
      return this.orderLists.filter((orderList) => {
        return orderList.useraccount
          .toLowerCase()
          .includes(this.searchKeyword.toLowerCase());
      });
      this.select();
    },
    openModal(orderList) {
      this.editedorderList = orderList;
      this.updatedorderList = {
        orderNumber: orderList.orderNumber,
        useraccount: orderList.useraccount,
        productCode: orderList.productCode,
        totalPrice: orderList.totalPrice,
        quantity: orderList.quantity,
        deliveryAddress: orderList.deliveryAddress,
        orderStatus: orderList.orderStatus,
      };
      this.showModal = true;
    },
    updatedOrderList() {
      const body = {
        order_list: [
          {
            orderNumber: this.editedorderList.orderNumber,
            useraccount: this.editedorderList.useraccount,
            productCode: this.editedorderList.productCode,
            totalPrice: this.editedorderList.totalPrice,
            quantity: this.editedorderList.quantity,
            deliveryAddress: this.editedorderList.deliveryAddress,
            orderStatus: this.editedorderList.orderStatus,
            orderTime: this.editedorderList.orderTime,
          },
        ],
      };
      fetch("http://localhost:8080/update_order", {
        body: JSON.stringify(body),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.select();
          alert("更新成功");
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });

      this.showModal = false;
    },

    confirmDelete(orderList) {
      // 彈出刪除確認彈窗
      if (confirm("確定要刪除該會員嗎？")) {
        // 用戶確認刪除，調用 deleteMember 方法執行刪除操作
        this.deleteMember(orderList);
      }
    },
    deleteorderList(orderList) {
      fetch("http://localhost:8080/del_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useraccount: orderList.useraccount,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.select(); // 更新訂單列表
          // 根據 API 的返回結果進行相應的處理
          // 例如更新列表數據或顯示提示信息等
        })
        .catch((error) => {
          console.error(error);
        });
      // location.reload();
    },
  },
  mounted() {
    this.searchAllOrderInfo();
  },
};
</script>
<template>
  <div class="all-area">
    <h2>訂單明細管理</h2>
    <div class="info-area">
      <input
        type="text"
        name="orderlistinfo"
        id="orderlistinfo"
        v-model="searchKeyword"
      />
      <button type="button" @click="searchAllOrderInfo" class="myButton">
        利用帳號查詢
      </button>
      <button type="button" @click="searchAllOrderInfo" class="myButton">
        全部訂單資料
      </button>
      <!-- 找出全部資料 -->
    </div>
    <div class="order-list">
      <div v-if="isCheck" class="table-container">
        <table>
          <tr>
            <th>ID</th>
            <th>orderNumber</th>
            <th>useraccount</th>
            <th>productCode</th>
            <th>totalPrice</th>
            <th>quantity</th>
            <th>deliveryAddress</th>
            <th>orderStatus</th>
            <th>orderTime</th>
            <th>修改</th>
            <th>刪除</th>
          </tr>
          <tbody id="data-body">
            <tr v-for="orderList in orderLists" :key="orderList.id">
              <td>{{ orderList.id }}</td>
              <td>{{ orderList.orderNumber }}</td>
              <td>{{ orderList.useraccount }}</td>
              <td>{{ orderList.productCode }}</td>
              <td>{{ orderList.totalPrice }}</td>
              <td>{{ orderList.quantity }}</td>
              <td>{{ orderList.deliveryAddress }}</td>
              <td>{{ orderList.orderStatus }}</td>
              <td>{{ orderList.orderTime }}</td>
              <td>
                <button @click="openModal(orderList)">修改</button>
              </td>
              <td>
                <button @click="confirmDelete(orderList)">刪除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="search-area">
        <table>
          <tbody id="data-body">
            <tr v-if="showSearch == false">
              <th>ID</th>
              <th>orderNumber</th>
              <th>useraccount</th>
              <th>productCode</th>
              <th>totalPrice</th>
              <th>quantity</th>
              <th>deliveryAddress</th>
              <th>orderStatus</th>
              <th>orderTime</th>
              <th>修改</th>
              <th>刪除</th>
            </tr>
            <tr v-for="orderList in searchOrderlist()" :key="orderList.id">
              <td>{{ orderList.id }}</td>
              <td>{{ orderList.orderNumber }}</td>
              <td>{{ orderList.useraccount }}</td>
              <td>{{ orderList.productCode }}</td>
              <td>{{ orderList.totalPrice }}</td>
              <td>{{ orderList.quantity }}</td>
              <td>{{ orderList.deliveryAddress }}</td>
              <td>{{ orderList.orderStatus }}</td>
              <td>{{ orderList.orderTime }}</td>
              <td>
                <button @click="openModal(orderList)">修改</button>
              </td>
              <td>
                <button @click="confirmDelete(orderList)">刪除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 彈出視窗 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <!-- 這裡放彈出窗口的内容 -->
        <h3>修改訂單資料</h3>
        <form @submit.prevent="updatedOrderList">
          <label for="orderNumber">orderNumber:</label>
          <input
            type="text"
            id="orderNumber"
            v-model="editedorderList.orderNumber"
            disabled
            required
          />

          <label for="useraccount">useraccount:</label>
          <input
            type="text"
            id="useraccount"
            v-model="editedorderList.useraccount"
            disabled
            required
          />

          <label for="username">productCode:</label>
          <input
            type="text"
            id="productCode"
            v-model="editedorderList.productCode"
            disabled
            required
          />

          <label for="birthDate">totalPrice:</label>
          <input
            type="text"
            id="totalPrice"
            v-model="editedorderList.totalPrice"
            required
          />
          <label for="quantity">quantity:</label>
          <input
            type="text"
            id="quantity"
            v-model="editedorderList.quantity"
            required
          />

          <label for="phone">deliveryAddress:</label>
          <input
            type="text"
            id="deliveryAddress"
            v-model="editedorderList.deliveryAddress"
            required
          />

          <label for="phone">orderStatus:</label>
          <input
            type="text"
            id="orderStatus"
            v-model="editedorderList.orderStatus"
            required
          />

          <button type="submit">保存</button>
          <button @click="showModal = false">取消</button>
        </form>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.all-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 100vw;
  height: 100vh;

  .myButton {
    box-shadow: 5px 5px 15px 0px #276873;
    background: linear-gradient(to bottom, #599bb3 5%, #408c99 2000%);
    background-color: #599bb3;
    border-radius: 8px;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 5px;
    font-weight: bold;
    padding: 13px 32px;
    margin-left: 20px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #3d768a;
  }
  .myButton:hover {
    background: linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
    background-color: #408c99;
  }
  .myButton:active {
    position: relative;
    top: 1px;
  }
}
.table-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
  table {
    // margin-top: 20px;
    border: 2px solid black;
    th {
      border: 2px solid black;
      background-color: antiquewhite;
    }
  }
}
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
.search-area {
  margin-top: 20px;
  table {
    // margin-top: 80px;
    border: 2px solid black;
    th {
      border: 2px solid black;
      background-color: antiquewhite;
    }
  }
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}

.modal form {
  display: flex;
  flex-direction: column;
}

.modal form label {
  margin-bottom: 5px;
}

.modal form input {
  margin-bottom: 10px;
}

.modal form button {
  margin-top: 10px;
}
</style>
