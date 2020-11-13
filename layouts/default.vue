<template>
  <div>
    <notifications group="success" position="bottom center" />
    <notifications group="error" position="bottom center" />
    <Nuxt />   
  </div>
</template>

<style>
.vue-notification-group {
    z-index: 99999;
}
</style>
