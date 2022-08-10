<template lang="">
<div id="myModal" class="modal" v-bind:style={display:displayModal}>

    <!-- Modal content -->
    <div class="modal-content">
        <div class="mb-3" v-if="!url">
            <label for="formFile" class="form-label">Upload Image:</label>
            <div>
                <input class="form-control" @change="selectImage($event)" type="file" @input="pickFile">
            </div>

        </div>
        <div class=" image" v-if="url">
            <button class="close-button" aria-label="Close alert" type="button" @click=deleteImage() data-close>
                <span aria-hidden="true">&times;</span>
            </button>
            <img :src="url" alt="" style="width:100px">
        </div>
        <div>
            <label for="emp_no">Emp_no: </label>
            <input type="number" v-model="editEmployee.emp_no" />
        </div>
        <div>
            <label for="first_name">First name: </label>
            <input type="text" v-model="editEmployee.first_name" />
        </div>
        <div>
            <label for="last_name">Last name: </label>
            <input type="text" v-model="editEmployee.last_name" />
        </div>
        <div>
            <label for="gender">Gender: </label>
            <select id="title" v-model="editEmployee.gender">
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>
        </div>
        <div>
            <label for="salary">Salary: </label>
            <input type="text" v-model="editEmployee.salary" />
        </div>
        <div>
            <label for="title">Title:</label>
            <select id="title" v-model="editEmployee.title_id ">
                <option v-for="data in titles " :key="data.id" v-bind:value="data.id">{{data.name}}</option>
            </select>
        </div>
        <div>
            <label for="department">Department:</label>
            <select id="department" v-model="editEmployee.department_id">
                <option v-for="data in departments" :key="data.id" v-bind:value="data.id">{{data.name}}</option>
            </select>
        </div>
        <div>
            <label for="hire_date">Hire Date: </label>
            <input type="date" v-model="editEmployee.hire_date" />
        </div>
        <div>
            <label for="birth_date">Birthday: </label>
            <input type="date" v-model="editEmployee.birth_date" />
        </div>
        <div style="display:flex margin:auto">
            <button type="" @click=closeModal()>Close</button>
            <button type="" @click="save()">Save</button>
        </div>

    </div>

</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
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
        console.log("avatar: ", this.editEmployee.avatar)
        // this.url = this.editEmployee.avatar;
    },
    props: {

        displayModal: {
            type: String,
            default: "none",
        },
        employee: {
            type: Object,
            default: () => {},
        },
    },
    watch: {
        employee: function (newVal) {
            this.editEmployee = {
                ...newVal
            };
            console.log("watch", this.editEmployee.avatar);
            if (this.editEmployee.avatar)
                this.url = process.env.VUE_APP_BASE_URL_AVATAR + '/' + this.editEmployee.avatar;
            console.log("watch", this.url);

        },
    },
    data() {
        return {
            editEmployee: {},
            departments: [],
            titles: [],
            formData: new FormData(),
            url: null
        };
    },
    methods: {
        closeModal() {
            this.$emit("closeModal");
        },
        deleteImage() {
            this.url = null;
        },
        save() {
            this.formData.append("emp_no", this.editEmployee.emp_no);
            this.formData.append("first_name", this.editEmployee.first_name);
            this.formData.append("last_name", this.editEmployee.last_name);
            this.formData.append("gender", this.editEmployee.gender);
            this.formData.append("salary", this.editEmployee.salary);
            this.formData.append("title_id", this.editEmployee.title_id);
            this.formData.append("department_id", this.editEmployee.department_id);
            this.formData.append("hire_date", this.editEmployee.hire_date);
            this.formData.append("birth_date", this.editEmployee.birth_date);
            this.formData.append("avatar", this.editEmployee.avatar);

            this.$emit("saveEdit", this.formData, this.editEmployee.id);
            console.log("save", this.editEmployee);
            console.log("formData: ", this.formData);
        },
        selectImage(event) {
            console.log("selectImage", event);
            // var preview = document.getElementById("preview");
            this.url = URL.createObjectURL(event.target.files[0]);
            console.log(this.url);
            this.editEmployee.avatar = event.target.files[0];
            console.log("selectImage", event.target.files[0]);
        },
    },
};
</script>

<style lang="css">
/* The Modal (background) */
.modal {
    /* display: none; Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 99;
    /* Sit on top */
    padding-top: 100px;
    /* Location of the box */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
    /* Black w/ opacity */
}

.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

/* The Close Button */
.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}
</style>
