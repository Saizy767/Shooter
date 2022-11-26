import { FC, useCallback} from "react";
import Input from "./Input";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import {  InputPanelType } from "../../../models/AuthTypes";
import { checkInputRule, setInputValue } from "../../../redux/reducers/RegistrateReduce";

type InputProps = {
    prop: InputPanelType
}

const InputContainer:FC<InputProps> = ({prop}) =>{
    const dispatch = useTypedDispatch()

    const clickBlur = useCallback(()=>{
        return prop.elem && dispatch(checkInputRule({args: [prop.elem]}));
    },[prop.elem, dispatch])

    const clickInput= useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        prop.elem && dispatch(setInputValue({input:prop.elem, value: e.target.value}))
    },[dispatch, prop.elem])

    return(
        <Input prop={prop} checkValidation={prop.elem?.isFocus} 
               ErrorStatus={prop.elem?.state === "Error"} clickBlur={clickBlur}
               clickInput={clickInput} ErrorDesctiption={prop.elem?.description} 
               InputValue={prop.elem?.value || ''}/>
    )
}

export default InputContainer