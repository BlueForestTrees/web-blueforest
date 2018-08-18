import {del, get, arrayOf, post, put, paramsOf, postForm, upload} from './rest'
import {X_ACCESS_TOKEN} from "../const/headers"

export default {
    // DIRECT (id qt) (color name) => à stocker. Les get réutilisent le storage
    searchFacetEntry: namepart => get(`/api/facetEntry?q=${namepart}`),
    searchImpactEntry: namepart => get(`/api/impactEntry?q=${namepart}`),
    searchTrunk: ({term, type, aidx, ps}) => get(`/api/trunks${paramsOf({q: term, t: type, aidx, ps})}`),
    //mixin? pour gérer (name color) et (complet)
    getTrunks: _ids => get(`/api/trunk${arrayOf('_ids', _ids)}`),
    getTrunk: _id => get(`/api/trunk/${_id}`),
    //getImpactEntry
    //getFacetEntry

    getGrandeurs: () => get('/api/grandeurs'),


    //peupler les (color name) depuis storage, ou lookup.
    getFacets: _id => get(`/api/facet/${_id}`),
    getQuantifiedFacets: (qt, unit, _id) => get(`/api/facet/${qt}/${unit}/${_id}`),
    getQuantifiedImpact: (qt, unit, _id) => get(`/api/impact/${qt}/${unit}/${_id}`),
    getTank: (qt, unit, _id) => get(`/api/tank/${qt}/${unit}/${_id}`),
    getUnquantifiedBranches: (_id) => get(`/api/branch/${_id}`),
    getQuantifiedBranches: (qt, unit, _id) => get(`/api/branch/${qt}/${unit}/${_id}`),
    getRoots: (_id) => get(`/api/root/${_id}`),
    getQuantifiedImpactTank: (qt, unit, _id) => get(`/api/impacttank/${qt}/${unit}/${_id}`),







    putLink: (trunk, root) => put(`/api/link`, {trunk, root}),
    putFacet: (trunk, facet) => post(`/api/facet`, {trunk, facet}),
    putTrunkName: (_id, name) => put(`/api/trunk/${_id}`, {name}),
    putTrunkQuantity: (treeId, quantity) => put(`/api/trunk/${treeId}`, {quantity}),

    deleteLink: (treeId, rootId) => del(`/api/link/${treeId}/${rootId}`),
    deleteFacets: (treeId, facetIds) => post('/api/facet/deletion', {treeId, facetIds}),
    deleteImpacts: (treeId, impactIds) => post('/api/impact/deletion', {treeId, impactIds}),
    deleteTrunk: trunkId => del(`/api/trunk/${trunkId}`),


    postImpact: (trunk, impact) => post(`/api/impact`, {trunk, impact}),
    postFacetEntry: facet => post('/api/facetEntry', facet),
    postImpactEntry: impact => post('/api/impactEntry', impact),
    postTrunk: trunk => post('/api/trunk', trunk),
    postTrunkAdeme: (formData) => upload('/api/trunkBulk/ademe', formData),
    postImpactEntryAdeme: (formData) => upload('/api/impactEntryBulk/ademe', formData),
    postImpactAdeme: (formData) => upload('/api/impactBulk/ademe', formData),
    postTrunkClone: trunkId => post(`/api/trunk?sourceId=${trunkId}`),
    postFeedback: feedback => post(`/api/feedback`, feedback),


    postMail: ({mail}) => post(`/api/mail`, {mail}),
    postConfirm: async ({token, fullname, password}) => {
        const res = await post(`/api/confirm`, {t: token, fullname, password}, {resolveWithFullResponse: true})
        return {token: res.headers[X_ACCESS_TOKEN]}
    },
    postAuth: async ({mail, password}) => {
        const res = await post(`/api/auth`, {mail, password}, {resolveWithFullResponse: true})
        return {token: res.headers[X_ACCESS_TOKEN]}
    }
}