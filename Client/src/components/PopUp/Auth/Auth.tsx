import { FC } from "react";
import { ButtonPanelType, IconPanelType, stateInputType } from "../../../models/AuthTypes";
import InputPanel from "../../InputPanel/InputPanel";
import PopUpAuth from "../PopUpAuth";
import style from "./Auth.module.scss"

type AuthProps = {
    ButtonPanelData: ButtonPanelType[]
    InputPanelData: stateInputType[]
    IconPanel: IconPanelType[]
}
const Auth:FC<AuthProps>=({ButtonPanelData, InputPanelData, IconPanel})=>{
    return (
        <PopUpAuth title={'Authorization'} ButtonPanelProps={ButtonPanelData}>
            <InputPanel props={InputPanelData}/>
            <div className={style.Auth_registrationByOtherPanel}>
                {IconPanel.map((el)=>{
                    return(
                        <img src={el.img} key={el.id} alt={el.name} className={style.Auth_iconCompanies}></img>
                    )
                })}
            </div>
        </PopUpAuth>
    )
}

export default Auth