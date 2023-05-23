<script>
// import roundTurntable from "../components/roundTurntable.vue";
export default {
  data() {
    return {
      // 轉盤上的獎品資料
      prizeData: [
        {
          id: 1,
          prizeName: "2000元京東券",
          prizeImg:
            "http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/1.png",
        },
        {
          id: 2,
          prizeName: "300元京東券",
          prizeImg:
            "http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/7.png",
        },
        {
          id: 3,
          prizeName: "50個位元幣",
          prizeImg:
            "http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/3.png",
        },
        {
          id: 4,
          prizeName: "50元話費券",
          prizeImg:
            "http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/4.png",
        },
        {
          id: 5,
          prizeName: "100元話費券",
          prizeImg:
            "http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/5.png",
        },
        {
          id: 6,
          prizeName: "100個位元幣",
          prizeImg:
            "http://demo.sc.chinaz.net/Files/DownLoad/webjs1/201803/jiaoben5789/images/6.png",
        },
      ],
      // 轉動的圈數
      rotateCircle: 6,
      // 轉動需要持續的時間（s）
      duringTime: 4.5,
      // 轉盤樣式的選項
      turntableStyleOption: {
        // 背景色
        prizeBgColors: [
          "#AE3EFF",
          "#4D3FFF",
          "#FC262C",
          "#3A8BFF",
          "#EE7602",
          "#FE339F",
        ],
        // 轉盤的外邊框顏色
        borderColor: "#199301",
      },
    };
  },
  methods: {
    // 已經轉動完轉盤觸發的函數
    endRotation() {
      // 提示中獎
      alert(
        `恭喜您獲獎啦,您的獎品是：${this.prizeData[this.prizeIndex].prizeName}`
      );
    },
  },
};
</script>
<template>
  <round-turntable
    ref="roundTurntable"
    :prizeData="prizeData"
    :rotateCircle="rotateCircle"
    :duringTime="duringTime"
    :turntableStyleOption="turntableStyleOption"
    @endRotation="endRotation"
    class="turntable"
  >
    <template slot="item" slot-scope="scope">
      <p class="turntable-name">{{ scope.item.prizeName }}</p>
      <p class="turntable-img">
        <img :src="scope.item.prizeImg" />
      </p>
    </template>
  </round-turntable>
</template>
<style lang="scss" scoped>
.turntable {
  position: absolute;
  left: calc(50% - 200px);
  top: calc(50% - 200px);
  width: 400px;
  height: 400px;
}
.turntable-name {
  /*background: pink;*/
  position: absolute;
  left: 10px;
  top: 20px;
  width: calc(100% - 20px);
  font-size: 26px;
  text-align: center;
  color: #fff;
}
.turntable-img {
  position: absolute;
  /*要居中就要50% - 寬度 / 2*/
  left: calc(50% - 80px / 2);
  top: 60px;
  width: 80px;
  height: 80px;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>
