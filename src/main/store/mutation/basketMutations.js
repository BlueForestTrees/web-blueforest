import Do from "../../const/do";
import {findIndex} from 'lodash';

export default {
    [Do.ADD_TO_BASKET]: (state, item) => {
        const existingIndex = findIndex(state.basket, {_id: item._id});
        if (existingIndex >= 0) {
            state.basket.splice(existingIndex, 1, item);
        } else {
            state.basket.push(item);
        }
    },
    [Do.REMOVE_FROM_BASKET]: (state, item) => {
        state.basket.splice(state.basket.indexOf(item), 1);
    },
}