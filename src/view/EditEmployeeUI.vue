<template lang="">
<div>
    <el-dialog 
    :before-close="closeDialog" 
    v-model="dialogDisplay" title="Employee detail">
        <el-form ref="ruleForm" :rules="rules" :label-position="top" label-width="100px" :model="ruleForm" style="max-width: 460px; margin:auto">
            <el-form-item label="image" prop="avatar" >
                <el-upload action="#" list-type="picture-card" :auto-upload="false"
                :file-list="fileList" 
                 :on-change="toggleUpload" :on-remove="toggleUpload" 
                 :class="{ hideUpload: showUpload }">
                </el-upload>
            </el-form-item>
            <el-form-item label="emp_no" prop="emp_no">
                <el-input type="text" v-model="ruleForm.emp_no" />
            </el-form-item>
            <el-form-item label="first_name" prop="first_name">
                <el-input type="text" v-model="ruleForm.first_name" />
            </el-form-item>
            <el-form-item label="last_name" prop="last_name">
                <el-input type="text" v-model="ruleForm.last_name" />
            </el-form-item>
            <el-form-item label="gender" prop="gender">
                <el-select v-model="ruleForm.gender" placeholder="Select">
                    <el-option value="M">Male</el-option>
                    <el-option value="F">Female</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="salary" prop="salary">
                <el-input type="number" v-model="ruleForm.salary" />
            </el-form-item>
            <el-form-item label="department" prop="department_id">
                <el-select v-model="ruleForm.department_id">
                    <el-option v-for="item in departments" :key="item.id" v-bind:value="item.id">
                        {{ item.name }}
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="title" prop="title_id">
                <el-select v-model="ruleForm.title_id">
                    <el-option v-for="item in titles" :key="item.id" v-bind:value="item.id">
                        {{ item.name }}
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="hire_date" prop="hire_date">
                <el-input type="date" v-model="ruleForm.hire_date" />
            </el-form-item>
            <el-form-item label="birth_date" prop="birth_date">
                <el-input type="date" v-model="ruleForm.birth_date" />
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button v-model="dialogDisplay" @click="closeDialog()">Cancel</el-button>
                <el-button type="primary" v-model="dialogDisplay" @click="submitForm ">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</div>
</template>

<script>
import apiEmployee from "@/api/apiEmployee";

export default {
    created() {
        apiEmployee.getDepartment().then((res) => {
            // console.log("department",res)
            this.departments = res;
        });
        apiEmployee.getTitle().then((res) => {
            // console.log("title",res.data)
            this.titles = res.data;
        });
    },
    props: {
        dialogTableVisible: {
            type: Boolean,
            default: false,
        },
        employee:{
            type:Object,
        },
        addStatus:{
            type:Boolean,
        },
    },
    data() {
        return {
            urlAvatar: [
            ],
            fileList:[],
            showUpload: false,
             formData: new FormData(),
            departments: [],
            titles: [],
            dialogDisplay: false,
            ruleForm: {
                avatar: "",
                emp_no: "",
                first_name: "",
                last_name: "",
                gender: "",
                salary: "",
                department_id: "",
                title_id: "",
                hire_date: "",
                birth_date: "",
            },
            rules: {
                avatar: [
                    { required: true, message: "Please upload an image", trigger: "change" },
                ],
                emp_no: [{
                    required: true,
                    message: "Please input employee number",
                    trigger: "blur",
                }, ],
                first_name: [{
                    required: true,
                    message: "Please input first name",
                    trigger: "blur",
                }, ],
                last_name: [{
                    required: true,
                    message: "Please input last name",
                    trigger: "blur",
                }, ],
                gender: [{
                    required: true,
                    message: "Please input gender",
                }, ],
                salary: [{
                    required: true,
                    message: "Please input salary",
                }, ],
                department_id: [{
                    required: true,
                    message: "Please input department",
                }, ],
                title_id: [{
                    required: true,
                    message: "Please input title",
                }, ],
                hire_date: [{
                    required: true,
                    message: "Please input hire date",
                }, ],
                birth_date: [{
                    required: true,
                    message: "Please input birth date",
                }, ],
            },
        };
    },
    watch: {
        dialogTableVisible(val) {
            this.dialogDisplay = val;
        },
        employee: function (newVal) {
            this.ruleForm = {
                ...newVal
            };
            console.log("watch", this.ruleForm.avatar);
            if (this.ruleForm.avatar)
                this.urlAvatar.url = process.env.VUE_APP_BASE_URL_AVATAR + '/' + this.ruleForm.avatar;
            this.fileList =[{
                url: this.urlAvatar.url
            }];
            this.showUpload = true;
            console.log("watch", this.showUpload);
            console.log("watch", this.urlAvatar);

        },
        addStatus: function (){
            this.ruleForm={}
            this.fileList =[];
        }
    },
    methods: {
        async closeDialog() {
            this.showUpload = false;
            console.log("closeDialog");
            this.$emit("closeDialog");
            
        },
       
        toggleUpload(e) {
            console.log("toggleUpload", this.fileList);
            this.ruleForm.avatar = e.raw;
            this.formData.append("avatar", e.raw);
            console.log(e.raw);
            this.showUpload = !this.showUpload
        },
        submitForm(){
           
            this.formData.append("emp_no", this.ruleForm.emp_no);
            this.formData.append("first_name", this.ruleForm.first_name);
            this.formData.append("last_name", this.ruleForm.last_name);
            this.formData.append("gender",this.ruleForm.gender);
            this.formData.append("salary", this.ruleForm.salary);
            this.formData.append("title_id", this.ruleForm.title_id);
            this.formData.append("department_id", this.ruleForm.department_id);
            this.formData.append("hire_date", this.ruleForm.hire_date);
            this.formData.append("birth_date", this.ruleForm.birth_date);
            console.log(this.ruleForm);
            this.dialogDisplay = false;
            this.$emit("saveEdit", this.formData, this.ruleForm.id);
            
        }
    },

};
</script>

<style lang="css">
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.activeClass {
    display: none;
}

.hideUpload>.el-upload-list>.el-upload--picture-card {
    display: none;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
