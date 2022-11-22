import { FC } from "react";
import { InputPanelType } from "../../../models/AuthTypes";
import style from './Input.module.scss'

type InputProps = {
    prop: InputPanelType,
    clickInput:(el: React.ChangeEvent<HTMLInputElement>) => void,
    clickBlur:()=>void,
    InputValue: string,
    ErrorDesctiption: string | undefined,
    ErrorStatus: boolean,
    checkValidation: boolean | undefined,
}

const Input:FC<InputProps>=({prop, clickBlur,clickInput, 
                            ErrorDesctiption, ErrorStatus, InputValue,
                            checkValidation})=>{
    return(
        <div className={style.InputRegistration}>
            {ErrorStatus && <span className={style.InputRegistration_warning}>{ErrorDesctiption}</span>}
            <input alt={prop?.alt} value={InputValue} onChange={(e)=>clickInput(e)}
                placeholder={prop?.placeholder} onBlur={()=>clickBlur()}
                className={style.InputRegistration_input + ' ' + (!checkValidation ?  ' ' : style.InputRegistration_focus)}
                key={prop?.id} type={prop?.type}>
            </input>
        </div>
    )
}

export default Input