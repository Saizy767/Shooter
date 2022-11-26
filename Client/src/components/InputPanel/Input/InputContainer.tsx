import { FC, useState , useCallback} from "react";
import Input from "./Input";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import {  InputPanelType } from "../../../models/AuthTypes";
import { checkInvalidEmail, checkLengthWord, 
        checkRepPassword, setInputValue } from "../../../redux/reducers/RegistrateReduce";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

type InputProps = {
    prop: InputPanelType
}

const InputContainer:FC<InputProps> = ({prop}) =>{
    const [value, setValue] = useState<string>('')
    
    const dispatch = useTypedDispatch()

    const {RegistratePassword, 
           RegistrateName, RegistrateSurname} = useTypedSelector(state=> state.Registrate)
           
    const clickBlur = useCallback(()=>{
        switch (prop.elem?.name){
            case('email'):{
                dispatch(checkInvalidEmail())
                break
            }
            case('password'):{
                dispatch(checkLengthWord({input:RegistratePassword,min:5})) 
                break
            }
            case('reppassword'):{
                dispatch(checkRepPassword())
                break
            }
            case('name'):{
                dispatch(checkLengthWord({input:RegistrateName,min:2}))
                break
            }
            case('surname'):{
                dispatch(checkLengthWord({input:RegistrateSurname,min:2}))
                break
            }
            default:{
                break
            }
        }
    },[prop.elem?.name, dispatch, RegistratePassword, RegistrateName, RegistrateSurname])

    const clickInput= useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        prop.elem && dispatch(setInputValue({input:prop.elem, value: e.target.value}))
        setValue(e.target.value)
    },[dispatch, prop.elem])

    return(
        <Input prop={prop} checkValidation={prop.elem?.isFocus} 
               ErrorStatus={prop.elem?.state === "Error"} clickBlur={clickBlur}
               clickInput={clickInput} ErrorDesctiption={prop.elem?.description} 
               InputValue={prop.elem?.value ||value}/>
    )
}

export default InputContainer