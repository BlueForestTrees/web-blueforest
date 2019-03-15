import On from "../../const/on"
import api from "../../rest/api"
import router from "../../router/router"
import {GO} from "../../const/go"
import {applyRessourceCoef, createStringObjectId, treeBqt} from "../../services/calculations"
import {BRANCHES, ROOTS} from "../../const/fragments"
import Do from "../../const/do"

export default {

    [On.GO_ROOT]: ({commit, state}, {treeId, rootId}) => {
        router.push({name: GO.ROOT, params: {treeId, rootId}})
    },
    [On.ADD_BRANCH]: ({commit, dispatch}, {tree, root}) => {
        return dispatch(On.ADD_ROOT, {tree: root, root: tree})
    },
    [On.ADD_ROOT]: ({commit, dispatch}, {tree, root}) => {

        const request = {
            _id: createStringObjectId(),
            trunkId: tree._id,
            rootId: root._id,
            bqt: treeBqt(root) / treeBqt(tree),
        }

        return dispatch(On.CREATE_ROOT, request)
            .then(() => {
                commit(Do.ADD_TO_FRAGMENT, {tree, fragment: ROOTS, element: root})
                commit(Do.ADD_TO_FRAGMENT, {tree: root, fragment: BRANCHES, element: tree})
            })
    },
    [On.CREATE_ROOT]: async ({commit}, {_id, trunkId, rootId, bqt, relativeTo}) => api.postRoot({_id, trunkId, rootId, bqt, relativeTo}),
    [On.LOAD_ROOTS]: ({commit}, {_id, bqt}) =>
        api.getRoots(_id)
            .then(roots => applyRessourceCoef(bqt, roots)),
    [On.UPDATE_ROOT]: ({commit}, {_id, trunkId, rootId, bqt}) => api.putRoot({_id, trunkId, rootId, bqt}),
    [On.DELETE_ROOT]: ({dispatch, commit}, {tree, root}) => {
        return api.deleteRoot(root._id)
            .then(() => {
                commit(Do.REMOVE_FROM_FRAGMENT, {tree, fragment: ROOTS, element: root})
                commit(Do.REMOVE_FROM_FRAGMENT, {tree: root, fragment: BRANCHES, element: tree})
            })
            .then(() => dispatch(On.SNACKBAR, {text: "Ressource retirée"}))
    }
}
