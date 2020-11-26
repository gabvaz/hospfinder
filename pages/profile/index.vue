<template>
<div>
  <transition>
    <div v-if="isLogin">
       <Profile />
    </div>
  </transition>
</div>
   

</template>
<script>
export default {
  middleware: 'checkAuth',
  computed:{
    isLogin(){
      return this.$store.getters["authenticate/token"]
    }
  }
};
</script>