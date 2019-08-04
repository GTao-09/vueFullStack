<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  name: 'app',
  // 为了解决vuex刷新丢失问题
  created () {
    if (localStorage.eleToken) {
      const decode = jwtDecode(localStorage.eleToken)
      // token存储到VueX中
      this.$store.dispatch('setAuthenticated', !this.isEmpty(decode))
      this.$store.dispatch('setUser', decode)
    }
  },
  methods: {
    isEmpty (value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
