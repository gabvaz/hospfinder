<template>
  <div>
    <Topbar :url="userAvatar" :name="userName + ' ' + userLastName" />
    <TheSideNav />
    <div class="contentArea">
      <div class="mapArea">
        <Map />
      </div>
      <div class="listArea">
        <List />
      </div>
    </div>
  </div>
</template>

<script>
import Topbar from "~/components/Topbar.vue";
import TheSideNav from "~/components/TheSideNav.vue";
import Map from "~/components/Map.vue";
import List from "~/components/List.vue";

export default {
  data() {
    return {
      userEmail: "",
      userName: "",
      userLastName: "",
      userAvatar: "",
    };
  },
  methods: {
    async getData() {
      const data = await this.$axios.get("/users/2").then((response) => {
        return {
          userEmail: response.data.data.email,
          userName: response.data.data.first_name,
          userLastName: response.data.data.last_name,
          userAvatar: response.data.data.avatar,
        };
      });
      this.userEmail = data.userEmail;
      this.userName = data.userName;
      this.userLastName = data.userLastName;
      this.userAvatar = data.userAvatar;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
.contentArea{
  display: flex;
}
.mapArea {
  width: 100%;
  height: calc(100vh - 111px);
}
.mapArea > div{
  height: calc(100%);
}
.listArea{
  height: calc(100vh - 111px);
  overflow-y: scroll;
  width: 40%;
}
.GMap__Wrapper, .GMap__Wrapper > div, .GMap {
    height: 100% !important;
}

@media(max-width: 767px){
  .listArea{
    display: none;
  }
}
</style>