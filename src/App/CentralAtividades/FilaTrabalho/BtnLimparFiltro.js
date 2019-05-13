import React, { Fragment, PureComponent } from 'react';
import Button from '../../../commons/components/Button';
import IconMaterial from '../../../commons/components/IconMaterial';

class BtnLimparFiltro extends PureComponent {    
    state = { label: 'Limpar Filtro', icon: 'close' }

    render(){
        const { label, icon } = this.state;
        return (
            <Fragment>
                <Button secondary={true} classModifiers="sds-btn--flat sds-hide-down-md">
                    <IconMaterial icon={icon} classModifiers="sds-btn__icon sds-btn__icon--right" />
                    {label}
                </Button>

                <ButtonIcon
                    secondary
                    icon={icon} 
                    innerInput={false}                    
                    classModifiers="sds-hide-up-md"
                />
            </Fragment>
        );
    }
}

export default BtnLimparFiltro;