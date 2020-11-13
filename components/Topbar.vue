<template>
  <div>
    <div class="topBar">
      <img src="~/assets/img/find.png" alt="hospital-icon" />
      <div class="welcome">
        <div class="profilePic">
            <img :src="url">
        </div>
        <div class="profileInfo">
          <span class="hello">Olá, {{ name }}</span>
          <Logout />
        </div>   
      </div>
      <div class="drawer-toggle" role="button" @click="$store.dispatch('nav/toggleSidebar')">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Logout from "~/components/Logout.vue";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  },
};
</script>

<style scoped>
.topBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  max-width: 100%;
  background: var(--primary);
}
.welcome {
  color: white;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
}
.drawer-toggle .bar {
  width: 90%;
  height: 2px;
  background-color: white;
}
.drawer-toggle {
  display: flex;
  justify-self: end;
  flex-direction: column;
  justify-content: space-around;
  height: 25px;
  width: 35px;
  cursor: pointer;
}
.profilePic img {
    height: 75px;
    width: 75px;
    border-radius: 50%;
    margin-right: 1rem;
}
.topBar > img {
    max-width: 50px;
    max-width: 75px;
}
@media(min-width: 768px){
  .drawer-toggle{
    display: none;
  }
}
@media(max-width: 767px){
  .topBar > img {
    display: none;
}
}
</style>