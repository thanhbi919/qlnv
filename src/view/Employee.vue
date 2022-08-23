<template>
  <div class="employe1">
    <h1>Danh sach </h1>

    <el-button type="Default" @click="add()">ADD</el-button>
    <br>
    <table class="table" v-if="!loading">
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
    <div v-else>
      <div  class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>


    <EditEmployeeUI
        v-bind:dialogTableVisible="displayDialog"
        v-bind:addStatus="addStatus"
        @closeDialog="closeDialog"
        @saveEdit="saveEdit"
        v-model:employee="employeeEdit"
        ref="edit"
    ></EditEmployeeUI>


    <Pagination v-bind:employees="employees"
                v-bind:pageCount="pageCount"
                v-model="page"
                @pageChange="pageChange"
                style="margin-left: 46%"
    ></Pagination>

  </div>
</template>
<script>
import apiEmployee from "@/api/apiEmployee";
import Pagination from "@/components/Pagination";
import Mixin from "@/mixins/mixin";
import EditEmployeeUI from "@/view/EditEmployeeUI";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Employee",
  mixins: [Mixin],
  components: {
    Pagination,
    EditEmployeeUI,
  },


  async created() {
    this.page = this.$route.query.page;
    await this.getList();
  },
  data: function () {
    return {
      loading: true,
      displayModal: "none",
      displayDialog: "none",
      page: 1,
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
    async getList() {
      this.loading = true;
      const data = {page: this.page, page_size: 5};
      await apiEmployee.getEmployee(data).then((res) => {
        console.log("created", res.data.data);
        this.employees = res.data.data;
        this.pageCount = res.data.maxPage;
      });
      this.loading = false;
      this.$store.dispatch("employeeStore/saveEmployees", this.employees, {root: true})

    },
    edit(index) {
      console.log("index: ", index);
      apiEmployee.getEmployeeById(index).then((res) => {
        this.employeeEdit = res.employee;
        console.log("edit:", res);
      });
      this.displayDialog = true;
      this.curInd = index;
    },

    async saveEdit(id) {
      console.log("saveEdit: ", this.employeeEdit);
      if (this.addStatus == false) {
        apiEmployee.updateEmployee(id, this.employeeEdit).then((res) => {
          console.log(res);
          this.displayDialog = false;
        });
        this.getList();
      } else {
        console.log("add: ", this.employeeEdit);
        await apiEmployee.createEmployee(this.employeeEdit).then((res) => {
          this.displayDialog = false;
          console.log("add: ", res);
        });
        this.getList();
        this.addStatus = false;
      }
    },
    add() {
      this.displayDialog = true;
      this.addStatus = true;
    },
    async deletee(id, index) {
      this.employees.slice(index, 1);

      console.log("index: ", index);
      await apiEmployee.deleteEmployee(id).then((res) => {
        console.log(res);
      });
      apiEmployee.getEmployee({page:this.page,page_size:5}).then((res) => {
        if (res === []) console.log("res:", res);
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
      console.log("closeDialog1", this.$refs.edit.$refs.ruleForm.resetFields());
      console.log("closeDialog2", this.$refs.edit.$refs.ruleForm);
    },
    async pageChange(newVal) {
      this.loading = true;
      console.log("pageChange", newVal);
      console.log("route", this.$route);
      this.$router.push({query: {page: newVal}});
      await apiEmployee.getEmployee({page: newVal, page_size: 5}).then((res) => {
        this.employees = res.data.data;
        this.pageCount = res.data.maxPage;
        console.log("update1", this.page);
      });
      this.loading = false;
      this.$store.dispatch("employeeStore/saveEmployees", this.employees)
    },
  },
  computed: {
    filterEmployee() {
      console.log("filter:", this.employees);
      return this.employees;
    },
  },
  watch: {
    employees(newVal) {
      if (newVal.length == 0) {
        this.page = this.pageCount;
        this.pageChange(this.page);
      }
    },

  },
};
</script>
<style lang="css">
.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: rebeccapurple;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}




</style>