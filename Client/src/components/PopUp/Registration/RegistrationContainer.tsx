import { FC, useCallback, useEffect } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ButtonPanelType, stateInputType, stepsType } from "../../../models/AuthTypes";
import { clickToRegistration, setPrevStepRegistration, setTimer } from "../../../redux/reducers/AuthReducer";
import { clickCompleteRegistration, clickNextStepRegistration} from "../../../redux/reducers/RegistrateReduce";
import Registration from "./Registration";

const RegistrationContainer:FC=()=>{
    const dispatch = useTypedDispatch()
    const {CurrentStepRegistration, Timer} = useTypedSelector((state)=> state.Auth)
    const {RegistrateEmail, RegistratePassword, RegistrateName, 
           RegistrateRepPassword, RegistrateSurname, RegistrateCode} = useTypedSelector((state)=> state.Registrate)


    const arrayReduce = useCallback((array:Array<stateInputType>) =>{
        return array.reduce((acc, cur)=>
        (((acc && !cur.isFocus) && (acc && !!cur.value)))&&(acc && !(cur.state === 'Error'))
        , true)
    },[])

    const checkFirstPage = arrayReduce([RegistrateEmail,RegistrateName, RegistrateSurname])
    const checkSecondPage = arrayReduce([RegistratePassword, RegistrateRepPassword])

    useEffect(()=>{
        setTimeout(()=>{
            CurrentStepRegistration === 2 && Timer && dispatch(setTimer(Timer-1))
        },1000)
    },[dispatch, CurrentStepRegistration, Timer])

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
                                                     ()=>[dispatch(clickNextStepRegistration(
                                                        {stateButton:
                                                            CurrentStepRegistration === 0 ?
                                                            checkFirstPage : checkSecondPage,
                                                        }))],
            typeMessage: (CurrentStepRegistration === 0 ? checkFirstPage : checkSecondPage)
                ? 'Ok': 'Not'
        }
    ]
    const TimerButton: ButtonPanelType = {
        id:3,
        name: "Send Again",
        onClick: () => dispatch(setTimer(20)),
        typeMessage: 'Warning'
    }
    const steps: stepsType = {
        firstStep: 0,
        secondStep: 1,
        thirdStep: 2,
    }


    const InputPanelData = CurrentStepRegistration === 0 ? [RegistrateEmail,RegistrateName,RegistrateSurname] : 
                           CurrentStepRegistration === 1 ? [RegistratePassword,RegistrateRepPassword] : 
                                                           [RegistrateCode]
    
    return(
        <Registration step={CurrentStepRegistration} steps={steps} 
                      ButtonPanelData={ButtonPanelData} InputPanelData={InputPanelData} timer={Timer}
                      TimerButtonProps={TimerButton} email={RegistrateEmail.value}/>
    )
}

export default RegistrationContainer