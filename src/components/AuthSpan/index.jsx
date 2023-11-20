import React from "react";
import PropTypes from "prop-types";

const AuthSpan = ({disabled, onClick, children, className = 'editTextColor'}) => {
    return (
        <span 
            className={`${disabled ? 'disableTextColor' : className}`}
            onClick={() => {
                if (disabled) return
                onClick()
            }}
        >
            {children}
        </span>
    );
};

AuthSpan.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.any,
    className: PropTypes.string,
};

export { AuthSpan };
