<template>
  <div id="app">
    <keep-alive>
      <transition name="router-transition" appear>
        <router-view />
      </transition>
    </keep-alive>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
<script>
export default {
  mounted () {
    this.$Progress.finish()
  },
  created () {
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      }
      this.$Progress.start()
      next()
    })
    this.$router.afterEach((to,from,next) => {
      this.$Progress.finish()
    })
  }
}
</script>
<style lang="less" scoped>
  .router-transition-enter-active {
    transition: all .3s ease
  }

  .router-transition-leave-active {
    transition: all .5s ease
  }

  .router-transition-enter,.router-transition-leave-active {
    -webkit-transform: translateY(20px);
    transform: translateY(20px);
    opacity: 0
  }
</style>>


