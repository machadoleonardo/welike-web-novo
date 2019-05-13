export const addFieldFormik = (item, props, idNew) => {
    let valueArray = [...props.value] || [];
    let id = item.id || item[idNew];

    valueArray.push(id);
    props.onChange(props.id, valueArray);
}

export const removeFieldFormik = (item, props, idNew) => {
    let valueArray = [...props.value] || [];
    let id = item.id || item[idNew];

    valueArray.splice(valueArray.indexOf(id), 1);
    props.onChange(props.id, valueArray);
}

export const removeAllFieldFormik = (props) => {
    props.onChange(props.id, []);
}