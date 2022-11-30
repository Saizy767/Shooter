import { FC } from "react";
import { ButtonPanelType, stateInputType, stepsType } from "../../../models/AuthTypes";
import InputPanel from "../../InputPanel/InputPanel";
import PopUpAuth from "../PopUpAuth";
import style from './Registration.module.scss'
import ButtonContainer from "../../ButtonPanel/Button/ButtonContainer";


type RegistrationProps = {
    step: number,
    steps: stepsType,
    ButtonPanelData: ButtonPanelType[],
    InputPanelData: stateInputType[],
    TimerButtonProps: ButtonPanelType,
    timer: number,
    email: string
}
const Registration:FC<RegistrationProps> = ({step, steps, ButtonPanelData, email,
                                             InputPanelData, timer, TimerButtonProps,
                                             })=>{
    return(
        <PopUpAuth title={'Registration'} ButtonPanelProps={ButtonPanelData}>
            {steps.firstStep === step && 
                <InputPanel props={InputPanelData}/>
            }
            {steps.secondStep === step &&
                <InputPanel props={InputPanelData}/>
            }
            {steps.thirdStep === step && 
                <div>
                    <span className={style.Message}> We send code to {email}, please check</span>
                    <InputPanel props={InputPanelData}/>
                    <span className={style.Timer}>If code dont came after {timer} seconds click on button</span>
                    {!timer && 
                    <div className={style.Button}>
                        <ButtonContainer props={TimerButtonProps}/>
                    </div>}
                </div>
            }
        </PopUpAuth>
    )
}

export default Registration