import React from 'react';
import IconMaterial from '../../../../commons/components/IconMaterial';

const FilaExpand = ({ ativo, handleClick }) => (
    <div className="sds-expand-wrapper" onClick={handleClick}>
        <div className="sds-subtitle sds-color-primary sds-hide-up-sm">              
            {ativo && ativo.numero}
        </div>
        
        <div className="sds-expand__circle sds-color-primary sds-hide-up-sm">              
            <IconMaterial icon="arrow_forward" />
        </div>

        <div className="sds-expand__circle sds-bg-primary sds-hide-xs">
            <IconMaterial icon="arrow_forward" />
        </div>
    </div>
);

export default FilaExpand;