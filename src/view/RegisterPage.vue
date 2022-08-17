<template lang="">
<div style="margin-top:100px">
    <el-form ref="ruleForm" :rules="rules" :label-position="top" label-width="100px" :model="ruleForm" style="max-width: 460px; margin:auto">
        <el-form-item label="username" prop="username">
            <el-input type="text" v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="password" prop="password">
            <el-input type="password" v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item label="re_password" prop="re_password">
            <el-input type="password" v-model="ruleForm.re_password" />
        </el-form-item>
        <el-form-item label="email" prop="email">
            <el-input type="email" v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
            <el-button type="danger" @click="submitForm('ruleForm')">Register</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import apiAuth from "@/api/apiAuth";
import {
    mapState
} from "vuex";
import validateRegex from "@/untils/validation";

export default {
    name: "RegisterPage",
    data() {
      var validateRePassword = (rule,value,callback) => {
          if(this.ruleForm.password !== value)
            return callback(Error(rule.message));
             else return callback()
        }
        return {
            account: {
                username: "",
                password: "",
                email: "",
            },
            re_password: "",
            ruleForm: {
                username: "",
                password: "",
                re_password: "",
                email: "",
            },
            rules: {
                username: [{
                    required: true,
                    message: "Please input your name",
                    trigger: "blur"
                }],
                password: [{
                        required: true,
                        message: "Please input your password",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 20,
                        message: "Password length must be between 6 and 20",
                        trigger: "blur"
                    },
                    {
                      validator: validateRegex,
                      message: "Password must contain at least one number, one uppercase letter and one lowercase letter",
                      trigger:"change"
                    }
                    
                ],
                re_password: [{
                        required: true,
                        message: "Please input your re-password ",
                        trigger: "blur",

                    },
                    {
                        validator: validateRePassword,
                        message: "Password and re-password must be the same",
                        trigger:"blur"
                        }
                  
                ],
                email: [{
                        required: true,
                        message: "Please input your email",
                        trigger: "blur",
                    },
                    {
                        type: "email",
                        message: "The input is not valid E-mail",
                        trigger: "blur",
                    }
                ]
            }
        };
    },
    methods: {
     

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!');
            this.account.username = this.ruleForm.username;
            this.account.password = this.ruleForm.password;
            this.account.email = this.ruleForm.email;
            this.handleRegister(this.account);
          } else {
            console.log('error submit!');
            return false;
          }
        });
      },
      resetForm(){
        this.$refs.ruleForm.resetFields();
      },
       async handleRegister(form) {
           await apiAuth.register(form).then((response) => {
                console.log(response);
                this.$router.push("/login");
                console.log("hihi");
            });
        },
  
    },
    computed: {
        ...mapState["profile"],
        validatePassword() {
            return this.account.password.length >= 6;
        },
        
       }
};
</script>

<style lang="">
</style>
