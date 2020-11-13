export default{
    TOGGLE_SIDEBAR(state) {
        if(state.toggleSidebar === "closed"){
            state.toggleSidebar = "open";
        }else{
            state.toggleSidebar = "closed";
        }
        
    }
}