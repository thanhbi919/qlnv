<template>
  <div class="header">
    <div class = "header-item">
      <h3 v-if="hasProfile">{{ getUsername }}</h3>
    </div>
    <div class = "header-item" >
      abc
    </div>
    <div class = "header-item">
      xyz
    </div>
    <div class = "header-item">
      <router-link to="/login" v-if="!hasProfile">
        Đăng nhập
      </router-link>
      <div class="logout" v-else @click="logout()">
        Đăng xuất
      </div>
    </div>
    <div  class="menu-header-dropdown" @click = "showMenuHeaderDropdown">
      <div  style="display: flex; justify-content: right; height: 100%">
        <el-icon style="height: 100%"><Menu style="height: 100%" /></el-icon>
      </div>
      <div ref="menu_header_dropdown_item1" class="menu-header-dropdown-item">
       <p>abc</p>
      </div>
      <div ref="menu_header_dropdown_item2" class="menu-header-dropdown-item">
        <p>abc</p>
      </div>
      <div ref="menu_header_dropdown_item3" class="menu-header-dropdown-item">
        <p>abc</p>
      </div>
    </div>
  </div>


</template>

<script>
import apiAuth from "@/api/apiAuth";
import apiEmployee from '@/api/apiEmployee';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  data() {
    return {
      isActive1: true,
      isActive2: true,
    }
  },
  async created() {
    await this.getProfile();
    this.checkRole();

  },
  methods: {
    async logout() {
      await localStorage.clear();
      apiAuth.logout().then(() => {

        this.$router.push("/login");
      });

      this.$store.dispatch("profileStore/clearProfile");

    },
    updateRole() {
      this.checkRole();
      this.$store.dispatch("profileStore/updatedRole");
    },
    checkRole() {
      console.log(this.$store.state.profileStore.role);
      if (localStorage.role == 2) {
        console.log("2");
        this.isActive1 = false;
      } else if (localStorage.role == 3) {
        console.log("3");
        this.isActive1 = false;
        this.isActive2 = false;
      }
    },
    getProfile() {
      apiEmployee.getProfile().then(
          response => {
            console.log(response);
            this.$store.dispatch("profileStore/saveProfile", response.data.item);
          }
      );
    },
    showMenuHeaderDropdown() {
      var isDisplay1 = this.$refs.menu_header_dropdown_item1.style.display;
      var isDisplay2 = this.$refs.menu_header_dropdown_item1.style.display
      var isDisplay3 = this.$refs.menu_header_dropdown_item1.style.display

      this.$refs.menu_header_dropdown_item1.style.display = isDisplay1=== 'none' ? 'block' : 'none';
      this.$refs.menu_header_dropdown_item2.style.display = isDisplay2=== 'none' ? 'block' : 'none';
      this.$refs.menu_header_dropdown_item3.style.display = isDisplay3=== 'none' ? 'block' : 'none';

    },
  },
  computed: {
    hasProfile() {
      return localStorage.getItem("token");
    },
    getUsername() {
      return this.$store.state.profileStore.profile.username;
    }
  },
};
</script>

<style lang="css">
.header {
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  background:#444791;
  /*color: white;*/
  font-size: 30px;
  justify-content: space-between;

}

.active1 {
  pointer-events: none;
  opacity: 0.4;
  color: red;
}

.logout:hover {
  color: red;
  transition: 1s;
}

.selector-for-some-widget {
  box-sizing: content-box;
}
@media screen and (min-width: 360px) {
  .header{
    justify-content: right;
  }
  .menu-header-dropdown{
    /*margin-top:5% ;*/
    position: relative;
    display: inline-block;
    transition: color 1s;
  }




  .menu-header-dropdown-item{
    display: none;
    /*position: absolute;*/
    background-color: #DADAE9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
  }
  .header-item{
    display: none;
  }
}
@media screen and (min-width: 700px) {
  .menu-header-dropdown{
    display: none;
  }
  .header{
    justify-content: space-between;
  }
  .header-item{
    display: inline-block;
  }
}
</style>
