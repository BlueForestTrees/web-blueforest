<template>
    <v-list>
        <v-list-tile>
            <v-list-tile-avatar size="64px" style="padding-right: 1em">
                <v-avatar size="64px"><img style="width: 64px;height:64px" src="/img/logo-rond.svg" alt="BlueForest"></v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>{{(user && user.fullname) || "Visiteur"}}</v-list-tile-title>
                <v-list-tile-sub-title>{{(user && "Contrôle d'accès") || "non connecté"}}</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
            <v-btn outline block class="elevation-0" @click="connect">Connexion</v-btn>
        </v-list-tile>
        <v-list-tile>
            <v-btn outline block class="elevation-0" @click="suscribe">Inscription</v-btn>
        </v-list-tile>
        <v-list-tile v-if="title"><v-list-tile-sub-title>{{title}}</v-list-tile-sub-title></v-list-tile>
    </v-list>
</template>

<script>
    import {GO as Go, GO} from "../../const/go"
    import {mapState} from "vuex"
    import ToIntro from "./toIntro"

    export default {
        name: "login-suscribe-list",
        components: {ToIntro},
        props: {
            title: {type: String, default: null}
        },
        computed: {
            ...mapState({user: s => s.user, userStatus: s => s.userStatus})
        },
        methods: {
            suscribe: function () {
                this.$router.push({name: GO.SUSCRIBE})
            },
            connect: function () {
                this.$router.push({name: GO.LOGIN})
            },
        }
    }
</script>