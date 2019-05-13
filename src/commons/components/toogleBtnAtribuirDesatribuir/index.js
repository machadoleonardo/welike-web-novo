import ButtonDesatribuir from '../ButtonDesatribuir/index';
import ButtonAtribuir from '../ButtonAtribuir/index';
import React from 'react';

const ToogleBtnAtribuirDesatribuir = (props)=>  {
    const {atribuido} = props;
    return (
      atribuido ? <ButtonDesatribuir {...props} /> : <ButtonAtribuir {...props} />
    )
}

export default ToogleBtnAtribuirDesatribuir;