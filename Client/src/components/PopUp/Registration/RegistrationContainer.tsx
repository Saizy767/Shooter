import { FC, useEffect } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ButtonPanelType, InputPanelType, stepsType } from "../../../models/AuthTypes";
import { clickToRegistration, setPrevStepRegistration, setTimer } from "../../../redux/reducers/AuthReducer";
import { clickCompleteRegistration, clickNextStepRegistration} from "../../../redux/reducers/RegistrateReduce";
import Registration from "./Registration";

const RegistrationContainer:FC=()=>{
    const dispatch = useTypedDispatch()
    const {CurrentStepRegistration, Timer} = useTypedSelector((state)=> state.Auth)
    const {RegistrateEmail, RegistratePassword, RegistrateName, 
           RegistrateRepPassword, RegistrateSurname} = useTypedSelector((state)=> state.Registrate)

    //change
    const initial = true
    const First = [RegistrateEmail, RegistrateName, RegistrateSurname].reduce((acc, cur)=>
        (((acc && !cur.isFocus) && (acc && !!cur.value)))&&(acc && !(cur.state === 'Error'))
        , initial)
    const Second = [RegistratePassword, RegistrateRepPassword].reduce((acc, cur)=>
    (((acc && !cur.isFocus) && (acc && !!cur.value)))&&(acc && !(cur.state === 'Error'))
    , initial)
    //

    const TimerButton: ButtonPanelType = {
        id:1,
        name: "Send Again",
        onClick: () => dispatch(setTimer(20)),
        typeMessage: 'Warning'
    }
    const ButtonPanelData:ButtonPanelType[] = [
        {
            id: 1,
            name: CurrentStepRegistration === 0 ? "Authorization": "Back",
            onClick: CurrentStepRegistration === 0 ? ()=> dispatch(clickToRegistration(false)) : 
                                                     ()=> dispatch(setPrevStepRegistration()),
            typeMessage: CurrentStepRegistration === 0 ? 'Ok' : 'Not'
        },
        {
            id:2, 
            name: CurrentStepRegistration === 2 ? "Complete" : "Next",
            onClick: CurrentStepRegistration === 2 ? ()=>dispatch(clickCompleteRegistration()) : 
                                                     ()=>dispatch(clickNextStepRegistration(
                                                        CurrentStepRegistration === 0 ?
                                                        First : Second
                                                         )),
            typeMessage: (CurrentStepRegistration === 0 ?
                First: Second) ? 'Ok': 'Not'
        }
    ]
    const steps: stepsType = {
        firstStep: 0,
        secondStep: 1,
        thirdStep: 2,
    }

    const FirstInputPanelData:InputPanelType[] = [
        {
            id: 1,
            type: "text",
            name: "email",
            placeholder: "E-mail",
            elem: RegistrateEmail
        },
        {
            id: 2,
            type: "text",
            name: "name",
            placeholder: "Name",
            elem: RegistrateName
        },
        {
            id: 3,
            type: "text",
            name: 'surname',
            placeholder: "Surname",
            elem: RegistrateSurname
        }
    ]
    const SecondInputPanelData:InputPanelType[] =[
        {
            id: 1,
            type: "password",
            name: "password",
            placeholder: "Password",
            elem: RegistratePassword
        },
        {
            id: 2,
            type: "password",
            name: "reppassword",
            placeholder: "Repeat password",
            elem: RegistrateRepPassword
        },
    ]
    const ThirdInputPanelData:InputPanelType[] = [
        {
            id: 1,
            name: "code",
            type: "text",
            placeholder: "Code"
        },
    ]

    const InputPanelData = CurrentStepRegistration === 0 ? FirstInputPanelData : 
                           CurrentStepRegistration === 1 ? SecondInputPanelData : ThirdInputPanelData
    
    useEffect(()=>{
        setTimeout(()=>{
            CurrentStepRegistration === 2 && Timer && dispatch(setTimer(Timer-1))
        },1000)
    },[dispatch, CurrentStepRegistration, Timer])
    
    return(
        <Registration step={CurrentStepRegistration} steps={steps} 
                      ButtonPanelData={ButtonPanelData} InputPanelData={InputPanelData} timer={Timer}
                      TimerButtonProps={TimerButton}/>
    )
}

export default RegistrationContainer