<template>
  <div>
    <el-dialog
        :before-close="closeDialog"
        v-model="dialogDisplay" title="Employee detail">
      <el-form ref="ruleForm"
               :rules="rules"
               :label-position="top"
               label-width="100px"
               :model="ruleForm"
               style="max-width: 460px; margin:auto">
        <el-form-item label="avatar" prop="avatar">
          <el-upload action="#"
                     list-type="picture-card"
                     :auto-upload="false"
                     :file-list="fileList"
                     :on-change="toggleUpload"
                     :on-remove="removeAvatar"
                     :class="{ hideUpload: showUpload }">
          </el-upload>
        </el-form-item>
        <el-form-item label="images" prop="images">
          <el-upload action="#"
                     list-type="picture-card"
                     :auto-upload="false"
                     :file-list="fileListImagesRaw"
                     :on-change="toggleUploadImage"
                     :on-remove="removeImage"
                     limit="10"
          >
          </el-upload>
        </el-form-item>

        <el-form-item label="emp_no" prop="emp_no">
          <el-input type="text" v-model="ruleForm.emp_no"/>
        </el-form-item>
        <el-form-item label="first_name" prop="first_name">
          <el-input type="text" v-model="ruleForm.first_name"/>
        </el-form-item>
        <el-form-item label="last_name" prop="last_name">
          <el-input type="text" v-model="ruleForm.last_name"/>
        </el-form-item>
        <el-form-item label="gender" prop="gender">
          <el-select v-model="ruleForm.gender" placeholder="Select">
            <el-option label="Male" value="M">Male</el-option>
            <el-option label="Male" value="F">Female</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="salary" prop="salary">
          <el-input type="number" v-model="ruleForm.salary"/>
        </el-form-item>
        <el-form-item label="department" prop="department_id">
          <el-select v-model="ruleForm.department_id">
            <el-option :label="item.name" v-for="item in departments" :key="item.id" v-bind:value="item.id">
              {{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="title" prop="title_id">
          <el-select v-model="ruleForm.title_id">
            <el-option :label="item.name" v-for="item in titles" :key="item.id" v-bind:value="item.id">
              {{ item.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="hire_date" prop="hire_date">
          <el-date-picker type="date" v-model="ruleForm.hire_date"/>
        </el-form-item>
        <el-form-item label="birth_date" prop="birth_date">
          <el-date-picker type="date" v-model="ruleForm.birth_date"/>
        </el-form-item>

      </el-form>
      <template #footer>
            <span class="dialog-footer">
                <el-button v-model="dialogDisplay" @click="closeDialog()">Cancel</el-button>
                <el-button type="primary" v-model="dialogDisplay" @click="submitForm()">Confirm</el-button>
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
      this.departments = res;
    });
    apiEmployee.getTitle().then((res) => {
      this.titles = res.data;
    });
  },
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false,
    },
    employee: {
      type: Object,
    },
    addStatus: {
      type: Boolean,
    },
  },
  data() {
    return {
      fileListImageBefore: [],
      fileListImagesRaw: [],
      fileListImage: [],
      urlAvatar: [],
      listUrlImage: [],
      fileList: [],
      fileAvatar: "",
      showUpload: false,
      formData: new FormData(),
      departments: [],
      titles: [],
      dialogDisplay: false,
      ruleForm: {
        avatar: "",
        images: "",
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
        images: [{
          required: false
        }],
        avatar: [
          {
            required: true,
            message: "Please upload an avatar",
            trigger: "change",
          },
        ],
        emp_no: [
          {
            required: true,
            message: "Please input employee number",
            trigger: "blur",
          },
        ],
        first_name: [
          {
            required: true,
            message: "Please input first name",
            trigger: "blur",
          },
        ],
        last_name: [
          {
            required: true,
            message: "Please input last name",
            trigger: "blur",
          },
        ],
        gender: [
          {
            required: true,
            message: "Please input gender",
          },
        ],
        salary: [
          {
            required: true,
            message: "Please input salary",
          },
        ],
        department_id: [
          {
            required: true,
            message: "Please input department",
          },
        ],
        title_id: [
          {
            required: true,
            message: "Please input title",
          },
        ],
        hire_date: [
          {
            required: true,
            message: "Please input hire date",
          },
        ],
        birth_date: [
          {
            required: true,
            message: "Please input birth date",
          },
        ],
      },
    };
  },
  computed: {
    ruleFormComputed: {
      get() {
        return this.employee;
      },
      set(val) {
        return val;
      },
    },
  },
  watch: {
    dialogTableVisible(val) {
      this.dialogDisplay = val;
    },
    employee: function (newVal) {
      this.ruleForm = {
        ...newVal,
      };
      console.log("watch1", this.ruleForm.avatar);
      this.getUrlAvatar();
      this.getUrlImage();
      this.showUpload = true;
      console.log("watch2", this.showUpload);
      console.log("watch3", this.urlAvatar.url);
    },
    addStatus: function () {
      this.ruleForm = {};
      this.fileList = [];
    },
  },

  methods: {
    closeDialog() {
      this.showUpload = false;
      console.log("closeDialog");
      this.$emit("closeDialog");
      this.deleteUrlImage();
    },
    getUrlAvatar() {
      if (this.ruleForm.avatar)
        this.urlAvatar.url =
            process.env.VUE_APP_BASE_URL_AVATAR + "/" + this.ruleForm.avatar;
      this.fileList = [
        {
          url: this.urlAvatar.url,
        },
      ];
    },
    getUrlImage() {
      let countImage = this.ruleForm.images;
      console.log("images: ", countImage)
      if (countImage) {
        for (let i = 0; i < countImage.length; i++) {
          console.log("saiiiii:", this.fileListImagesRaw[i])
          this.fileListImagesRaw[i] =
              {
                url: process.env.VUE_APP_BASE_URL_AVATAR + "/" + countImage[i]
              }
        }
      }
      console.log("list Image: ", this.fileListImagesRaw);
    },
    removeAvatar() {
      console.log("removeAvatar");
      this.fileList = [];
      this.showUpload = false;
    },
    removeImage(e) {
      console.log("removeImage");
      console.log(e)
      console.log("truoc khi remove: ", this.fileListImageBefore);
      console.log("truoc khi remove: ", this.fileListImage);
      if (e.raw) {
        this.fileListImageBefore = this.fileListImageBefore.filter(
            (file) => {
              return (file != e.raw);
            }
        )
      } else {
        this.fileListImage = this.fileListImage.filter(
            (file) => {
              console.log("file:", e.url, 'file :', file)
              return true
            }
        )
      }
      console.log("sau khi remove: ", this.fileListImageBefore);
      console.log("sau khi remove: ", this.fileListImagesRaw);

    }
    ,
    toggleUpload(e) {
      console.log("toggleUpload", this.fileList);
      this.ruleForm.avatar = e.raw;
      console.log(e.raw);
      console.log("avatar:", this.ruleForm.avatar);
      this.showUpload = !this.showUpload;
    },
    toggleUploadImage(e) {
      this.fileListImageBefore.push(e.raw);
      // console.log("list image raw:", this.fileListImagesRaw.split());
    },
    deleteUrlImage() {
      console.log("zo day de xoa")
      this.fileListImage = [];
      this.fileListImagesRaw = [];
      this.listUrlImage = [];
      this.fileListImageBefore = [];
    }
    ,
    splitUrlImage() {
      // console.log("split: ",this.fileListImagesRaw)
      for (let i = 0; i < this.fileListImagesRaw.length; i++) {
        if (!this.fileListImagesRaw[i].raw) {
          console.log("split: ", this.fileListImagesRaw[i])
          let fileImage = this.fileListImagesRaw[i].url.split('/')[4];
          this.fileListImage.push(fileImage);
        }
      }
    },
    async getListImage(fileListImageBefore) {
      let x = new FormData();
      console.log("getListImage truoc khi gui", fileListImageBefore);
      let i = 0;
      for (i = 0; i < fileListImageBefore.length; i++) {
        x.append("image", fileListImageBefore[i])
        await apiEmployee.addListImages(x).then(
            (res) => {
              console.log("res: ", res)
              this.fileListImage.push(res.image)
            }
        )
      }
      console.log("list image: ", this.fileListImage);
    }
    ,
    async submitForm() {
      let formData = new FormData();
      console.log("ruleForm:", this.ruleForm.emp_no)
      this.$refs["ruleForm"].validate(
          async (valid) => {
            console.log("valid = ", valid)
            // let image = [];
            if (valid) {
              this.fileListImage = [];
              this.splitUrlImage();
              await this.getListImage(this.fileListImageBefore);
              formData.append("emp_no", this.ruleForm.emp_no);
              formData.append("first_name", this.ruleForm.first_name);
              formData.append("last_name", this.ruleForm.last_name);
              formData.append("gender", this.ruleForm.gender);
              formData.append("salary", this.ruleForm.salary);
              formData.append("title_id", this.ruleForm.title_id);
              formData.append("department_id", this.ruleForm.department_id);
              formData.append("hire_date", this.ruleForm.hire_date);
              formData.append("birth_date", this.ruleForm.birth_date);
              formData.append("avatar", this.ruleForm.avatar);

              console.log("fileList truoc khi gui: ", this.fileListImage)
              for (var i = 0; i < this.fileListImage.length; i++) {
                console.log("day la vong for");
                formData.append("images[]", this.fileListImage[i])
              }
              for (let [name, value] of formData) {
                console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
              }
              console.log("form len :", this.fileListImage);
              this.$emit("update:employee", formData);
              this.$emit("saveEdit", this.ruleForm.id);
              this.$emit("closeDialog");
              for (let [name, value] of formData) {
                console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
              }
              this.deleteUrlImage();
            } else {
              alert("you chua dien du thong tin")


              // console.log("filelist: ",this.fileListImage);
            }
          })
      console.log("this: ", this.fileListImage)


    },
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

.hideUpload > .el-upload-list > .el-upload--picture-card {
  display: none;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
