
const saveEmployees = ({commit},employees) => {
    commit("SAVE_EMPLOYEES",employees);
}
export default {
    saveEmployees
};