import { FC } from "react";
import { ButtonPanelModule, InputPanelModule } from "../../../models/AuthModule";
import InputPanel from "../components/InputPanel/InputPanel";
import PopUpAuth from "../PopUpAuth/PopUpAuth";
import { stepsType } from "./RegistrationContainer";
import style from './Registration.module.scss'
import Button from "../components/Button/Button";


type RegistrationProps = {
    step: number,
    clickRegistration:(bool:boolean)=>void,
    handleNextStep: () => void,
    steps: stepsType,
    ButtonPanelData: ButtonPanelModule[],
    InputPanelData: InputPanelModule[],
    TimerButtonProps: ButtonPanelModule
    timer: number
}
const Registration:FC<RegistrationProps> = ({step, steps, ButtonPanelData, InputPanelData, timer, TimerButtonProps})=>{
    return(
        <PopUpAuth title={'Registration'} ButtonPanelProps={ButtonPanelData}>
            {steps.firstStep === step && 
                <InputPanel props={InputPanelData}/>
            }
            {steps.secondStep === step &&
                <InputPanel props={InputPanelData}/>
            }
            {steps.thirdStep === step && 
                <>
                    <span className={style.Message}> We send on Email code, please check</span>
                    <InputPanel props={InputPanelData}/>
                    <span className={style.Timer}>If code dont came after {timer} seconds click on button</span>
                    {!timer && 
                    <div className={style.Button}>
                        <Button props={TimerButtonProps}/>
                    </div>}
                </>
            }
        </PopUpAuth>
    )
}

export default Registration