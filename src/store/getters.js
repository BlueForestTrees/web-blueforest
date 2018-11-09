export default {
    basketArray: (state) => Object.values(state.basket),
    basketDamageArray: (state) => Object.values(state.basketdamage),
    basketImpactArray: (state) => Object.values(state.basketimpact),
    basketFacetArray: (state) => Object.values(state.basketfacet),
    emptyBasket: (state, getters) => !getters.notEmptyBasket,
    notEmptyBasket: (s, getters) => getters.basketArray.length > 0 || getters.basketDamageArray.length > 0 || getters.basketImpactArray.length > 0 || getters.basketFacetArray.length > 0,
    filter: state => {
        const cat = {}
        const filter = {cat}
        let changes = false
        for (let i = 0; i < state.search.cats.length; i++) {
            cat["c" + i] = state.search.cats[i]._id
            changes = true
        }
        if (state.search.name) {
            filter.term = state.search.name
            changes = true
        }
        return changes ? filter : null
    },
}