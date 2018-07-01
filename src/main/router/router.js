import {GO} from "../const/go";
import Vue from 'vue'
import VueRouter from 'vue-router'
import BlueForest from '../vue/BlueForest'
import Login from '../vue/Login'
import Inscription from '../vue/Inscription'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {path: GO.ROOT, component: BlueForest},
        {path: GO.LOGIN, component: Login},
        {path: GO.SUSCRIBE, component: Inscription}
    ]
});