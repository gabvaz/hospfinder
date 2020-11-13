<template>
  <div>
    <div v-if="placesLoad" class="mapParent">
      <GMap
        ref="gMap"
        :center="{ lat: userLat, lng: userLng }"
        :options="{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: true,
          gestureHandling: 'cooperative',
        }"
        :zoom="12"
        @bounds_changed="checkForMarkers"
      >
        <GMapMarker
          v-for="location in locations"
          :key="location.id"
          :position="{
            lat: location.geometry.location.lat,
            lng: location.geometry.location.lng,
          }"
          @click="currentLocation = location"
        >
          <GMapInfoWindow :options="{ maxWidth: 200 }">
            <b>{{ location.name }}</b>
            <br />
            <code> {{ location.vicinity }}. </code>
          </GMapInfoWindow>
        </GMapMarker>
      </GMap>
    </div>
    <div v-else class="requireAcess">
      <div v-if="loading">
            Quase tudo pronto, só mais uns segundos
      </div>
      <div v-else>
           Por favor,  permita que sua localização seja compartilhada. Se você já tiver permitido <a style="color:blue;" href="/profile" replace>clique aqui.</a>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      placesLoad: false,
      currentLocation: {},
      locationsVisibleOnMap: "",
      userLat: "",
      userLng: "",
      locations: [],
      loading: false
    };
  },

  methods: {
    checkForMarkers() {
      this.locations.forEach((location, i) => {
        location.visible = this.$refs.gMap.map
          .getBounds()
          .contains(this.$refs.gMap.markers[i].getPosition());
      });
    },

    getPlaces() {    
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          this.loading = true;
          this.userLat = position.coords.latitude;
          this.userLng = position.coords.longitude;
          const response = await this.$axios.get(
            `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude.toString()},${position.coords.longitude.toString()}&radius=25000&type=hospital&key=AIzaSyAZN6B6vvnFIUT7ySIbOVjsOuiCVXtbh6M`
          );
          this.locations = [...response.data.results];
          this.placesLoad = true;
          console.log("----------");
          console.log(response);
          console.log("----------");
        });
      }
    },
  },
  mounted() {
    this.getPlaces();
  }
};
</script>

<style>
.GMap,
.mapParent {
  height: 100%;
}
.GMap__Wrapper {
  height: 100%;
}
.requireAcess {
  position: absolute;
  top: 50%;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: 300px;
  text-align: center;
}
</style>