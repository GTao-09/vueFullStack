<template>
  <div class="index">
    <headnav />
    <leftMenu />
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import headnav from '../components/headnav.vue'
import leftMenu from '../components/leftMenu.vue'
export default {
  components: {
    headnav,
    leftMenu
  }
}
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: hidden;
}
</style>
