import {Dial} from "../const/dial"
import ENV from "../env"

export const createDialog = name => (dialogFactory[name] && dialogFactory[name]()) || (console.warn(`state.js il manque dialogFactory['${name}']`) || {})

const dialogFactory = {
    [Dial.ADD_TRUNK]: () => ({destination: null}),
    [Dial.FACET_ENTRY]: () => ({qt: null, unit: null, name: null}),
    [Dial.ADD_IMPACT_ENTRY]: () => ({qt: null, unit: null, name: null}),
    [Dial.ADD_FACET]: () => ({name: null}),
    [Dial.ADD_IMPACT]: () => ({tree: null}),
    [Dial.ADD_RESSOURCE]: () => ({tree: null}),
    [Dial.ADD_USAGE]: () => ({tree: null}),
    [Dial.CONFIGURE_LINK]: () => ({left: null, right: null}),
    [Dial.CREATE]: () => ({}),
    [Dial.SET_QT_UNIT]: () => ({}),
    [Dial.FEEDBACK]: () => ({}),
    [Dial.SUSCRIBE]: () => ({}),
    [Dial.LOGIN]: () => ({}),
}

const dialogs = () => {
    const dialsKeys = Object.keys(Dial)
    const dials = {}
    for (let i = 0; i < dialsKeys.length; i++) {
        dials[Dial[dialsKeys[i]]] = {visible: false, data: createDialog(Dial[dialsKeys[i]])}
    }
    return dials
}

export const snack = () => ({
    visible: false,
    multiline: false,
    timeout: 3000,
    vertical: false,
    text: "this message should be overriden.",
    color: "black"
})


export const tree = () => ({_id: null, trunk: null, selection: null, facets: null})

export default {
    token: null,
    user: null,
    basket: [],
    tree: null,
    dialogs: dialogs(),
    nav: {leftMenuVisible: false},
    snack: snack(),
    version: {
        web: ENV.VERSION
    }
}