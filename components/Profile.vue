<template>
  <div>
    <Topbar :url="userAvatar" :name="userName + ' ' + userLastName" />
    <div v-if="acessLocation" class="contentArea">
      <div v-if="locationsLoaded">
          <Map :locationsList="locationsLoaded" :actualLat="lat" :actualLng="lng" />
          <List :locationsList="locationsLoaded" />
      </div>
      <div class="loading" v-else>
        <img src="~/assets/img/spinner.gif" />
        <div>
          Carregando. Isso pode levar alguns minutos.
        </div>
    </div>
    </div>
    <div class="loading" v-else>
        <div>
          A aplicação requer que você forneça a sua localização. 
          Se você tiver habilitado manualente, 
          <a href="/profile" style="color: blue;">clique aqui</a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      userLastName: "",
      userAvatar: "",
      lat: "",
      lng: "",
      acessLocation: false
    };
  },
  methods: {
    async getData() {
      const data = await this.$axios.get("/users/2").then((response) => {
        return {
          userName: response.data.data.first_name,
          userLastName: response.data.data.last_name,
          userAvatar: response.data.data.avatar,
        };
      });
      this.userName = data.userName;
      this.userLastName = data.userLastName;
      this.userAvatar = data.userAvatar;
    },
    async getLocations() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          this.acessLocation = true;
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.$store.dispatch("locations/GETLOCATIONS", {
            userLat: this.lat,
            userLng: this.lng,
          });
        });
      }
    },
  },
  created() {
    this.getData();
    this.getLocations();
  },
  computed: {
    locationsLoaded() {
      return this.$store.getters["locations/geoLocations"];
    }
  },
};
</script>

<style scoped>
.contentArea > div {
    width: 100%;
    display: flex;
}
.loading {
  width: 100%;
  height: calc(100vh - 111px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.loading div {
  text-align: center;
  max-width: 300px;
  margin-top: 1rem;
}
@media(min-width: 768px){
  .sidenav-container{
    display: none;
  }
}
</style>