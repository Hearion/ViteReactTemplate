import React, {useEffect, useState} from 'react';

/**
 * 布局View
 * @param className
 * @param style
 * @param children
 * @param border
 * @returns {JSX.Element}
 * @constructor
 */
export const LayoutView = ({className = '', style, children, border = true}) => {
    return (
        <div
            className={`layoutAnimation ${className}`}
            style={{padding: 18, boxSizing: 'border-box', border: border ? '1px solid rgba(5, 5, 5, 0.06)' : "none", borderRadius: 6, ...style}}
        >
            {children}
        </div>
    )
}
