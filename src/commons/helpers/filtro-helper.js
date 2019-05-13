import _ from "lodash";

export const filterIsNotEmpty = (values) => {
    const val = Object.values(values);
    return val.some(element => element && element.length > 0);
}

export const removeItemSelect = ( nextProps, sugestoes, selecionados, id_endpoint ) => {
    const _sugestoes = nextProps[sugestoes];
    const _selecionados = nextProps[selecionados];
    const newItems = _.differenceBy(_sugestoes, _selecionados, id_endpoint);

    return { items: newItems }
}