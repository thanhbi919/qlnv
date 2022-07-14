<template lang="">
    <div>
    <div>
         <label for="username">Username</label>
        <input type="text" name="" v-model = "account.username" >
        {{username }}
      </div>
      <div>
           <label for="password">Password</label>
          <input type="password" name="" v-model = "account.password">
          {{
    password
  }}
      </div>
      <div>
      <router-link to="/register">Register</router-link>
          <button @click = "handleLogin()">Login</button>
         </div>
      </div>


</template>
<script>
import apiAuth from '@/api/apiAuth';
import {mapState, mapActions} from "vuex";

export default {
  name: "LoginPage",
  data() {
    return {
      account: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    handleLogin() {
      apiAuth.login(this.account).then(response => {
        console.log(response);
        localStorage.setItem('token', response.access_token);
        this.saveProfile(response.user);
        this.$router.push('/Employee');
      });
    },
    saveProfile(profile) {
      this.$store.dispatch('saveProfile', profile);
    }
  },
  computed: {
    ...mapActions["deleteStudent"],
    ...mapState['profile'],
  }
};
</script>
<style lang="">

</style>