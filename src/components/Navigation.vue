<template lang="">
    <div class = "nav">
    <div>
        <router-link to="/" v-demo = "{text:'hello'}">Home</router-link>
    </div>
    <div><router-link  to="/login" v-if="!hasProfile.id">
            Đăng nhập
        </router-link>
        <router-link  to="/" v-else  @click = "logout()">
                Đăng xuất
        </router-link>
        </div>
        
    </div>
</template>
<script>
import apiAuth from "@/api/apiAuth";
export default {
  name: "NavigationX",
  methods: {
    logout() {
      this.$store.dispatch("clearProfile");
      apiAuth.logout();
    },
  },
  computed: {
    hasProfile() {
      return this.$store.state.profile;
    },
  },
};
</script>
<style lang="css">
.nav {
  display: flex;
  padding: 60px;
  text-align: center;
  background: #1abc9c;
  color: white;
  font-size: 30px;
  justify-content: space-between;
}

</style>