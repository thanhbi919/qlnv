import mutation from "@/store/modules/employee/mutation";
import action from "@/store/modules/employee/action";
import * as getter from './getter'
import state from "@/store/modules/employee/state";

const employeeStore = {
    namespaced :true,
    getter,
    state : state,
    mutations:mutation,
    actions:action
}
export default employeeStore;
