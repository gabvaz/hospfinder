export default{
    TOGGLE_SIDEBAR(state) {
        if(state.toggleSidebar === "closed"){
            state.toggleSidebar = "open";
        }else{
            state.toggleSidebar = "closed";
        }
        
    },
    TOGGLE_MODAL(state, payload) {
        if(state.toggleModal === "closed"){
            state.toggleModal = "open";
        }else{
            state.toggleModal = "closed";
        }

        state.selectedLocation = payload;
        console.log(payload);
        
    }
}