<template>
    <div class="mapParent">
      <GMap
        ref="gMap"
        :center="{ lat: actualLat, lng: actualLng }"
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
          v-for="location in locationsList"
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
</template>

<script>
export default {
  data() {
    return {
      placesLoad: false,
      currentLocation: {},
      locationsVisibleOnMap: "",
      loading: false
    };
  },
  props: {
    locationsList: {
      type: Array,
      required: true,
    },
    actualLat: {
      required: true,
    },
    actualLng: {
      required: true,
    }
  },
  methods: {
    checkForMarkers() {
      this.locationsList.forEach((location, i) => {
        location.visible = this.$refs.gMap.map
          .getBounds()
          .contains(this.$refs.gMap.markers[i].getPosition());
      });
    }
  }
};
</script>

<style>
.GMap,
.mapParent {
  height: calc(100vh - 111px);
  width: 100%
}
.GMap__Wrapper {
  height: 100%;
}
.GMap__Wrapper,
.GMap__Wrapper > div,
.GMap {
  height: 100% !important;
}
</style>