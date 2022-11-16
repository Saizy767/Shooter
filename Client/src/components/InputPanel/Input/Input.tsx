import { FC } from "react";
import { InputPanelModule } from "../../../models/AuthModule";
import style from './Input.module.scss'

type InputProps = {
    prop: InputPanelModule,
    clickInput:(el: React.ChangeEvent<HTMLInputElement>) => void,
    clickBlur:()=>void,
    clickFocus:()=>void,
    InputValue: string,
    ErrorDesctiption: string,
    ErrorStatus: boolean,
    checkValidation: boolean,
}

const Input:FC<InputProps>=({prop, clickFocus, clickBlur,clickInput, 
                            ErrorDesctiption, ErrorStatus, InputValue,
                            checkValidation})=>{
    return(
        <div className={style.InputRegistration}>
            {ErrorStatus && <span className={style.InputRegistration_warning}>{ErrorDesctiption}</span>}
            <input alt={prop?.alt} value={InputValue} onChange={(e)=>clickInput(e)}
                placeholder={prop?.placeholder} onBlur={()=>clickBlur()}
                className={style.InputRegistration_input + ' ' + (checkValidation ?  ' ' : style.InputRegistration_focus)}
                key={prop?.id} type={prop?.type} onFocus={()=>clickFocus()}>
            </input>
        </div>
    )
}

export default Input