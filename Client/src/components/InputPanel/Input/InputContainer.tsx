import { FC, useCallback} from "react";
import Input from "./Input";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { stateInputType } from "../../../models/AuthTypes";
import { checkInputRule, setInputValue, setTypePassword } from "../../../redux/reducers/RegistrateReduce";

type InputProps = {
    prop: stateInputType
}

const InputContainer:FC<InputProps> = ({prop}) =>{
    const dispatch = useTypedDispatch()

    const clickBlur = useCallback(()=>{
        return dispatch(checkInputRule({args: [prop]}));
    },[prop, dispatch])

    const clickInput = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setInputValue({input:prop, value: e.target.value}))
    },[dispatch, prop])

    const clickEyeIcon = useCallback((type:"text"|"password")=>{
        dispatch(setTypePassword({input:prop,type}))
    },[dispatch, prop])

    return(
        <Input prop={prop} checkValidation={prop.isFocus} 
               ErrorStatus={prop.state === "Error"} clickBlur={clickBlur}
               clickInput={clickInput} ErrorDesctiption={prop.description} 
               InputValue={prop.value || ''} clickEyeIcon={clickEyeIcon}/>
    )
}

export default InputContainer