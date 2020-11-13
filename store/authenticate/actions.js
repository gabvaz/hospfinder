import Vue from "vue";

export default {
  async AUTHUSER({ commit }, { email, password }) {
    try {
      const response = await this.$axios.post("/login", {
        email,
        password
      });

      Vue.notify({
        group: "success",
        type: "success",
        title: "Login efetuado com sucesso"
      });

      commit("SET_AUTH");
      this.$auth.$storage.setLocalStorage('userLogin', true)
      this.$router.push("/profile")
      console.log("Login sucess");
      console.log(response);

    } catch (err) {
      Vue.notify({
        group: "error",
        type: "error",
        title: "Ops, ocorreu um erro",
        text: "Não foi possível realizar o login"
      });
      console.log(err);
      console.log("erro ao login");
    }
  },
  async LOGOUT({ commit }) {  
    commit("REMOVE_AUTH");
    this.$auth.$storage.setLocalStorage('userLogin', false);
    // this.$auth.$storage.setLocalStorage('FAV', '');
    // this.$auth.$storage.setLocalStorage('REVIEWS', '');
    Vue.notify({
      group: "success",
      type: "success",
      title: "Logout efetuado com sucesso"
    });

    this.$router.push("/");
    console.log("Logout sucess");
},
async REGISTER({ commit }, { email, password }) {
try {
  const response = await this.$axios.post("/register", {
    email,
    password
  });
  commit("SET_AUTH");
  this.$auth.$storage.setLocalStorage('userLogin', true)
  this.$router.push("/")
  console.log(response);
  Vue.notify({
    group: "success",
    type: "success",
    title: "Conta registrada com sucesso"
  });

} catch (err) {
  Vue.notify({
    group: "error",
    type: "error",
    title: "Ops, ocorreu um erro",
    text: "Não foi possível criar a conta"
  });
  console.log(err);
  console.log("erro ao login");
}
}
};
