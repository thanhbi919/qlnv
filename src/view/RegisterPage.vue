<template lang="">
    <div>
        <div>
    <div>
         <label for="username">Username</label>
        <input type="text" name="" v-model = "account.username" >
        {{username}}
    </div>
    <div>
         <label for="password">Password</label>
        <input type="password" name="" v-model = "account.password">
        <div>
             <span v-if = "validatePassword==false">Mat khau toi thieu 6 ki tu</span>
        </div>
        {{password}}
    </div>
    <div>
         <label for="re-password">Re - Password</label>
        <input type="password" name="" v-model = "re_password">
        <div>        <span v-if = "!validateRePassword">Mat khau khong khop </span>
   </div>
        {{password}}
    </div>
     <div>
         <label for="email">Email</label>
        <input type="text" name="" v-model = "account.email" >
        {{username}}
    </div>
    <div>
        <button @click = "handleRegister()">Register</button>
       </div>
    </div>
    </div>
</template>
<script>
import apiAuth from "@/api/apiAuth";
import { mapState, mapActions } from "vuex";

export default {
  name: "RegisterPage",
  data() {
    return {
      account: {
        username: "",
        password: "",
        email: "",
      },
      re_password: "",
    };
  },
  methods: {
    handleRegister() {
      apiAuth.register(this.account).then((response) => {
        console.log(response);
        localStorage.setItem("token", response.access_token);
        this.saveProfile(response.user);
        this.$router.push("/home");
        console.log("hihi");
      });
    },
    hihi() {
      this.$router.getRoutes("/home");
    },
    saveProfile(profile) {
      this.$store.dispatch("saveProfile", profile);
    },
  },
  computed: {
    ...mapActions["deleteStudent"],
    ...mapState["profile"],
    validatePassword() {
      return this.account.password.length >= 6;
    },
    validateRePassword() {
      return this.account.password == this.re_password;
    },
  },
};
</script>
<style lang="">
</style>