import { FC, useRef } from "react";
import style from "./Button.module.scss"
import { ButtonPanelModule } from "../../../../models/AuthModule";
import useHover from "../../../../hooks/useHover";

type ButtonProps = {
    props: ButtonPanelModule
}

const Button:FC<ButtonProps> = ({props}) =>{
    const ref = useRef(null)
    const isHovered = useHover(ref)
    let HoveredColor = 'rgb(104, 182, 88)'
    if (props.typeMessage === 'Not'){
        HoveredColor = '#d22626'
    }
    else if (props.typeMessage === 'Warning'){
        HoveredColor = '#e28c3f'
    }
    return(
        <button className={style.BigButton} ref={ref} onClick={props?.onClick} key={props.id} style={isHovered ? {backgroundColor: `${HoveredColor}`}:{}} >{props?.name}</button>
    )
}

export default Button