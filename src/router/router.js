import {GO} from "../const/go"
import Vue from 'vue'
import VueRouter from 'vue-router'

const Tree = () => import(/* webpackChunkName: "Tree" */ '../vue/tree/Tree.vue')
const Equivalence = () => import(/* webpackChunkName: "Equivalence" */ '../vue/equivalence/Equivalence.vue')
const Basket = () => import (/* webpackChunkName: "Basket" */ '../vue/basket/Basket')
const Root = () => import(/* webpackChunkName: "Root" */ '../vue/tree/Root')
const Home = () => import(/* webpackChunkName: "Home" */ '../vue/home/Home')
const Search = () => import(/* webpackChunkName: "Search" */ '../vue/search/Search')
const BlueForest = () => import(/* webpackChunkName: "BlueForest" */ '../vue/BlueForest')
const Compare = () => import(/* webpackChunkName: "Compare" */ '../vue/compare/Compare')
const Confirmation = () => import(/* webpackChunkName: "Confirmation" */ '../vue/user/Confirmation')
const Inscription = () => import(/* webpackChunkName: "Inscription" */ '../vue/user/Inscription')
const Login = () => import(/* webpackChunkName: "Login" */ '../vue/user/Login')
const Plan = () => import(/* webpackChunkName: "Plan" */ '../vue/plan/Plan')
const PlanIntro = () => import(/* webpackChunkName: "Plan" */ '../vue/plan/PlanIntro')
const ImpactEntries = () => import(/* webpackChunkName: "ImpactEntries" */ '../vue/impact/ImpactEntries')
const CreateTree = () => import(/* webpackChunkName: "CreateTree" */ '../vue/tree/CreateTree')

Vue.use(VueRouter)

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
                    test: 42
                },
                {
                    name: GO.CREATE_TREE,
                    path: "tree/create",
                    component: CreateTree
                },
                {
                    name: GO.TREE,
                    path: "tree/:bqt/:_id",
                    component: Tree,
                    props: true
                },
                {
                    name: GO.EQUIV,
                    path: "equiv/:bqt/:_id/:sbqt/:s_id",
                    component: Equivalence,
                    props: true
                },
                {
                    name: GO.TREE_EMPTY,
                    path: "tree",
                    component: Tree
                },
                {
                    name: GO.ROOT,
                    path: "root/:treeId/:rootId",
                    component: Root,
                    props: true
                },
                {
                    name: GO.SEARCH,
                    path: "search",
                    component: Search
                },
                {
                    name: GO.IMPACT_ENTRY,
                    path: "impactEntries",
                    component: ImpactEntries
                },
                {
                    name: GO.BASKET,
                    path: "basket",
                    component: Basket
                },
                {
                    name: GO.COMPARE_EMPTY,
                    path: "compare",
                    component: Compare
                },
                {
                    name: GO.COMPARE_PARTIAL,
                    path: "compare/:leftId",
                    component: Compare,
                    props: true
                },
                {
                    name: GO.COMPARE,
                    path: "compare/:leftId/:rightId",
                    component: Compare,
                    props: true
                }
            ]
        },
        {name: GO.PLAN, path: "/plan", component: Plan},
        {name: GO.PLAN_INTRO, path: "/plan/intro", component: PlanIntro},
        {name: GO.LOGIN, path: "/login", component: Login},
        {name: GO.SUSCRIBE, path: "/suscribe", component: Inscription},
        {name: GO.CONFIRM, path: "/confirm/:token", component: Confirmation, props: true}
    ]
})