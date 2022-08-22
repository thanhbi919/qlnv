import mutation from "@/store/modules/profile/mutation";
import action from "@/store/modules/profile/action";
import * as getter from './getter'
import state from "@/store/modules/profile/state";

const profileStore = {
    namespaced : true,
    getter,
    state: state,
    mutations :mutation,
    actions :action
}
export default profileStore