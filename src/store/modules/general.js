const state = () => ({
    userPanel: false
})

const getters = {

    GET_USER_PANEL (state) {
        return state.userPanel
    }

}

const mutations = {

    CHANGE_USER_PANEL (state) {
        state.userPanel = !state.userPanel
    }

}

const actions = {



}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}