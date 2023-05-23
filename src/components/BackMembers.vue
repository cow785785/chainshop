<script>
export default {
  data() {
    return {
      isCheck: false,
      members: [], // 新增一個用於存儲會員資料的數據屬性
      showModal: false, // 叫出畫面
      editedMember: null,
      updatedMember: {
        useraccount: "",
        password: "",
        username: "",
        birthDate: "",
        address: "",
        phone: "",
      },
    };
  },
  methods: {
    select() {
      this.isCheck = true;
      fetch("http://localhost:8080/readMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          this.members = data; // 將獲得的資料賦值給 members 屬性
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openModal(member) {
      this.editedMember = member;
      this.updatedMember = {
        useraccount: member.useraccount,
        password: member.password,
        username: member.username,
        birthDate: member.birthDate,
        address: member.address,
        phone: member.phone,
      };
      this.showModal = true;
    },
    updateMember() {
      const body = {
        useraccount: this.editedMember.useraccount,
        password: this.editedMember.password,
        username: this.editedMember.username,
        birthDate: this.editedMember.birthDate, // 轉換換為字串格式
        address: this.editedMember.address,
        phone: this.editedMember.phone,
      };
      fetch("http://localhost:8080/updateMember", {
        body: JSON.stringify(body),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(this.editedMember),
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

    confirmDelete(member) {
      // 彈出刪除確認彈窗
      if (confirm("確定要刪除該會員嗎？")) {
        // 用戶確認刪除，調用 deleteMember 方法執行刪除操作
        this.deleteMember(member);
      }
    },
    deleteMember(member) {
      fetch("http://localhost:8080/deleteMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useraccount: member.useraccount,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.select(); // 更新會員列表
          // 根據 API 的返回結果進行相應的處理
          // 例如更新列表數據或顯示提示信息等
        })
        .catch((error) => {
          console.error(error);
        });
      // location.reload();
    },
  },
};
</script>
<template>
  <div class="all-area">
    <h2>會員帳戶管理</h2>
    <div class="info-area">
      <input type="text" name="memberinfo" id="memberinfo" />
      <button type="button" @click="select" class="myButton">
        顯示全部會員資料
      </button>
      <!-- 找出全部資料 -->
    </div>
    <div class="member-list">
      <div v-if="isCheck" class="table-container">
        <table>
          <tr>
            <th>ID</th>
            <th>User Account</th>
            <th>Password</th>
            <th>Username</th>
            <th>Birth Date</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Registration Time</th>
            <th>修改</th>
            <th>刪除</th>
          </tr>
          <tbody id="data-body">
            <tr v-for="member in members" :key="member.id">
              <td>{{ member.id }}</td>
              <td>{{ member.useraccount }}</td>
              <td>{{ member.password }}</td>
              <td>{{ member.username }}</td>
              <td>{{ member.birthDate }}</td>
              <td>{{ member.address }}</td>
              <td>{{ member.phone }}</td>
              <td>{{ member.registrationTime }}</td>
              <td>
                <button @click="openModal(member)">修改</button>
              </td>
              <td>
                <button @click="confirmDelete(member)">刪除</button>
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
        <h3>修改會員資料</h3>
        <form @submit.prevent="updateMember">
          <label for="userAccount">User Account:</label>
          <input
            type="text"
            id="userAccount"
            v-model="editedMember.useraccount"
            required
          />

          <label for="password">Password:</label>
          <input
            type="text"
            id="password"
            v-model="editedMember.password"
            required
          />

          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            v-model="editedMember.username"
            required
          />

          <label for="birthDate">BirthDate:</label>
          <input
            type="date"
            id="birthDate"
            v-model="editedMember.birthDate"
            placeholder="xxxx-xx-xx"
            required
          />

          <label for="address">Address:</label>
          <input
            type="text"
            id="address"
            v-model="editedMember.address"
            required
          />

          <label for="phone">Phone:</label>
          <input type="tel" id="phone" v-model="editedMember.phone" required />

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
  table {
    margin-top: 80px;
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
</style>
