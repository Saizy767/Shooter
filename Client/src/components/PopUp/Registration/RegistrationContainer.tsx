import { FC, useCallback, useEffect, useState } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ButtonPanelModule } from "../../../models/AuthModule";
import { setVisibilityRegistration } from "../../../redux/reducers/navbarReducer";
import Registration from "./Registration";

export type stepsType = {
    firstStep: number,
    secondStep: number,
    thirdStep: number
}

const RegistrationContainer:FC=()=>{
    const [step, setStep] = useState<number>(0)
    const [timer, setTimer] = useState<number>(30)

    const dispatch = useTypedDispatch()
    const {FirstInputPanelData,SecondInputPanelData,ThirdInputPanelData} = useTypedSelector((state)=> state.Auth)

    const steps: stepsType = {
        firstStep: 0,
        secondStep: 1,
        thirdStep: 2,
    }

    useEffect(()=>{
        setTimeout(()=>{
            step === 2 && timer && setTimer(timer-1)
        },1000)
    },[timer, step])

    const clickRegistration = useCallback((boolean:boolean) =>{
        dispatch(setVisibilityRegistration(!boolean))
    },[dispatch])

    const clickTimer = useCallback((arg: number)=>{
        setTimer(arg)
    },[])

    const handlePrevStep = useCallback(() =>{
        if(step === 0){
            setStep(0)
        }
        setStep(step-1)
    },[step])

    const handleNextStep = useCallback(()=>{
        if(step === 1){
            setTimer(30)
        }
        if(step === 2){
            setStep(2)
        }
        setStep(step+1)
    },[step])

    const TimerButton: ButtonPanelModule = {
        id:1,
        name: "Send Again",
        onClick: () => clickTimer(20),
        typeMessage: 'Warning'
    }

    const ButtonPanelData:ButtonPanelModule[] = [
        {
            id: 1,
            name: step === 0 ? "Authorization": "Back",
            onClick: step === 0 ? ()=>clickRegistration(true) : ()=>handlePrevStep(),
            typeMessage: step === 0 ? 'Ok' : 'Not'
        },
        {
            id:2, 
            name: step === 2 ? "Complete" : "Next",
            onClick: step === 2 ?  undefined : ()=>handleNextStep(),
            typeMessage: 'Ok'
        }
    ]
    const InputPanelData = step === 0 ? FirstInputPanelData : 
                           step === 1 ? SecondInputPanelData : ThirdInputPanelData
    return(
        <Registration step={step} steps={steps} 
                      handleNextStep={handleNextStep} clickRegistration={clickRegistration}
                      ButtonPanelData={ButtonPanelData} InputPanelData={InputPanelData} timer={timer}
                      TimerButtonProps={TimerButton}/>
    )
}

export default RegistrationContainer