export default {
    SET_AUTH(state){
        state.token = true;
    },
    REMOVE_AUTH(state){
        state.token = false;
    }
}