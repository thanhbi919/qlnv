<template  lang="">
    <div class ="employe1">
        <h1>Danh sach </h1>
         <el-button type="Default" @click="add()"  >ADD</el-button>
<br>
        <table class="table">
        <thead>
          <tr>
            <th scope="col" v-for="(column, index) in columns" :key="index">
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employee,index) in filterEmployee" :key="employee.emp_no">
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
                @click="deletee(employee.id,index)"
              >
                <i class="material-icons">Delete</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      

    <EditEmployeeUI 
    v-bind:dialogTableVisible = "displayDialog"
    v-bind:addStatus = "addStatus"
    @closeDialog = "closeDialog" 
    @saveEdit ="saveEdit"
    v-bind:employee = "employeeEdit"
    ref="edit"
    ></EditEmployeeUI>
    
    
    <AbcD v-bind:employees = "employees"
    v-bind:pageCount = "pageCount"
    v-model = "page"
    @pageChange = "pageChange"
    @prevPage = "prevPage" ></AbcD>

    </div>
</template>
<script>
import apiEmployee from "@/api/apiEmployee";
import AbcD from "@/components/AbcD";
import Mixin from "@/mixins/mixin";
import EditEmployeeUI from "@/view/EditEmployeeUI";
export default {
  name: "EmployeE",
  mixins: [Mixin],
  components: {
    AbcD,
    EditEmployeeUI,
  },

  created() {
    this.page = this.$route.query.page ;
    apiEmployee.getEmployee(this.page).then((res) => {
      console.log("created", res.data.data);
      this.employees = res.data.data;
      this.pageCount = res.data.maxPage;
      // console.log("pageCount", this.pageCount);
      console.log("after", this.employees);
    });
  },
  data: function () {
    return {
      displayModal: "none",
      displayDialog: "none",
      page:1,
      pageCount: 0,
      search: "",
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
      // this.displayModal = "block";
      this.displayDialog = true;
      this.curInd = index;
    },

    async saveEdit(data, param) {
      console.log("saveEdit: ", data);
      if (this.addStatus == false) {
        await apiEmployee.updateEmployee(param, data).then((res) => {
          console.log(res);
          // this.displayModal = "none";
          this.displayDialog = false;
        });
        apiEmployee.getEmployee().then((res) => {
          this.employees = res.data.data;
          console.log(this.employees);
        });
      } else {
        console.log("add: ", data);
        await apiEmployee.createEmployee(data).then((res) => {
          // this.displayModal = "none";
          this.displayDialog = false;
          console.log("add: ", res);
        });
       apiEmployee.getEmployee(this.page).then((res) => {
        
          this.employees = res.data.data;
          this.pageCount = res.data.maxPage;
          console.log(this.employees);
        });
        this.addStatus = false;
      }
    },
    add() {
      this.displayDialog = true;
      this.addStatus = true;
    },
    deletee(id,index) {
      this.employees.slice(index,1);

      console.log("index: ", index);
      apiEmployee.deleteEmployee(id).then((res) => {
        console.log(res);
      });
      apiEmployee.getEmployee(this.page).then((res) => {
        console.log("avsdadf");
        this.employees = res.data.data;
        console.log(this.employees);
      });
    },
    closeModal() {
      this.displayModal = "none";
    },
    closeDialog() {
      this.addStatus = false;
      console.log("closeDialog");
      this.displayDialog = false;
      console.log("closeDialog", this.$refs.edit.$refs.ruleForm.resetFields());
      // console.log("closeDialog",this.$refs.edit.$refs.ruleForm.clearValidate());
      console.log("closeDialog", this.$refs.edit.$refs.ruleForm);
    },
   
    prevPage(page){
      this.page = page --;
    },
    pageChange(newVal){
      console.log("pageChange",newVal);
       console.log("route",this.$route)
    this.$router.push({query:{page:newVal}})
    apiEmployee.getEmployee(newVal).then((res)=>{
      this.employees = res.data.data;
      this.pageCount = res.data.maxPage;
      console.log("update1",this.page)
    }) 
    }
  },
  // watch:{
  //  page: function(newVal){
  //   console.log("route",this.$route)
  //   this.$router.push({query:{page:newVal}})
  //   apiEmployee.getEmployee(newVal).then((res)=>{
  //     this.employees = res.data.data;
  //     this.pageCount = res.data.maxPage;
  //     console.log("update1",this.page)
  //   })
  //  }
  // },
  computed: {
    filterEmployee() {
      console.log("filter:", this.employees)
      return this.employees}
  }
  
};
</script>
<style lang="css">
</style>