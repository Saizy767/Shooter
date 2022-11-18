import { FC } from "react";
import { ButtonPanelType } from "../../models/AuthTypes";
import ButtonPanel from "../ButtonPanel/ButtonPanel";
import style from './PopUpAuth.module.scss'

type PopUpAuthProp = {
    title: string,
    children: React.ReactNode,
    ButtonPanelProps: ButtonPanelType[]
}
const PopUpAuth:FC<PopUpAuthProp>=({title, children, ButtonPanelProps})=>{
    const clickPopUp = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
        e.stopPropagation()
    }
    return(
        <div className={style.PopUpAuth} onClick={(e)=>clickPopUp(e)}>
            <h3 className={style.PopUpAuth_header}>{title}</h3>
            {children}
            <ButtonPanel props={ButtonPanelProps}/>
        </div>
    )
}

export default PopUpAuth