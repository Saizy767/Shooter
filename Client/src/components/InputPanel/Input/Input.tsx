import { FC } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { stateInputType } from "../../../models/AuthTypes";
import style from './Input.module.scss'

type InputProps = {
    prop: stateInputType,
    clickInput:(T: React.ChangeEvent<HTMLInputElement>) => void,
    clickBlur:()=>void,
    InputValue: string,
    ErrorDesctiption: string | undefined,
    ErrorStatus: boolean,
    checkValidation: boolean | undefined,
    clickEyeIcon:(T:"text"|"password")=>void
}

const Input:FC<InputProps>=({prop, clickBlur,clickInput, 
                            ErrorDesctiption, ErrorStatus, InputValue,
                            checkValidation, clickEyeIcon})=>{
    return(
        <div className={style.InputRegistration}>
            {ErrorStatus && <span className={style.InputRegistration_warning}>{ErrorDesctiption}</span>}
            <input alt={prop?.name} value={InputValue} onChange={(e)=>clickInput(e)}
                placeholder={prop?.placeholder} onBlur={()=>clickBlur()}
                className={style.InputRegistration_input + ' ' +
                        (!checkValidation ?  ' ' : style.InputRegistration_focus)}
                type={prop?.type}>
            </input>
            {(prop.name === 'reppassword' || prop.name === 'password') &&
                <div className={style.PasswordEye}>
                    {prop.type === 'password' ?
                         <AiOutlineEye className={style.PasswordEye_icon} onClick={()=>clickEyeIcon('text')}/> :
                         <AiOutlineEyeInvisible className={style.PasswordEye_icon} onClick={()=>clickEyeIcon('password')}/>}
                </div> } 
        </div>
    )
}

export default Input