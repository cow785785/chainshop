<script>
export default {
  data() {
    return {
      isCheck: false,
      searchShow: false,
      products: [], // 新增一個用於存儲產品資料的數據屬性
      showModal: false, // 叫出畫面
      editedProduct: null,
      Img: "",
      searchInput: "",

      updatedProduct: {
        productCode: "",
        productName: "",
        price: 0,
        productImg: "",
        productInfo: "",
        productDescribe: "",
        category: "",
      },
    };
  },
  methods: {
    searchProduct() {
      if (!this.searchShow) {
        this.searchShow = true;
      }
      this.isCheck = false;
      let req = {
        searchName: this.searchInput,
      };
      fetch("http://localhost:8080/find_product_by_name_or_category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      })
        .then(function (res) {
          return res.json();
        })

        .then((data) => {
          console.log(data);
          this.products = data.list;
        });
    },
    select() {
      if (!this.isCheck) {
        this.isCheck = true;
      }
      this.isCheck = true;
      this.searchShow = false;
      fetch("http://localhost:8080/find_all_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          this.products = data; // 將獲得的資料賦值給 members 屬性
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openModal(product, e) {
      this.editedProduct = product;
      this.updatedProduct = {
        productCode: product.productCode,
        productName: product.productName,
        price: product.price,
        productImg: product.productImg,
        productInfo: product.productInfo,
        productDescribe: product.productDescribe,
        category: product.category,
      };
      this.showModal = true;
    },
    changeImg(e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        console.log(e.target.result);
        this.Img = e.target.result;
        console.log(this.Img);
      };
      console.log(this.Img);
    },
    updateProduct() {
      if (this.Img !== "") {
        this.editedProduct.productImg = this.Img;
      }

      const body = {
        product: this.editedProduct,
      };
      // const body = {
      //   productCode: this.editedProduct.productCode,
      //   productName: this.editedProduct.productName,
      //   price: this.editedProduct.price,
      //   productImg: this.editedProduct.productImg,
      //   productInfo: this.editedProduct.productInfo,
      //   productDescribe: this.editedProduct.productDescribe,
      //   category: this.editedProduct.category,
      // };
      fetch("http://localhost:8080/update_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });

      this.showModal = false;
    },
    openDeleteproduct(product) {
      if (confirm("確定要刪除該資料嗎？")) {
        this.deleteProductInfo(product);
      }
    },
    deleteProductInfo(product) {
      fetch("http://localhost:8080/delete_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productCode: product.productCode,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // this.select();
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
    this.select();
  },
};
</script>
<template>
  <div class="all-area">
    <h2>產品資料管理</h2>
    <div class="productinfo-area">
      <input
        type="text"
        name="productinfo"
        id="productinfo"
        v-model="searchInput"
      />
      <button type="button" @click="searchProduct" class="myButton">
        查詢商品資料
      </button>
      <button type="button" @click="select" class="myButton">
        顯示全部產品資料
      </button>
    </div>
    <div class="product-list">
      <!-- 搜尋 -->
      <div v-if="searchShow" class="table-container">
        <table>
          <tr>
            <th>ID</th>
            <th>productCode</th>
            <th>productName</th>
            <th>price</th>
            <th>productImg</th>
            <th>productInfo</th>
            <th>productDescribe</th>
            <th>category</th>
            <th>修改</th>
            <th>刪除</th>
          </tr>
          <tbody id="data-body">
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.productCode }}</td>
              <td>{{ product.productName }}</td>
              <td>{{ product.price }}</td>
              <td><img v-bind:src="product.productImg" /></td>
              <td>{{ product.productInfo }}</td>
              <td>{{ product.productDescribe }}</td>
              <td>{{ product.category }}</td>
              <td>
                <button @click="openModal(product)">修改</button>
              </td>
              <td>
                <button @click="openDeleteproduct(product)">刪除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="isCheck" class="table-container">
        <table>
          <tr>
            <th>ID</th>
            <th>productCode</th>
            <th>productName</th>
            <th>price</th>
            <th>productImg</th>
            <th>productInfo</th>
            <th>productDescribe</th>
            <th>category</th>
            <th>修改</th>
            <th>刪除</th>
          </tr>
          <tbody id="data-body">
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.productCode }}</td>
              <td>{{ product.productName }}</td>
              <td>{{ product.price }}</td>
              <td><img v-bind:src="product.productImg" /></td>
              <td>{{ product.productInfo }}</td>
              <td>{{ product.productDescribe }}</td>
              <td>{{ product.category }}</td>
              <td>
                <button @click="openModal(product)">修改</button>
              </td>
              <td>
                <button @click="openDeleteproduct(product)">刪除</button>
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
        <h3>修改產品資料</h3>
        <form @submit.prevent="updateProduct">
          <label for="productCode">productCode:</label>
          <input
            type="text"
            id="productCode"
            v-model="editedProduct.productCode"
            required
          />

          <label for="productName">productName:</label>
          <input
            type="text"
            id="productName"
            v-model="editedProduct.productName"
            required
          />

          <label for="price">price:</label>
          <input
            type="text"
            id="price"
            v-model="editedProduct.price"
            required
          />

          <label for="productImg">productImg:</label>
          <input type="file" id="productImg" @change="changeImg" />

          <label for="productInfo">productInfo:</label>
          <input
            type="text"
            id="productInfo"
            v-model="editedProduct.productInfo"
            required
          />

          <label for="productDescribe">productDescribe:</label>
          <input
            type="text"
            id="productDescribe"
            v-model="editedProduct.productDescribe"
            required
          />

          <label for="category">category:</label>
          <input
            type="text"
            id="category"
            v-model="editedProduct.category"
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
  .table-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    table {
      margin-top: 80px;
      border: 2px solid black;
      th {
        border: 2px solid black;
        background-color: antiquewhite;
      }
    }
  }
}
.info-area {
  margin: 20px;
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
img {
  width: 100px;
}
</style>
