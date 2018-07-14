import {GO} from "../const/go";
import Vue from 'vue'
import VueRouter from 'vue-router'
import BlueForest from '../vue/BlueForest'
import Login from '../vue/Login'
import Inscription from '../vue/Inscription'
import Confirmation from '../vue/Confirmation'
import Tree from '../vue/tree/Tree'
import Search from '../vue/Search'
import Home from '../vue/Home'
import Compare from '../vue/compare/Compare'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    base: "/",
    routes: [
        {
            path: "/", component: BlueForest,
            children: [
                {
                    name: GO.HOME,
                    path: '',
                    component: Home,
                },
                {
                    name: GO.TREE,
                    path: "tree/:_id",
                    component: Tree,
                    props:true
                },
                {
                    name: GO.SEARCH,
                    path: "search",
                    component: Search
                },
                {
                    name: GO.COMPARE,
                    path: "compare/:leftId/:rightId",
                    component: Compare,
                    props: true
                }
            ]
        },
        {name: GO.LOGIN, path: "/login", component: Login},
        {name: GO.SUSCRIBE, path: "/suscribe", component: Inscription},
        {name: GO.CONFIRM, path: "/confirm/:token", component: Confirmation, props: true}
    ]
});