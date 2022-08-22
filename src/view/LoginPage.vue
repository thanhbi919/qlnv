<template>

  <div class="login-page" style="margin-top:100px">

    <el-form ref="ruleForm"
             :rules="rules"
             :label-position="top"
             label-width="100px"
             :model="ruleForm"
             style="max-width: 460px; margin:auto">
      <el-form-item label="username" prop="username">
        <el-input v-model="ruleForm.username"/>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password" v-model="ruleForm.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Login</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
        <el-button type="danger" @click="handleRegister()">Register</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import apiAuth from '@/api/apiAuth';

import {
  mapState,
} from "vuex";
import useVuelidate from '@vuelidate/core'

export default {
  name: "LoginPage",
  setup: () => ({v$: useVuelidate()}),

  data() {
    return {

      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
          required: true,
          message: 'Please input your name',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: 'Please input your password',
          trigger: 'blur'
        }]
      }
    }
  },

  methods: {
    submitForm(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          this.handleLogin(this.ruleForm);
        } else {
          console.log('error submit!');
          return false;
        }
      });
    },
    handleLogin(form) {
      apiAuth.login(form).then(
          response => {
            console.log(response);
            localStorage.setItem('token', response.access_token);
            // localStorage.setItem('username',response.user.username);
            // localStorage.setItem('id',response.user.id);
            localStorage.setItem('role', 1);
            this.saveProfile(response.user);
            this.$router.push('/home');
          },
          error => {
            alert(error.message);
          });
    },
    saveProfile(profile) {
      this.$store.dispatch('profileStore/saveProfile', profile);
    },
    handleRegister() {
      console.log('register');
      this.$router.push({name: 'register'});
      console.log(this.$route);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    ...mapState['profile'],
  }
};
</script>

<style lang="css">

</style>
