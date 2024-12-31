import React from "react";
import "./alertButton.scss";

const AlertButton = ({ type, component }) => {
    return (
        <div className="page">
            <div className={`background ${type}`}>
                {component}
            </div>
            <div className="background-blur"></div>
        </div>
    );
};

export default AlertButton;
