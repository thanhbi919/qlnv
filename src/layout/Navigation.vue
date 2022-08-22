<template >
<div class="nav">
    
    <div>
        <router-link to="/login" v-if="!hasProfile">
            Đăng nhập
        </router-link>
        <div class="logout" v-else @click="logout()">
            Đăng xuất
        </div>
    </div>

    <div>
        <router-link to="/home/profile" @click = "updateRole">
           1
        </router-link>
        <router-link  to="/home/profile" :class = "{active1:isActive1}" @click = "updateRole"  >
           2
        </router-link>
        <router-link  :class = "{active1:isActive2}" disabled  :event = "''" to="/home/profile">
           3
        </router-link>
   
    </div>
    <div>
        <h3 v-if="hasProfile">{{getUsername}}</h3>
    </div>

</div>
<router-view></router-view>
</template>

<script>
import apiAuth from "@/api/apiAuth";
import apiEmployee from '@/api/apiEmployee';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Navigation",
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
        updateRole(){
            this.checkRole();            
            this.$store.dispatch("profileStore/updatedRole");
        },
        checkRole(){
            console.log(this.$store.state.profileStore.role);
            if(localStorage.role ==2){
                console.log("2");
                this.isActive1 = false;
            }
            else if(localStorage.role ==3){
                console.log("3");
                this.isActive1 = false;
                this.isActive2 = false;
            }
        },
        getProfile(){
            apiEmployee.getProfile().then(
            response => {
                console.log(response);
                this.$store.dispatch("profileStore/saveProfile", response.data.item);
            }
        );
        }
        
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
.nav {
    display: flex;
    padding: 60px;
    text-align: center;
    background: #1abc9c;
    color: white;
    font-size: 30px;
    justify-content: space-between;

}
.active1{
    pointer-events: none;
    opacity: 0.4;
    color :red;
}
.logout:hover{
  color: red;
  transition: 1s;
}

.selector-for-some-widget {
    box-sizing: content-box;
}
</style>
