import find from 'lodash.find'
import isNil from 'lodash.isnil'
import {map} from 'unit-manip'
import remove from 'lodash.remove'
import {format} from "./calculations"
import Vue from 'vue'

/**
 * un arbre en axes.
 * tree =>
 * [
 {tree: "leftTreeName", type:"facet", name: "Prix", bqt:20, g:"Prix"},
 {tree: "leftTreeName", type:"trunk", name: "Quantité", bqt:20, g:"Elec"},
 {tree: "leftTreeName", type:"tank", name: "Eau", bqt:5, unit:"Mass"},
 {tree: "leftTreeName", type:"tank", name: "Elec", bqt:12, g:"Mass"},
 ]
 * @param tree
 */
export const buildAxises = tree => ([
    ...buildAxis(tree.trunk, "trunk", [{...tree.trunk, name: "Quantité"}]),
    // ...buildAxis(tree.trunk, "facet", tree.facets),
    // ...buildAxis(tree.trunk, "tank", tree.tank),
    ...buildAxis(tree.trunk, "impactsTank", tree.impacts),
])
const buildAxis = ({name}, type, items) => map(items, item => ({
    tree: name,
    type,
    name: item.name,
    bqt: item.quantity.bqt,
    _bqt: item.quantity.bqt,
    g: item.quantity.g
}))

/**
 * Placer les axes dans la bonne zone: commun, left ou right.
 * @param leftAxises
 * @param rightAxises
 * @returns {{left: *[], common: [{left: axis, right: axis}], right: *[]}}
 */
export const separate = (leftAxises, rightAxises) => {
    
    //Un axe sans quantité est retiré des axes communs
    const leftWithoutQt = remove(leftAxises, axis => (isNil(axis._bqt) || isNil(axis.g)))
    const rightWithoutQt = remove(rightAxises, axis => (isNil(axis._bqt) || isNil(axis.g)))
    
    //Un axe qui n'a pas son équivalent de l'autre côté est retiré des communs
    const leftWithoutRight = remove(leftAxises, axis => !find(rightAxises, {name: axis.name, type: axis.type, g: axis.g}))
    const rightWithoutLeft = remove(rightAxises, axis => !find(leftAxises, {name: axis.name, type: axis.type, g: axis.g}))
    
    //Les axes restant sont les axes communs
    const common = []
    for (let i = 0; i < leftAxises.length; i++) {
        common.push({left: leftAxises[i], right: rightAxises[i]})
    }
    
    return {
        left: [
            ...leftWithoutQt, ...leftWithoutRight
        ],
        common,
        right: [
            ...rightWithoutQt, ...rightWithoutLeft
        ]
    }
}

/**
 * Met à jour les données pour comparer à égalité sur l'axe de base spécifié
 * @param base axe commun utilisé comme base d'égalité (ex. applyBase "Quantité" => appliquer la quantité de gauche sur la droite, et appliquer le coef sur les autres axes de gauche.
 * @param axises
 */
export const applyBase = (base, axises) => {
    if (base) {
        const rcoef = base._bqt / find(axises.common, c => c.right.name === base.name).right._bqt
        applyCoef(rcoef, axises.right)
        applyCoef(rcoef, axises.common, "right")
        
        const lcoef = base._bqt / find(axises.common, c => c.left.name === base.name).left._bqt
        applyCoef(lcoef, axises.left)
        applyCoef(lcoef, axises.common, "left")
        
        updateRatios(axises)
        
        axises.common.sort((a, b) => a.left.ratio !== b.left.ratio ? a.left.ratio - b.left.ratio : b.right.ratio - a.right.ratio)
    }
}
export const applyCoef = (coef, items, prop) => {
    for (let i = 0; i < items.length; i++) {
        if (prop) {
            items[i][prop].bqt = coef * items[i][prop]._bqt
        } else {
            items[i].bqt = coef * items[i]._bqt
        }
    }
    return items
}

export const updateRatios = (axises) => {
    for (let i = 0; i < axises.common.length; i++) {
        const leftAxis = axises.common[i].left
        const rightAxis = axises.common[i].right
        Vue.set(leftAxis, "ratio", relativeTo1(leftAxis.bqt, rightAxis.bqt))
        Vue.set(rightAxis, "ratio", relativeTo1(rightAxis.bqt, leftAxis.bqt))
    }
    axises.common.sort((a, b) => a.ratio - b.ratio)
    return axises
}
const relativeTo1 = (first, second) => first > second ? 1 : format(first / second)