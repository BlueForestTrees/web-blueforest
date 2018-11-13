import router from "../../router/router"
import {GO} from "../../const/go"
import On from "../../const/on"
import Do from "../../const/do"
// import {find} from "unit-manip"
// import forage from "../../services/forage"

export default {
    [On.GO_BASKET]: ({}) => {
        router.push({name: GO.BASKET})
    },
    [On.ADD_SELECTION_TO_BASKET]: ({dispatch, state}) => {
        dispatch(On.ADD_TO_BASKET, state.selection)
        const length = state.selection.length
        const s = state.selection.length > 1 ? 's' : ''
        dispatch(On.SNACKBAR, {text: `${length} élément${s} ajouté${s} au panier`, color: "green"})
        dispatch(On.UNSELECT)
    },
    [On.ADD_TO_BASKET]: async ({commit, dispatch, state}, items) => {
        commit(Do.ADD_TO_BASKET, items)
        return dispatch(On.SAVE_BASKET)
    },
    [On.REMOVE_SELECTION_FROM_BASKET]: ({dispatch, state}) => {
        dispatch(On.REMOVE_FROM_BASKET, state.selection)
        dispatch(On.UNSELECT)
    },
    [On.REMOVE_FROM_BASKET]: ({state, commit, dispatch}, items) => {
        commit(Do.REMOVE_FROM_BASKET, items)
        dispatch(On.SAVE_BASKET)
    },
    [On.SAVE_BASKET]: ({state}) => {
        // forage.setBasket(Object.values(state.basket))
    },
    [On.LOAD_BASKET]: ({commit}) => {
        // const items = forage.getBasket()
        // if (items) {
        //     commit(Do.ADD_TO_BASKET, items)
        // }
    }
}