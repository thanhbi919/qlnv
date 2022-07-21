<template  lang="">
    <div class ="employe1">
        <h1>Danh sach </h1>
        <button type="" @click="add()" >Add</button>
        <br>
        <!-- <input type="text" name="" v-model = "search"> -->
        <table class="table">
        <thead>
          <tr>
            <th scope="col" v-for="(column, index) in columns" :key="index">
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee) in filterEmployee" :key="employee.emp_no">
            <td>{{ employee.emp_no }}</td>
            <td>{{ employee.first_name }}</td>
            <td>{{ employee.last_name }}</td>
            <td>{{ employee.gender }}</td>
            <td>{{ employee.salary }}</td>
            <td>{{ employee.department }}</td>
            <td>{{ employee.title }}</td>
            <td>{{ employee.hire_date }}</td>
            <td>{{ employee.birth_date }}</td>
            <td style="width: 18%">
              <button
                @click="edit(employee.id)"
                class="btn waves-effect waves-light yellow darken-2"
              >
                <i class="material-icons"> Edit</i>
              </button>

              <button

                class="btn waves-effect waves-light red darken-2"
                @click="deletee(employee.id)"
              >
                <i class="material-icons">Delete</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <EditEmployee v-bind:displayModal = "displayModal"
      v-bind:index = "curInd"
      v-bind:employee = "employeeEdit"
      @saveEdit ="saveEdit"
      @closeModal = "closeModal" 
    ></EditEmployee>
    <AbcD v-bind:employees = "employees"
    @pageChange = "pageChange"></AbcD>
    </div>
</template>
<script>
import apiEmployee from "@/api/apiEmployee";
import EditEmployee from "@/view/EditEmployee";
import AbcD from "@/components/AbcD";
import Mixin from "@/mixins/mixin";
export default {
  name: "EmployeE",
  mixins: [Mixin],
  components: {
    EditEmployee,
    AbcD
  },

   created() {
     apiEmployee.getEmployee().then((res) => {
      console.log("created",res.data);
      this.employees = res.data
      console.log("after",this.employees);
    });
  },
  data: function () {
    return {
      displayModal: "none",
      page: 1,
      search:"",
      employees: [],
      employeeEdit: {},
      filEmployee: [],
      departments: [],
      addStatus: false,
      titles: [],
      curInd: 0,
      columns: [
        "emp_no",
        "first_name",
        "last_name",
        "gender",
        "salary",
        "department",
        "title",
        "hire_date",
        "birth_date",
        "Edit",
      ],
    };
  },
  methods: {
    edit(index) {
      console.log("index: ", index);
      apiEmployee.getEmployeeById(index).then((res) => {
        this.employeeEdit = res.employee;
        console.log("edit:", res);
      });
      this.displayModal = "block";
      this.curInd = index;
    },

    async saveEdit(data) {
      if (this.addStatus == false) {
        await apiEmployee.updateEmployee(data.id, data).then((res) => {
          console.log(res);
          this.displayModal = "none";
        });
        apiEmployee.getEmployee().then((res) => {
          this.employees = res.data;
          console.log(this.employees);
        });
      } else {
        console.log("add: ",data)
        await apiEmployee.createEmployee(data).then((res) => {
          this.displayModal = "none";
          console.log("add: ", res);
        });
        apiEmployee.getEmployee().then((res) => {
          this.employees = res.data;
          console.log(this.employees);
        });
        this.addStatus=false;
      }
    },
    add() {
      this.displayModal = "block";
      this.addStatus = true;
    },
    deletee(index) {
      console.log("index: ", index);
      apiEmployee.deleteEmployee(index).then((res) => {
        console.log(res);
      });
      apiEmployee.getEmployee().then((res) => {
        console.log('avsdadf');
        this.employees = res.data;
        console.log(this.employees);
      });
    },
    closeModal() {
      this.displayModal = "none";
    },
    pageChange(page) {
      console.log("page: ", page);
      this.page = page
    },
  },
  computed:{
    filterEmployee(){
      return this.employees.slice((this.page-1)*2,this.page*2).filter(employee => {
        employee.hire_date = this.formatDate(employee.hire_date);
        employee.birth_date = this.formatDate(employee.hire_date);
        return employee.last_name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
};
</script>
<style lang="css">
</style>