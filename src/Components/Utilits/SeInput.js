import React from "react";

const SeInput = ({className, label, type, name, placeHolder, error, onChange}) => {

    let wrapperClass = "form-group"
    // if (error && error.length > 0) {
    //     wrapperClass += 'has-error invalid-feedback'
    // }
    return (
        <div className={`mb-3 ${wrapperClass}`}>
            <label htmlFor={name} className="form-label mb-1">{label || 'Form Label'}</label>
            <input type={type || "text"}
                   name={name && name}
                   placeholder={placeHolder && placeHolder}
                   onChange={onChange}
                   minLength={5}
                   required={true}
                   className={
                       className
                           ? error
                       ? `${className} is-invalid form-control`
                       : `${className} is-valid form-control`
                       : error
                       ? `is-invalid form-control`
                       : `form-control`}
                   id={name}/>
            {error && <div className={'invalid-feedback mt-0 text-capitalize'}>{error}</div>}
        </div>
    )
}

export default SeInput;
