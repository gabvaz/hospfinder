<template>
  <div v-if="placesLoad" class="listSide">
    <div class="listHeader">
      <div class="listLogo">
          <img src="~/assets/img/hospital.png" alt="hospital-icon" />
          <div class="listTitle">Hospitais por perto</div>
      </div> 
      <div class="filterLocations">
        <div @click="filterLocations('all')" :class="filterActive ? 'active' : 'notactive'">Todos</div>
        <div @click="filterLocations('fav')" :class="!filterActive ? 'active' : 'notactive'">Favoritos</div>
      </div>
    </div>
    <div class="locationsList" :class="filter">
      <div v-if="favCount <= 0" class="hasFav">Você ainda não tem favoritos :(</div>
      <div
        v-for="location in locations"
        :key="location.place_id + 'loop'"
        class="listItem"
        @click="handleModal(location)"
        :class="userFav.includes(location.place_id) ? 'favorit' : 'any'"
      >
        <ListElement :name="location.name" :location="location.vicinity" />
      </div>
    </div>
    <Modal
      :modalOpen="modal"
      :selectedLocation="selectedLocation"
      @resetModal="handleModal({})"
      @syncFav="checkLocal"
    />
  </div>
</template>

<script>
import ListElement from "~/components/ListElement.vue";
import Modal from "~/components/Modal.vue";
export default {
  data() {
    return {
      selectedLocation: {},
      modal: false,
      placesLoad: false,
      currentLocation: {},
      locationsVisibleOnMap: "",
      userLat: "",
      userLng: "",
      locations: [],
      userFav: [],
      filter: "all",
      filterActive: true
    };
  },
  methods: {
    filterLocations(payload){
        this.filter = payload
        if(payload == "all"){
           this.filterActive = true
        }else{
           this.filterActive = false
        }
    },
    handleModal(location) {
      this.modal = !this.modal;
      this.selectedLocation = location;
    },
    getPlaces() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          this.userLat = position.coords.latitude;
          this.userLng = position.coords.longitude;
          const response = await this.$axios.get(
            `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude.toString()},${position.coords.longitude.toString()}&radius=25000&type=hospital&key=AIzaSyAZN6B6vvnFIUT7ySIbOVjsOuiCVXtbh6M`
          );
          this.locations = [...response.data.results];
          this.placesLoad = true;
        });
      }
    },
    checkLocal() {
      if (this.$auth.$storage.getLocalStorage("FAV")) {
        this.userFav = this.$auth.$storage.getLocalStorage("FAV");
      }
    },
  },
  mounted() {
    this.getPlaces();
    this.checkLocal();
  },
  computed: {
    favCount(){
      return this.userFav.length
    }
  }
};
</script>

<style>
.locationsList {
  display: flex;
  flex-direction: column;
}
.listTitle {
  font-weight: 800;
  font-size: 22px;
  color: #8E8E8E;
}
.listHeader{
  background: white;
  text-align: center;
  padding: 2rem 0;
}
.listItem {
  background: #1212;
  padding: 1rem 1.5rem;
  cursor: pointer;
}
.locationsList .listItem:hover {
  background: var(--colorHover);;
}
.listItem:nth-child(even) {
  background: #1213;
}
.filterLocations {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    color: black;
}
.filterLocations div {
    cursor: pointer;
}
.fav .any{
    display: none;
}
.listItem.favorit{
    background: #01B8BE;
}
.filterLocations .active {
    font-weight: bold;
    position: relative;
}
.filterLocations .active {
    font-weight: bold;
    position: relative;
}
.filterLocations .active:after {
    position: absolute;
    content: '';
    bottom: -5px;
    width: 100%;
    height: 2px;
    left: 0;
    background: #01B8BE;
}
.listLogo {
    display: flex;
    align-items: center;
    justify-content: center;
}
.listLogo img {
    max-width: 35px;
    margin-right: .5rem;
}
.fav .hasFav{
    padding: 1rem 1.5rem;
    font-weight: bold;
    text-align: center;
}
.all .hasFav{
  display: none;
}
</style>