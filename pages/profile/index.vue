<template>
<div>
    <div v-if="isLogin">
       <Profile />
    </div>
    <div v-else v-show="false">
       usuario deslogado {{isLogin}}
       <NuxtLink to="/">Login</NuxtLink>
    </div>
</div>
   

</template>
<script>
import Profile from '~/components/Profile.vue'
export default {
  data() {
    return {
     isLogin: ''
    };
  },
  methods: {
      handleLogout() {
        this.$store.dispatch("authenticate/LOGOUT");
    },
      async handleLogin(){
        if(this.$auth.$storage.getLocalStorage('userLogin')){
          this.isLogin = true;
        }else{
          this.isLogin = false;
          this.$router.push("/")
        }  
      }
  },
  mounted(){
    this.handleLogin();
  }
};
</script>