import { createStore } from "vuex";
import employeeStore from "@/store/modules/employee";
import profileStore from "@/store/modules/profile";

const store = createStore({
    modules: {
        profileStore,
        employeeStore
    }
})

export default store;