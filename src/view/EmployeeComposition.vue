<template>
  <div class="employe1">
    <h1>Danh sach </h1>

    <el-button type="Default" @click="add()">ADD</el-button>
    <br>
    <table class="table" v-if="!loading">
      <thead>
      <tr>
        <th>emp_no</th>
        <th>first_name</th>
        <th>last_name</th>
        <th>gender</th>
        <th>salary</th>
        <th>department</th>
        <th>title</th>
        <th>hire_date</th>
        <th>birth_date</th>
        <th>Edit</th>
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
      <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>


    <EditEmployeeUI
        v-bind:dialogTableVisible="displayDialog"
        v-bind:addStatus="addStatus"
        @closeDialog="closeDialog"
        @saveEdit="saveEdit"
        v-model:employee="employeeEdit.data"
        ref="editRef"
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
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "EmployeeComposition",
  mixins: [Mixin],
  components: {
    Pagination,
    EditEmployeeUI,
  },
  setup() {
    const route = new useRoute();
    const router = new useRouter();
    const store  = new useStore();
    const editRef = ref(null);
    const addStatus = ref(false);
    const loading = ref(true);
    const displayDialog = ref(false);
    const page = ref(1);
    const pageCount = ref(0);
    const employees = reactive({data: []})
    const employeeEdit = reactive({data: []});
    const curInd = ref(0);
    onMounted(async () => {
      page.value = route.query.page;
      await getList();
    })
    const getList = async function () {
      loading.value = true;
      const data = {page: page.value, page_size: 5};
      await apiEmployee.getEmployee(data).then((res) => {
        console.log("created", res.data.data);
        employees.data = res.data.data;
        pageCount.value = res.data.maxPage;
      });
      loading.value = false;
      store.dispatch("employeeStore/saveEmployees", employees.data, {root: true})

    };
    const edit = function (index) {
      console.log("index: ", index);
      apiEmployee.getEmployeeById(index).then((res) => {
        employeeEdit.data = res.employee;
        console.log("edit:", res);
      });
      displayDialog.value = true;
      curInd.value = index;
    };
    const saveEdit = async function (id) {
      console.log("saveEdit: ", employeeEdit.data);
      if (addStatus.value == false) {
        apiEmployee.updateEmployee(id, employeeEdit.data).then((res) => {
          console.log(res);
          displayDialog.value = false;
        });
        await getList();
      } else {
        console.log("add: ", employeeEdit.data);
        await apiEmployee.createEmployee(employeeEdit.data).then((res) => {
          displayDialog.value = false;
          console.log("add: ", res);
        });
        await getList();
        addStatus.value = false;
      }
    };
    const pageChange = async function (newVal) {
      loading.value = true;
      console.log("pageChange", newVal);
      console.log("route", route);
      router.push({query: {page: newVal}});
      await apiEmployee.getEmployee({page: newVal, page_size: 5}).then((res) => {
        employees.data = res.data.data;
        pageCount.value = res.data.maxPage;
        console.log("update1", page.value);
      });
      loading.value = false;
      store.dispatch("employeeStore/saveEmployees", employees.data)
    }
    const add = function () {
      displayDialog.value = true;
      addStatus.value = true;
    }

    const deletee = async function (id, index) {
      loading.value = true;
      employees.data.slice(index, 1);

      console.log("index: ", index);
      await apiEmployee.deleteEmployee(id).then((res) => {
        console.log(res);
      });
      await apiEmployee.getEmployee({page: page.value, page_size: 5}).then((res) => {
        if (res === []) console.log("res:", res);
        employees.data = res.data.data;
        console.log(employees);
      });
      loading.value = false;
    };

    const closeDialog = function () {
      addStatus.value = false;
      console.log("closeDialog");
      displayDialog.value = false;
      console.log("closeDialog1", editRef.value.$refs.ruleForm.resetFields());
      console.log("closeDialog2", editRef.value.$refs.ruleForm);
    };
    const filterEmployee = computed(
        () => {
          console.log("filter:", employees.data);
          return employees.data;
        });
    watch(employees.data, (newVal) => {
      if (newVal.length === 0) {
        page.value = pageCount.value;
        pageChange(page.value);
      }
    });

    return {
      loading,
      addStatus,
      displayDialog,
      page,
      pageCount,
      employees,
      employeeEdit,
      filterEmployee,
      editRef,
      getList,
      edit,
      saveEdit,
      pageChange,
      add,
      deletee,
      closeDialog,


    }
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