import Vue from "vue";

export default {
  async GETLOCATIONS({ commit }, { userLat, userLng }) {
    try {
        const response = await this.$axios.get(
            `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLat.toString()},${userLng.toString()}&radius=25000&type=hospital&key=AIzaSyAZN6B6vvnFIUT7ySIbOVjsOuiCVXtbh6M`
          );
      console.log("SUCESS LOCATIONS")
      commit("SET_LOCATIONS", [...response.data.results]);

    } catch (err) {
      console.log(err);
      console.log("erro ao pegar mapa");
    }
  }
};
