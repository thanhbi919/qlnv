import { createStore } from "vuex";
import employee from "@/store/employee";
import profile from "@/store/profile";

const store = createStore({
    modules: {
        profileStore: profile,
        employeeStore:employee
    }
})

export default store;