const saveProfile = ({commit},profile) => {
    commit("SAVE_PROFILE",profile);
}
const clearProfile = ({commit}) => {
    commit("CLEAR_PROFILE");
}
const updateRole = ({commit}) => {
    commit("UPDATE_ROLE")
}
export default {
    saveProfile,
    clearProfile,
    updateRole
}