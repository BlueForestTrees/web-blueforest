import {map} from 'lodash';
import {bestQuantity} from "trees-units";


export const hasQuantity = e => e && e.quantity && e.quantity.qt && e.quantity.unit;
export const format = v => v < 10 ? Math.round(v * 100) / 100 : Math.round(v * 10) / 10;
export const trunkyAll = items => map(items, trunky);
export const trunky = trunk => ({_id: trunk._id, trunk});
export const idQtFrom = item => ({_id: item._id, quantity: item.quantity});
export const qtUnit = quantity => {
    if (quantity) {
        if (quantity.qt && quantity.unit) {
            const best = bestQuantity(quantity);
            return `${best.qt}${best.unit !== 'count' ? best.unit : ''}`;
        } else {
            return (quantity.qt || "?") + (quantity.unit || " ?");
        }
    } else {
        return "??";
    }
};
export const qtUnitName = item => `${qtUnit(item.quantity || item)} ${item && item.name || '?'}`;

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const getLuma = value => {
    const c = value.substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const shadeColor = (color, percent) => {
    const f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
};

export const blendColors = (c0, c1, p) => {
    const f = parseInt(c0.slice(1), 16), t = parseInt(c1.slice(1), 16), R1 = f >> 16, G1 = f >> 8 & 0x00FF, B1 = f & 0x0000FF, R2 = t >> 16, G2 = t >> 8 & 0x00FF, B2 = t & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((R2 - R1) * p) + R1) * 0x10000 + (Math.round((G2 - G1) * p) + G1) * 0x100 + (Math.round((B2 - B1) * p) + B1)).toString(16).slice(1);
};

export const overcolor = c => getLuma(c) < 120 ? "white" : "black";

export const initiales = fullname => {
    const nameSplit = fullname.toUpperCase().split(' ');
    if (nameSplit.length === 1) {
        return nameSplit[0] ? nameSplit[0].charAt(0):'?';
    } else {
        return nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
    }
};

export const rad = deg => deg * (Math.PI / 180);
export const deg = rad => rad / (Math.PI / 180);

export const range = (min, max) => {
    let array = [], j = 0;
    for (let i = min; i <= max; i++) {
        array[j] = i;
        j++;
    }
    return array;
};