import units from './units'

const toTrunk = (value) => {
    if(!value)
        return null;

    let q, u, n;
    [, q, u,n] = value.match(/^(\d+[.,]?\d*)?(\S*)\s*(.*)?/);

    if(q && !units.lookup(u))
        return {name:value};

    if(!q && u){
        n = n ? `${u} ${n}` : u;
        u = null;
    }

    return {
        qt: q ? q.replace(",", ".") : null,
        unit: u,
        name: n || null
    };
};

export default {
    toTrunk
};