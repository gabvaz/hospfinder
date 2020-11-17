<template>
  <div class="listSide" :class="isOpen">
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
        v-for="location in locationsList"
        :key="location.place_id + 'loop'"
        class="listItem"
        @click="handleModal(location)"
        :class="userFav.includes(location.place_id) ? 'favorit' : 'any'"
      >
        <ListElement :name="location.name" :location="location.vicinity" />
      </div>
    </div>
    <Modal
      @syncFav="checkLocal"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      locations: this.locationsList,
      userFav: [],
      filter: "all",
      filterActive: true
    };
  },
  props: {
    locationsList: {
      type: Array,
      required: true,
    },
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
      this.$store.dispatch('nav/toggleModal', location);
    },
    checkLocal() {
      if (this.$auth.$storage.getLocalStorage("FAV")) {
        this.userFav = this.$auth.$storage.getLocalStorage("FAV");
      }
    },
  },
  mounted() {
    this.checkLocal();
  },
  computed: {
    favCount(){
      return this.userFav.length
    },
    isOpen() {
      return this.$store.getters["nav/toggleSidebar"];
    }
  }
};
</script>

<style>
@media (max-width: 767px) {
  div.listSide{
    width: 100%;
    position: absolute;
    left: 0;
  }
  .listSide.open{
    transform: translateX(0%);
  }
  .listSide.closed{
    transform: translateX(-100%);
  }
}
.listSide {
  height: calc(100vh - 111px);
  overflow-y: scroll;
  width: 40%;
  background: white;
}
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