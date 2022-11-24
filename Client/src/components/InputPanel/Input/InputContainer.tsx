import { FC, useState , useCallback} from "react";
import Input from "./Input";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import {  InputPanelType } from "../../../models/AuthTypes";
import { checkInvalidEmail, checkEmpty, checkLengthWord, checkRepPassword, setRegistrateEmailValue, 
         setRegistrateNameValue, setRegistratePasswordValue, 
         setRegistrateRepPasswordValue, setRegistrateSurnameValue } from "../../../redux/reducers/RegistrateReduce";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

type InputProps = {
    prop: InputPanelType
}

const InputContainer:FC<InputProps> = ({prop}) =>{
    const [value, setValue] = useState<string>('')
    
    const dispatch = useTypedDispatch()

    const {RegistratePassword, RegistrateEmail, 
           RegistrateName, RegistrateSurname} = useTypedSelector(state=> state.Registrate)
    const clickBlur = useCallback(()=>{
        switch (prop.elem?.name){
            case('email'):{
                value.length && dispatch(checkEmpty(RegistrateEmail))
                dispatch(checkInvalidEmail())
                break
            }
            case('password'):{
                value.length ? dispatch(checkLengthWord({input:RegistratePassword,min:5})) :
                               dispatch(checkEmpty(RegistratePassword))
                break
            }
            case('reppassword'):{
                dispatch(checkRepPassword())
                break
            }
            case('name'):{
                value.length ?
                     dispatch(checkLengthWord({input:RegistrateName,min:2})) : 
                     dispatch(checkEmpty(RegistrateName))
                break
            }
            case('surname'):{
                value.length ?
                     dispatch(checkLengthWord({input:RegistrateSurname,min:2})) : 
                     dispatch(checkEmpty(RegistrateSurname))
                break
            }
            default:{
                
            }
        }
    },[prop.elem?.name, value.length, dispatch,
         RegistrateEmail, RegistratePassword, RegistrateName, RegistrateSurname])

    const clickInput= useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        switch(prop.elem?.name){
            case('email'):{
                dispatch(setRegistrateEmailValue(e.target.value))
                setValue(e.target.value)
                break
            }
            case('password'):{
                dispatch(setRegistratePasswordValue(e.target.value))
                setValue(e.target.value)
                break
            }
            case('reppassword'):{
                dispatch(setRegistrateRepPasswordValue(e.target.value))
                setValue(e.target.value)
                break
            }
            case('name'):{
                dispatch(setRegistrateNameValue(e.target.value))
                setValue(e.target.value)
                break
            }
            case('surname'):{
                dispatch(setRegistrateSurnameValue(e.target.value))
                setValue(e.target.value)
                break
            }
            default:{
                setValue(e.target.value)
            }
        }
    },[prop.elem?.name, dispatch])

    return(
        <Input prop={prop} checkValidation={prop.elem?.isFocus} 
               ErrorStatus={prop.elem?.state === "Error"} clickBlur={clickBlur}
               clickInput={clickInput} ErrorDesctiption={prop.elem?.description} 
               InputValue={prop.elem?.value ||value}/>
    )
}

export default InputContainer