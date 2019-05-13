import React from 'react';

export const IconLoading = ({ width, height }) => (
    <svg
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="lds-rolling">
        <circle
            cx="50"
            cy="50"
            fill="none"
            stroke="#666666"
            strokeWidth="4"
            r="40"
            strokeDasharray="164.93361431346415 56.97787143782138">
        </circle>
    </svg>
);

IconLoading.defaultProps = {
    width: '1.5rem',
    height: '1.5rem',
}