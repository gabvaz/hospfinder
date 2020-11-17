export default{
    toggleSidebar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
    toggleModal({ commit },location) {
        console.log(location);
        commit('TOGGLE_MODAL', location)
    }
}