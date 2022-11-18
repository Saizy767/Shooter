import { FC, useRef } from "react";
import style from "./Button.module.scss"
import { ButtonPanelType } from "../../../models/AuthTypes";
import useHover from "../../../hooks/useHover";

type ButtonProps = {
    props: ButtonPanelType,
    HoveredColor: string
}

const Button:FC<ButtonProps> = ({props, HoveredColor}) =>{
    const ref = useRef(null)
    const isHovered = useHover(ref)
    return(
        <button className={style.BigButton} ref={ref}
         onClick={props?.onClick} key={props.id} 
         style={isHovered ? {backgroundColor: `${HoveredColor}`}:{}} >{props?.name}</button>
    )
}

export default Button