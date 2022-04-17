import React from 'react'

function Alert(props) {
    const capitalize = (word) => {
        if (word === "danger") {
            word = "error"
        }
        let lowerCaseWord = word.toLowerCase();
        return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
    }
    return (
        <div style={{ height: '50px' }}>
            {(props.alert) && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong> : {props.alert.alertMessage}
            </div>}
        </div>
    )
}

export default Alert