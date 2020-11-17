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
      >
        <GMapInfoWindow :options="{ maxWidth: 300 }">
          <b>{{ location.name }}</b>
          <br />
          {{ location.vicinity }}
          <br />
          <button class="mapModal" @click="$store.dispatch('nav/toggleModal', location)">Ver mais</button>
        </GMapInfoWindow>
      </GMapMarker>
    </GMap>
  </div>
</template>

<script>
export default {
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
    },
  },
  methods: {
    checkForMarkers() {
      this.locationsList.forEach((location, i) => {
        location.visible = this.$refs.gMap.map
          .getBounds()
          .contains(this.$refs.gMap.markers[i].getPosition());
      });
    },
  },
};
</script>

<style>
.GMap,
.mapParent {
  height: calc(100vh - 111px);
  width: 100%;
}
.GMap__Wrapper {
  height: 100%;
}
.GMap__Wrapper,
.GMap__Wrapper > div,
.GMap {
  height: 100% !important;
}
.mapModal {
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 0.5rem 1rem 0.5625rem;
  border-radius: 4px;
  margin: 1rem 0;
  font-weight: 500;
  cursor: pointer;
  max-width: 150px;
  background: transparent;
}
</style>