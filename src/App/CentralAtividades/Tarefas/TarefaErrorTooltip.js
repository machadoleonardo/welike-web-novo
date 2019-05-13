import React from 'react';
import Tooltip from '../../../commons/components/Tooltip';

const TarefaErrorTooltip = ({ label }) => (
    <Tooltip label={label}>
        <div className="sds-tarefa-status-req">
            <i className="material-icons sds-color-error">error_outline</i>
        </div>
    </Tooltip>
);

export default TarefaErrorTooltip