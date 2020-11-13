<template>
  <section class="form_login">
    <div class="form_area">
      <div class="form_title" v-if="login">
        <p>Faça seu login</p>
      </div>
      <div class="form_title" v-else>
        <p>Registre sua conta</p>
      </div>
      <div class="form_body">
        <input type="email" placeholder="seu@email.com" v-model="email" />
        <input type="password" placeholder="senha" v-model="password" />
      </div>
        <div class="form_footer" v-if="login">
             <button @click="checkLogin">CONTINUAR</button>
              <nuxtLink to="/registrar">Criar nova conta</nuxtLink>
        </div>
        <div class="form_footer" v-else>
            <button @click="registerLogin">REGISTRAR</button>
            <nuxtLink to="/">Fazer login</nuxtLink>
        </div>  
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      email: "",
      password: "",
      logged: "",
    };
  },
  props:{
    login: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    checkLogin() {
      this.$store.dispatch("authenticate/AUTHUSER", {
        email: this.email,
        password: this.password
      });
    },
    registerLogin(){
      this.$store.dispatch("authenticate/REGISTER", {
        email: this.email,
        password: this.password
      });
    }
  },
};
</script>

<style scoped>
.form_login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
}
.form_area {
  max-width: 30rem;
  padding: 2rem 4rem;
  background-color: #fff;
  color: #000;
  border-radius: 0.5rem;
  box-shadow: 0 0 1.8rem rgba(0, 0, 0, 0.15);
  text-align: center;
}
.form_title p {
  margin-bottom: 2rem;
  font-size: 24px;
  font-weight: 700;
}
.form_body {
  display: flex;
  flex-direction: column;
}
.form_body input {
  border: none;
  padding: 0.1rem;
  margin-bottom: 1rem;
  font-size: 14px;
  border-bottom: 0.1rem dotted #a0a0a0;
  font-weight: 500;
}
.form_body input:focus {
  border-color: var(--primary);
}
.form_login button {
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 1rem 2rem 1.0625rem;
  border-radius: 4px;
  margin: 1.5rem 0;
  font-weight: 500;
  cursor: pointer;
}
.form_login button:hover {
  background-color: var(--colorHover);
  border-color: var(--colorHover);
  color: #fff;
}
.form_footer a {
  color: var(--primary);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
}
.form_footer a:hover {
  color: var(--colorHover);
  text-decoration: underline;
}
.form_footer{
  display: flex;
  flex-direction: column;
}
</style>