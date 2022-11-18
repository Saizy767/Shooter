import { FC, useEffect } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { FirstInputPanelData, SecondInputPanelData, ThirdInputPanelData } from "../../../models/AuthStore";
import { ButtonPanelType } from "../../../models/AuthTypes";
import { clickToRegistration } from "../../../redux/reducers/AuthReducer";
import { clickCompleteRegistration, clickNextStepRegistration,
         setPrevStepRegistration, 
         setTimer} from "../../../redux/reducers/RegistrateReduce";
import Registration from "./Registration";

export type stepsType = {
    firstStep: number,
    secondStep: number,
    thirdStep: number
}

const RegistrationContainer:FC=()=>{
    const {ErrorValidation} = useTypedSelector((state)=> state.Auth)
    const {CurrentStepRegistration, Timer} = useTypedSelector((state)=> state.Registrate)

    const dispatch = useTypedDispatch()

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
                                                     ()=>dispatch(clickNextStepRegistration()),
            typeMessage: ErrorValidation ? 'Not': 'Ok'
        }
    ]
    const steps: stepsType = {
        firstStep: 0,
        secondStep: 1,
        thirdStep: 2,
    }

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