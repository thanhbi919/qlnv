<template lang="">
    <div class = "nav">
        <router-link to="/login" v-if="!hasProfile.id">
            Đăng nhập
        </router-link>
        <router-link  to="/" v-else  @click = "logout()">
                Đăng xuất
        </router-link>
    </div>
</template>
<script>
import apiAuth from '@/api/apiAuth';
export default {
    name: 'NavigationX',
    methods:{
        logout(){
            this.$store.dispatch('clearProfile');
            apiAuth.logout();
        }
    },
    computed: {
        hasProfile() {
            return this.$store.state.profile;
        }
    }
   
}
</script>
<style lang="css">
    .nav{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        background-color: rgb(143, 128, 128);
        width: auto;
        height: 100px;
    }
</style>