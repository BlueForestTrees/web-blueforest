<template>
    <v-layout column align-center mb-1>

        <fragment-list :tree="tree" :fragment="ROOTS" :selectionKey="selectionKey"/>

        <transition name="slide-left-right">
            <v-layout v-if="oneSelected" justify-center>
                <open-message slot="right" :section="section" no-text/>
                <btn icon-class="balance logo" @click="goEquiv({tree, oneSelected})"></btn>
                <btn icon-class="game logo" @click="goQuiDeuxFoisPlus({tree, oneSelected})"></btn>
                <btn icon="delete" iconColor="grey" @click="deleteOneSelected"></btn>
            </v-layout>
        </transition>
        <btn slot="right" icon="add_box" icon-color="grey" @click="setAdding(true)"/>
        <simple-dialog v-model="adding" icon="roots" title="Ajouter une ressource">
            <ressource-adder :tree="tree" @close="setAdding(false)"/>
        </simple-dialog>
    </v-layout>

</template>

<script>
    import On from "../../const/on"
    import Do from "../../const/do"
    import {mapActions, mapMutations} from 'vuex'
    import ScopeMenu from "../root/ScopeMenu"
    import {BRANCHES, ROOTS, TANK} from "../../const/fragments"
    import SubpageTitle from "./SubpageTitle"
    import {rootScope} from "../../const/img"
    import {qtUnitName, de, name} from "../../services/calculations"
    import Closer from "../common/Closer"
    import OpenMessage from "../common/OpenMessage"
    import Selectable from "../mixin/Selectable"
    import Btn from "../common/btn"
    import TransitionExpand from "../common/TransitionExpand"
    import {root} from "../../const/selections"
    import Note from "../common/Note"
    import Icon from "../common/icon"
    import UnselectOnTreeChange from "../mixin/UnselectOnTreeChange"
    import UtilisationSubPage from "./UtilisationSubPage"
    const SimpleDialog = () => import("../selection/SimpleDialog")

    const RessourceAdder = () => import(/* webpackChunkName: "RessourceAdder"*/"../root/RessourceAdder")
    const FragmentList = () => import(/* webpackChunkName: "FragmentList"*/"./FragmentList")

    export default {
        name: "fabrication-subpage",
        mixins: [Selectable, UnselectOnTreeChange],
        components: {
            SimpleDialog,
            UtilisationSubPage,
            Icon,
            Note,
            TransitionExpand,
            Btn,
            OpenMessage,
            Closer,
            SubpageTitle,
            RessourceAdder,
            FragmentList,
            ScopeMenu,
        },
        props: {
            tree: Object
        },
        data: () => ({
            selectionKey: root,
            adding: false, reverted: false,
            ROOTS, TANK, BRANCHES, rootScope
        }),
        computed: {
            section: function () {
                return {
                    title: `Discussion sur les ressources de \"${name(this.tree)}\"`,
                    filter: {
                        type: 'trunk-root',
                        topicId: this.tree._id,
                        subTopicId: this.oneSelected._id
                    }
                }
            }
        },

        methods: {
            de, qtUnitName, name,
            ...mapActions({
                goTree: On.GO_TREE,
                dispatchGoRoot: On.GO_ROOT,
                deleteRoot: On.DELETE_ROOT,
                dispatchLoadRoots: On.LOAD_ROOTS,
                dispatchGoEquiv: On.GO_EQUIV,
                goEquiv: On.GO_EQUIV,
                goQuiDeuxFoisPlus: On.GO_QUI_DEUX_FOIS_PLUS,
                snackError: On.SNACKERROR
            }),
            ...mapMutations({
                setIdx: Do.SET_TREE_ROOT_IDX
            }),
            deleteOneSelected() {
                this.deleteRoot({tree: this.tree, root: this.oneSelected})
                    .then(this.unselect)
                    .catch(this.snackError)
            },
            goRoot: function (root) {
                this.dispatchGoRoot({treeId: this.tree._id, rootId: root._id})
                this.unselect()
            },
            goEquiv(root) {
                this.dispatchGoEquiv({
                    _id: this.tree._id,
                    bqt: this.tree.trunk.quantity.bqt,
                    s_id: root._id,
                    sbqt: root.trunk.quantity.bqt
                })
            },
            setAdding(adding) {
                this.adding = adding
                this.adding && this.unselect()
            }
        }
    }
</script>