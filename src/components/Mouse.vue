<script>
export default {
  name: "MyComponent",
  mounted() {
    document.addEventListener("mousemove", this.divFlying);
  },
  methods: {
    divFlying(event) {
      var div = document.getElementById("dv1");
      if (!div) {
        return;
      }
      var intX = event.clientX;
      var intY = event.clientY;
      div.style.left = intX + "px";
      div.style.top = intY + "px";
    },
  },
};
</script>
<template>
  <div id="dv1" style="position: absolute">
    <img src="../../public/img/pig.jpg" /><br />
    小豬豬出沒~~
  </div>
</template>
<style lang="scss" scoped>
img {
  width: 30px;
  height: 30px;
}
</style>
