<template>
  <div class="sidenav-container">
    <div v-if="isSidebar" class="backdrop" @click="hideSidebar"></div>
    <transition name="slide-side">
      <div v-if="isSidebar" class="sidenav">
        <div class="sideNavContent">
          <span @click="hideSidebar"><img src="~/assets/img/close.png"></span>
          <List />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    hideSidebar() {
      this.$store.dispatch("nav/toggleSidebar");
    },
  },
  computed: {
    isSidebar() {
      return this.$store.getters["nav/toggleSidebar"];
    },
  },
};
</script>


<style scoped>
.sidenav-container {
  height: 100%;
  width: 100%;
}
.sidenav {
  height: 100%;
  width: 100%;
  max-width: 100%;
  background-color: #d6d6d6;
  z-index: 1000;
  position: fixed;
  top: 0;
  right: 0;
  box-sizing: border-box;
  overflow-y: scroll;
}
.sideNavContent{
    position: relative;
    height: 100%;
    width: 100%;
}
.sideNavContent img{
  max-width: 15px;
}
.navLinks {
    list-style: none;
    padding: 0;
    transform: translateY(-50%);
    top: 50%;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
}
.singleLink{
    padding: 1rem;
    cursor: pointer;
}
.singleLink:hover{
    text-decoration: underline;
}
.sidenav span {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
.backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
}
.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}
.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(100%);
}
</style>