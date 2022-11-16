import { FC, useState , useCallback} from "react";
import Input from "./Input";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { ErrorValidationType, InputPanelModule } from "../../../models/AuthModule";
import { setErrorValidation, setRegistrateEmail, 
         setRegistrateName, setRegistratePassword, 
         setRegistrateRepPassword, setRegistrateSurname } from "../../../redux/reducers/AuthReducer";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

type InputProps = {
    prop: InputPanelModule
}

const InputContainer:FC<InputProps> = ({prop}) =>{
    const [isFocus, setIsFocus] = useState<boolean|null>(null)
    const [value, setValue] = useState<string>('')
    const [Error, setError] = useState<ErrorValidationType>({status: false, description: ''})
    const checkValidation = ((!isFocus || !!value) && !Error.status)
    const dispatch = useTypedDispatch()
    const {RegistrateRepPassword, RegistratePassword} = useTypedSelector(state=> state.Auth)

    const checkEmail = useCallback(()=>{
        if(!(/\S+@\S+\.\S+/.test(value))){
            setError({status: true ,description: 'Email is invalid'})
            dispatch(setErrorValidation(true))
        }
        else{
            setError({status: false ,description: ''})
            dispatch(setErrorValidation(false))
        }
    },[value, dispatch])

    const checkEmpty = useCallback(()=>{
        if(value.length === 0){
            setError({status: true, description:'Empty row'})
            dispatch(setErrorValidation(true))
        }
        else{
            setError({status: false ,description: ''})
            dispatch(setErrorValidation(false))
        }
    },[value, dispatch])

    const checkShortWord = useCallback((int:number)=>{
        if(value.length <= int){
            setError({status: true, description:`Password length less ${int}`})
            dispatch(setErrorValidation(true))
        }
        else{
            setError({status: false ,description: ''})
            dispatch(setErrorValidation(false))
        }
    },[value, dispatch])

    const checkRigthRepPassword = useCallback(()=>{
        if(RegistratePassword !== RegistrateRepPassword){
            setError({status:true,
                      description:`Passwords are not the same`})
            dispatch(setErrorValidation(true))
        }
        else{
            setError({status: false ,description: ''})
        }
    },[RegistratePassword, RegistrateRepPassword, dispatch])

    const clickFocus = () => {
        setIsFocus(false)
    }

    const clickBlur = useCallback(()=>{
        switch (prop.name){
            case('email'):{
                value.length ? checkEmail() : checkEmpty()
                break
            }
            case('password'):{
                value.length ? checkShortWord(5) : checkEmpty()
                break
            }
            case('reppassword'):{
                checkRigthRepPassword()
                break
            }
            case('other'):{
                value.length ? checkShortWord(2) : checkEmpty()
                break
            }
            default:{
                setIsFocus(true)
            }
        }
    },[checkEmail,checkShortWord,checkEmpty,checkRigthRepPassword, prop.name, value])

    const clickInput= useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
        switch(prop.name){
            case('email'):{
                dispatch(setRegistrateEmail(e.target.value))
                setValue(e.target.value)
                break
            }
            case('password'):{
                dispatch(setRegistratePassword(e.target.value))
                setValue(e.target.value)
                break
            }
            case('reppassword'):{
                dispatch(setRegistrateRepPassword(e.target.value))
                setValue(e.target.value)
                break
            }
            case('name'):{
                dispatch(setRegistrateName(e.target.value))
                setValue(e.target.value)
                break
            }
            case('surname'):{
                dispatch(setRegistrateSurname(e.target.value))
                setValue(e.target.value)
                break
            }
            default:{
                setValue(e.target.value)
            }
        }
        !!value ? setIsFocus(true) : setIsFocus(false)
    },[value,prop.name, dispatch])

    return(
        <Input prop={prop} checkValidation={checkValidation} ErrorStatus={Error.status}
                 clickBlur={clickBlur} clickFocus={clickFocus} clickInput={clickInput}
                 ErrorDesctiption={Error.description} InputValue={value}/>
    )
}

export default InputContainer