import { FC } from "react";
import { ButtonPanelModule } from "../../../models/AuthModule";
import ButtonPanel from "../components/ButtonPanel/ButtonPanel";
import style from './PopUpAuth.module.scss'

type PopUpAuthProp = {
    title: string,
    children: React.ReactNode,
    ButtonPanelProps: ButtonPanelModule[]
}
const PopUpAuth:FC<PopUpAuthProp>=({title, children, ButtonPanelProps})=>{
    return(
        <div className={style.PopUpAuth}>
            <h3 className={style.PopUpAuth_header}>{title}</h3>
            {children}
            <ButtonPanel props={ButtonPanelProps}/>
        </div>
    )
}

export default PopUpAuth