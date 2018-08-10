import {initUnits} from "unit-manip"
import {loadUnitsDataMock} from "./grandeurServiceMock"

export const init = async () => {
    initUnits(await loadUnitsDataMock())
}

export const withQuantity = (qt, unit) => ({quantity: {qt, unit}})
export const withIdQuantity = (_id, qt, unit) => ({_id, ...withQuantity(qt, unit)})
export const withNameIdQtGrandeur = (name, _id, qt, unit) => ({name, ...withIdQuantity(_id, qt, unit), grandeur: grandeurOf(unit)})
const grandeurOf = unit => {
    switch (unit) {
        case 'kg':
        case 't':
        case 'g':
            return {grandeur: 'Mass'}
        case 'm2':
            return {grandeur: 'Surf'}
        case 'count':
            return {grandeur: 'Nomb'}
        case 'L':
        case 'm3':
            return {grandeur: 'Volu'}
        default:
            return {}
    }
}