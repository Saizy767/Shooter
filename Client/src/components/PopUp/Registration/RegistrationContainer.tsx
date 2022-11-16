import { FC, useCallback, useEffect, useState } from "react";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ButtonPanelModule } from "../../../models/AuthModule";
import { setVisibilityAuth, setVisibilityRegistration } from "../../../redux/reducers/navbarReducer";
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

    const {FirstInputPanelData,SecondInputPanelData,ThirdInputPanelData,
           ErrorValidation, visibilityRegistration} = useTypedSelector((state)=> state.Auth)
    const {RegistrateEmail,RegistrateSurname,
           RegistrateName, RegistratePassword} = useTypedSelector((state)=> state.Auth)

    const InputPanelData = step === 0 ? FirstInputPanelData : 
                           step === 1 ? SecondInputPanelData : ThirdInputPanelData
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
        dispatch(setVisibilityAuth(boolean))
    },[dispatch])

    const clickTimer = useCallback((arg: number)=>{
        setTimer(arg)
    },[])

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        return await response.json();
      }
      

    const handleComplete = useCallback(()=>{
        dispatch(setVisibilityRegistration(false))
    },[dispatch])

    const handlePrevStep = useCallback(() =>{
        if(step === 0){
            setStep(0)
        }
        setStep(step-1)
    },[step])

    const handleNextStep = useCallback(()=>{
        if(!ErrorValidation){
            switch(step){
                case(0):{
                    setStep(step+1)
                    break
                }
                case(1):{
                    postData(process.env.REACT_APP_USER_REGISTRATION, 
                    {RegistrateName, RegistrateSurname, RegistrateEmail, RegistratePassword})
                    setTimer(30)
                    setStep(step+1)
                    break
                }
                case(2):{
                    setStep(2)
                    break
                }
                default:{
                    setStep(step+1)
                }
        }}
    },[step, ErrorValidation, RegistrateEmail, RegistratePassword, RegistrateSurname, RegistrateName])

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
            onClick: step === 0 ? ()=> clickRegistration(true) : ()=>handlePrevStep(),
            typeMessage: step === 0 ? 'Ok' : 'Not'
        },
        {
            id:2, 
            name: step === 2 ? "Complete" : "Next",
            onClick: step === 2 ? ()=>handleComplete() : ()=>handleNextStep(),
            typeMessage: ErrorValidation ? 'Not': 'Ok'
        }
    ]
    return(
        <Registration step={step} steps={steps} 
                      handleNextStep={handleNextStep} clickRegistration={clickRegistration}
                      ButtonPanelData={ButtonPanelData} InputPanelData={InputPanelData} timer={timer}
                      TimerButtonProps={TimerButton} visibilityRegistration={visibilityRegistration}/>
    )
}

export default RegistrationContainer