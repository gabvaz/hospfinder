<template>
  <div class="mainbox">
    <div class="err">404</div>
    <div class="msg">
      A página que você está procurando não existe :(
      <p>Que tal ir até a nossa <nuxtLink to="/">home</nuxtLink>?</p>
    </div>
  </div>
</template>

<style>
.mainbox {
  background-color: #288a8d;
  margin: auto;
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.err {
  color: #ffffff;
  font-size: 8rem;
}

.msg {
  text-align: center;
  font-size: 1.2rem;
}

a {
  text-decoration: none;
  color: white;
}

a:hover {
  text-decoration: underline;
}
</style>