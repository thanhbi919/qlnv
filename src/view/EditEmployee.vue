<template lang="">
<div id="myModal" class="modal" v-bind:style= {display:displayModal}>

  <!-- Modal content -->
  <div class="modal-content" >
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
        <select  id="title" v-model = "editEmployee.gender">
            <option   value="M">Male</option>
            <option value="F">Female</option>
            </select>
    </div>
    <div>   
        <label for="salary">Salary: </label>
        <input type="text" v-model="editEmployee.salary" />
    </div>
    <div>   
            <label for="title">Title:</label>
            <select  id="title" v-model = "editEmployee.title_id ">
            <option v-for="data in titles " :key = "data.id"  v-bind:value="data.id">{{data.name}}</option>
        </select>
    </div>
    <div>   
            <label for="department">Department:</label>
            <select id="department" v-model = "editEmployee.department_id">
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
      <button type="" @click = closeModal()>Close</button>
    <button type="" @click ="save()">Save</button>
    </div>
    

  </div>
  

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
    displayModal: {
      type: String,
      default: "none",
    },
    index: {
      type: Number,
      default: 0,
    },
    employee: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    employee: function (newVal) {
      this.editEmployee = { ...newVal };
    },
  },
  data() {
    return {
      editEmployee: {},
      departments: [],
      titles: [],
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    save() {
      this.$emit("saveEdit", this.editEmployee);
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