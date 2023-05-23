<script>
export default {
  data() {
    return {
      isStarted: false,
      isSpinning: false,
      result: "",
    };
  },
  methods: {
    startGame() {
      this.isStarted = true;
    },
    spinWheel() {
      this.isSpinning = true;
      // 假設有六個獎項
      // const prizes = [
      //   "5折優惠券",
      //   "1折商品券",
      //   "恭喜沒抽重",
      //   "現金100元抵用金",
      //   "消費滿500抵10元現金券",
      //   "消費滿5000抵10元現金券",
      //   "消費滿10000抵10元現金券",
      // ];

      // 定義獎項及對應的權重
      const prizes = [
        { name: "5折優惠券", weight: 2 },
        { name: "1折商品券", weight: 1 },
        { name: "恭喜沒抽中", weight: 80 },
        { name: "現金100元抵用金", weight: 1 },
        { name: "消費滿500抵10元現金券", weight: 1 },
        { name: "消費滿5000抵10元現金券", weight: 10 },
        { name: "消費滿10000抵10元現金券", weight: 30 },
      ];

      // 計算權重總和
      const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);

      // 產生一個隨機數
      const random = Math.random() * totalWeight;

      //根據隨機數選擇獎項;
      let accumulatedWeight = 0;
      for (const prize of prizes) {
        accumulatedWeight += prize.weight;
        if (random <= accumulatedWeight) {
          this.result = prize.name;
          break;
        }
      }
      // 在1秒後停止旋轉
      setTimeout(() => {
        this.isSpinning = false;
      }, 1000);
    },
  },
};
</script>
<template>
  <div id="app">
    <button v-if="!isStarted" @click="startGame">按下按鈕開始</button>
    <div v-else>
      <div v-if="!isSpinning">
        <button @click="spinWheel">抽獎</button>
        <p>{{ result }}</p>
      </div>
      <div v-else>
        <p>正在旋轉...</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
