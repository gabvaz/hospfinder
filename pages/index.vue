<template>
  <transition>
    <Form :login="true" :text="loginText" />
  </transition>
</template>

<script> 
export default {
  data(){
    return{
      loginText: 'Faça seu login'
    }
  }
}
</script>