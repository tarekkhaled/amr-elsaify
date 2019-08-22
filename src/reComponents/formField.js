import React, { Fragment } from 'react'

export default function FormField({formID,formInfo:{element,vaildation,vaild,validationMessage,config,value,label},onChange}) {

    const showError = () => {
        let errorMessage = <Fragment>
            {
                (vaildation && vaild ) ?  null : <div className={`${validationMessage? 'Form-error' : ''}`}>{validationMessage}</div>
            }
        </Fragment>
        return errorMessage;
    }
    const showField = () => {
        let formTemplate = null;
        switch (element) {
            case 'input':
                formTemplate = (
                    <div className="Form-field">
                            <label className="Form-label" htmlFor={config.id}>{label}:</label>
                            <input onChange={(event)=>onChange({event,formID})} className="Form-input" {...config} value={value} autoComplete={formID === 'password' ? 'current-password' : ''}/>
                            {showError()}
                    </div>
                )
                break;
        
            default:
                formTemplate = null
                break;
        }
        return formTemplate;
    }
    return (
        <Fragment>
            {showField()}
        </Fragment>
    )
}