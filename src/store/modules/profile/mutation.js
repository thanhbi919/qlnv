const SAVE_PROFILE = (state,profile)=>{
    state.profile = profile;
    if (localStorage.getItem('role')) {
        state.role = localStorage.getItem('role');
    }
}
const CLEAR_PROFILE= (state) => {
    state.profile = {};
}
const UPDATE_ROLE = (state) => {
    if (state.role == 3) {
        state.role = 3;
    } else {
        state.role++;
        localStorage.setItem('role', state.role);
    }

}
export default {
    SAVE_PROFILE,
    CLEAR_PROFILE,
    UPDATE_ROLE
}