import Vue from 'vue'
import Vuex from 'vuex'
import state from './state';
import getters from './getters';
import appActions from "./actions/appActions";
import facetActions from "./actions/facetActions";
import facetEntryActions from "./actions/facetEntryActions";
import rootActions from "./actions/rootActions";
import treeActions from "./actions/treeActions";
import trunkActions from "./actions/trunkActions";
import tankActions from "./actions/tankActions";
import impactActions from "./actions/impactActions";
import impactEntryActions from "./actions/impactEntryActions";
import branchActions from "./actions/branchActions";
import linkActions from "./actions/linkActions";
import branchMutations from "./mutation/branchMutations";
import compareToMutations from "./mutation/compareToMutations";
import dialogMutations from "./mutation/dialogMutations";
import facetMutation from "./mutation/facetMutation";
import impactMutations from "./mutation/impactMutations";
import tankMutations from "./mutation/tankMutations";
import treeMutations from "./mutation/treeMutations";
import trunkMutations from "./mutation/trunkMutations";
import rootMutations from "./mutation/rootMutations";
import basketMutations from "./mutation/basketMutations";
import feedbackActions from "./actions/feedbackActions";
import authActions from "./actions/authActions";
import userMutation from "./mutation/userMutation";
import searchActions from "./actions/searchActions";
import basketActions from "./actions/basketActions";
import homeActions from "./actions/homeActions";



Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    mutations:{
        ...basketMutations,
        ...branchMutations,
        ...compareToMutations,
        ...dialogMutations,
        ...facetMutation,
        ...impactMutations,
        ...rootMutations,
        ...tankMutations,
        ...treeMutations,
        ...trunkMutations,
        ...userMutation,
    },
    actions: {
        ...appActions,
        ...basketActions,
        ...facetActions,
        ...facetEntryActions,
        ...impactActions,
        ...impactEntryActions,
        ...rootActions,
        ...treeActions,
        ...trunkActions,
        ...tankActions,
        ...branchActions,
        ...linkActions,
        ...feedbackActions,
        ...authActions,
        ...searchActions,
        ...homeActions
    }
});

export default store;