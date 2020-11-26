<template>
  <transition>
    <Form :login="false" :text="loginText" />
  </transition>
</template>

<script> 
export default {
  data(){
    return{
      loginText: 'Registrar'
    }
  }
}
</script>