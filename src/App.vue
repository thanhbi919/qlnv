<template>
  <!-- <Navigation></Navigation> -->
  <router-view> </router-view>
</template>
<script>
// import Navigation from "./layout/Navigation.vue";
export default {
  name: "App",
  components: {
    // Navigation,
  },
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
.selector-for-some-widget {
  box-sizing: content-box;
}
.paginate1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

}

</style>
