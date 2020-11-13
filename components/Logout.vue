<template>
    <div class="logoutLink">
        <span @click="handleLogout">Sair</span>
    </div>
</template>

<script>
export default {
    methods: {
      handleLogout() {
        this.$store.dispatch("authenticate/LOGOUT");
    }
  }
}
</script>

<style>
.logoutLink{
    font-size: 12px;
    font-weight: 400;
    cursor: pointer;
}
.logoutLink:hover{
    text-decoration: underline;
}
</style>